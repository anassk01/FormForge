import { Component, OnInit, inject, signal, ElementRef,ViewChild ,computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CreditService, CreditInfo, CreditTransaction } from '../../services/credit.service';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { StripeService } from '../../services/stripe.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <div class="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">Your Credits</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-semibold text-cyan-600">Current Balance: {{ creditInfo()?.credits || 0 }} credits</h2>
            <p class="text-sm text-gray-600">Last Updated: {{ creditInfo()?.lastUpdated | date:'medium' }}</p>
          </div>
          <button 
            class="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
            (click)="scrollToPackages()"
          >
            Buy More Credits
          </button>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Available Packages</h3>
        <div id="packages" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          @for (package of topPackages(); track package._id) {
            <div class="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg border-2 {{ package === bestValuePackage() ? 'border-cyan-500' : 'border-transparent' }} relative">
              @if (package === bestValuePackage()) {
                <div class="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-tr">Best Value</div>
              }
              <h4 class="text-xl font-semibold text-gray-800 mb-2">{{ package.name }}</h4>
              <p class="text-3xl font-bold text-cyan-600 mb-2">{{ package.credits }} Credits</p>
              <p class="text-lg text-gray-700 mb-4">{{ package.price | currency }}</p>
              @if (package.isSubscription) {
                <p class="text-sm text-gray-600 mb-3">Renews every {{ package.durationDays }} days</p>
              }
              <button 
                class="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-4 rounded transition duration-150 ease-in-out"
                (click)="purchasePackage(package)"
              >
                {{ package.isSubscription ? 'Subscribe' : 'Purchase' }} Now
              </button>
            </div>
          }
        </div>

        <div class="text-center">
          <a 
            class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
            routerLink="/credit-packages"
          >
            View All Packages
          </a>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-800">Credit History</h3>
          <button 
            class="text-cyan-500 hover:text-cyan-600 font-medium transition duration-150 ease-in-out"
            (click)="toggleHistory()"
          >
            {{ showHistory() ? 'Hide' : 'Show' }} History
          </button>
        </div>
        
        @if (showHistory()) {
          @if (isLoading()) {
            <div class="flex justify-center items-center h-40">
              <mat-spinner diameter="40"></mat-spinner>
            </div>
          } @else if (creditHistory().length) {
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  @for (transaction of creditHistory(); track transaction.id) {
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date | date }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.amount }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <mat-paginator 
              [length]="totalTransactions()"
              [pageSize]="pageSize()"
              [pageSizeOptions]="[5, 10, 20]"
              (page)="onPageChange($event)"
              class="mt-4">
            </mat-paginator>
          } @else {
            <p class="text-gray-600">No credit history available.</p>
          }
        }
      </div>
    </div>
  `
})
export class CreditsComponent implements OnInit {
  private creditService = inject(CreditService);
  private creditPackageService = inject(CreditPackageService);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);

  creditInfo = signal<CreditInfo | null>(null);
  creditHistory = signal<CreditTransaction[]>([]);
  isLoading = signal(false);
  totalTransactions = signal(0);
  pageSize = signal(10);
  currentPage = signal(1);
  topPackages = signal<CreditPackage[]>([]);
  showHistory = signal(false);



  ngOnInit() {
    this.loadCreditInfo();
    this.loadTopPackages();
  }

  loadCreditInfo() {
    this.isLoading.set(true);
    this.creditService.getCreditBalance().subscribe({
      next: (info) => {
        this.creditInfo.set(info);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.notificationService.showError('Error loading credit information');
      }
    });
  }

  loadCreditHistory() {
    this.isLoading.set(true);
    this.creditService.getCreditHistory(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.creditHistory.set(response.transactions);
        this.totalTransactions.set(response.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.notificationService.showError('Error loading credit history');
      }
    });
  }

  loadTopPackages() {
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => {
        this.topPackages.set(packages.slice(0, 3)); // Show top 3 packages
      },
      error: (error) => {
        this.notificationService.showError('Error loading credit packages');
      }
    });
  }

  purchasePackage(creditPackage: CreditPackage) {
    this.isLoading.set(true);
    this.stripeService.createPaymentIntent(creditPackage.price * 100).subscribe({
      next: (response) => {
        this.stripeService.confirmPayment(response.clientSecret).then(() => {
          this.creditService.addCredits(creditPackage.credits, `Purchase of ${creditPackage.name}`).subscribe({
            next: (response) => {
              this.creditInfo.update(info => ({ ...info!, credits: response.credits }));
              this.loadCreditHistory();
              this.notificationService.showSuccess(`Successfully purchased ${creditPackage.name}`);
              this.isLoading.set(false);
            },
            error: () => {
              this.isLoading.set(false);
              this.notificationService.showError('Error processing credit purchase');
            }
          });
        }).catch((error) => {
          this.notificationService.showError('Payment failed: ' + error.message);
          this.isLoading.set(false);
        });
      },
      error: () => {
        this.isLoading.set(false);
        this.notificationService.showError('Error creating payment');
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadCreditHistory();
  }

  toggleHistory() {
    this.showHistory.update(show => !show);
    if (this.showHistory() && this.creditHistory().length === 0) {
      this.loadCreditHistory();
    }
  }

  bestValuePackage = computed(() => {
    return this.topPackages().reduce((best, current) => 
      (current.credits / current.price > best.credits / best.price) ? current : best
    );
  });


  scrollToPackages() {
    const packagesElement = document.getElementById('packages');
    if (packagesElement) {
      packagesElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


}