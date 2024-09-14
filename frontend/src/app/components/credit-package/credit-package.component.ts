import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { StripeService } from '../../services/stripe.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-credit-package',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule],
  template: `
    <h2>Credit Packages</h2>
    @if (isLoading) {
      <mat-spinner></mat-spinner>
    } @else {
      <div class="package-container">
        @for (package of creditPackages; track package._id) {
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ package.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ package.description }}</p>
              <p>Credits: {{ package.credits }}</p>
              <p>Price: {{ package.price | currency }}</p> 
              @if (package.isSubscription) {
                <p>Duration: {{ package.durationDays }} days</p>
              }
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" (click)="purchasePackage(package)" [disabled]="isProcessing">
                {{ isProcessing ? 'Processing...' : 'Purchase' }}
              </button>
            </mat-card-actions>
          </mat-card>
        } @empty {
          <p>No credit packages available.</p>
        }
      </div>
    }
  `,
  styles: [`
    .package-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    mat-card {
      width: 300px;
    }
  `]
})
export class CreditPackageComponent implements OnInit {
  creditPackages: CreditPackage[] = [];
  isLoading = true;
  isProcessing = false;

  private creditPackageService = inject(CreditPackageService);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadCreditPackages();
  }

  loadCreditPackages() {
    this.isLoading = true;
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => {
        this.creditPackages = packages;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Error loading credit packages');
        this.isLoading = false;
      }
    });
  }

  purchasePackage(creditPackage: CreditPackage) {
    this.isProcessing = true;
    if (creditPackage.isSubscription) {
      this.creditPackageService.purchasePackage(creditPackage._id).subscribe({
        next: (response) => {
          if (response.subscriptionId) {
            this.notificationService.showSuccess(`Successfully subscribed to ${creditPackage.name}`);
          } else {
            this.notificationService.showSuccess(`Successfully purchased ${creditPackage.name}`);
          }
          this.isProcessing = false;
        },
        error: (error) => {
          this.notificationService.showError('Error processing purchase');
          this.isProcessing = false;
        }
      });
    } else {
      this.stripeService.createPaymentIntent(creditPackage.price * 100).subscribe({
        next: (response) => {
          this.stripeService.confirmPayment(response.clientSecret).then(() => {
            this.creditPackageService.purchasePackage(creditPackage._id).subscribe({
              next: () => {
                this.notificationService.showSuccess(`Successfully purchased ${creditPackage.name}`);
                this.isProcessing = false;
              },
              error: (error) => {
                this.notificationService.showError('Error processing purchase');
                this.isProcessing = false;
              }
            });
          }).catch((error) => {
            this.notificationService.showError('Payment failed: ' + error.message);
            this.isProcessing = false;
          });
        },
        error: (error) => {
          this.notificationService.showError('Error creating payment');
          this.isProcessing = false;
        }
      });
    }
  }
}