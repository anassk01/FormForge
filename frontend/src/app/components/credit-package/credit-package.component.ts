import { Component, OnInit, inject ,signal,Inject,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { StripeService } from '../../services/stripe.service';
import { NotificationService } from '../../services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule ,MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-credit-package',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule],
  template: `
    <div class="p-6 bg-gray-100 min-h-screen">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Credit Packages</h2>
      @if (isLoading()) {
        <div class="flex justify-center items-center h-64">
          <mat-spinner></mat-spinner>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (package of creditPackages(); track package._id) {
            <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ package.name }}</h3>
                <p class="text-gray-600 mb-4">{{ package.description }}</p>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-2xl font-bold text-cyan-600">{{ package.price | currency }}</span>
                  <span class="text-lg text-gray-700">{{ package.credits }} Credits</span>
                </div>
                @if (package.isSubscription) {
                  <p class="text-sm text-gray-500 mb-4">Subscription: {{ package.durationDays }} days</p>
                }
                <button 
                  class="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                  (click)="purchasePackage(package)" 
                  [disabled]="isProcessing()"
                >
                  {{ isProcessing() ? 'Processing...' : 'Purchase' }}
                </button>
              </div>
            </div>
          } @empty {
            <p class="col-span-full text-center text-gray-600">No credit packages available.</p>
          }
        </div>
      }
    </div>
  `
})
export class CreditPackageComponent implements OnInit {
  creditPackages = signal<CreditPackage[]>([]);
  isLoading = signal(true);
  isProcessing = signal(false);

  private creditPackageService = inject(CreditPackageService);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadCreditPackages();
  }

  loadCreditPackages() {
    this.isLoading.set(true);
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => {
        this.creditPackages.set(packages);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.notificationService.showError('Error loading credit packages');
        this.isLoading.set(false);
      }
    });
  }

  purchasePackage(creditPackage: CreditPackage) {
    const dialogRef = this.dialog.open(ConfirmPurchaseDialogComponent, {
      data: { packageName: creditPackage.name, price: creditPackage.price }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processPurchase(creditPackage);
      }
    });
  }

  private processPurchase(creditPackage: CreditPackage) {
    this.isProcessing.set(true);
    if (creditPackage.isSubscription) {
      this.purchaseSubscription(creditPackage);
    } else {
      this.purchaseOneTime(creditPackage);
    }
  }

  private purchaseSubscription(creditPackage: CreditPackage) {
    this.creditPackageService.purchasePackage(creditPackage._id).subscribe({
      next: (response) => {
        const message = response.subscriptionId 
          ? `Successfully subscribed to ${creditPackage.name}`
          : `Successfully purchased ${creditPackage.name}`;
        this.notificationService.showSuccess(message);
        this.isProcessing.set(false);
      },
      error: this.handlePurchaseError
    });
  }

  private purchaseOneTime(creditPackage: CreditPackage) {
    this.stripeService.createPaymentIntent(creditPackage.price * 100).subscribe({
      next: (response) => {
        this.stripeService.confirmPayment(response.clientSecret)
          .then(() => this.completePurchase(creditPackage))
          .catch(this.handlePaymentError);
      },
      error: this.handlePurchaseError
    });
  }

  private completePurchase(creditPackage: CreditPackage) {
    this.creditPackageService.purchasePackage(creditPackage._id).subscribe({
      next: () => {
        this.notificationService.showSuccess(`Successfully purchased ${creditPackage.name}`);
        this.isProcessing.set(false);
      },
      error: this.handlePurchaseError
    });
  }

  private handlePurchaseError = (error: any) => {
    this.notificationService.showError('Error processing purchase');
    this.isProcessing.set(false);
  }

  private handlePaymentError = (error: any) => {
    this.notificationService.showError('Payment failed: ' + error.message);
    this.isProcessing.set(false);
  }
}


@Component({
  selector: 'app-confirm-purchase-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Confirm Purchase</h2>
      <p class="mb-4">Are you sure you want to purchase {{ data.packageName }} for {{ data.price | currency }}?</p>
      <div class="flex justify-end space-x-2">
        <button mat-button (click)="dialogRef.close(false)">Cancel</button>
        <button mat-raised-button color="primary" (click)="dialogRef.close(true)">Confirm</button>
      </div>
    </div>
  `
})
export class ConfirmPurchaseDialogComponent {
  dialogRef = inject(MatDialogRef<ConfirmPurchaseDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as { packageName: string; price: number };
}
