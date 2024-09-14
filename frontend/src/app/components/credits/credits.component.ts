import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
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
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Your Credits</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <h2>Current Balance: {{ creditInfo?.credits || 0 }} credits</h2>
        <p>Last Updated: {{ creditInfo?.lastUpdated | date:'medium' }}</p>
        
        <h3>Available Packages</h3>
        <div class="package-summary">
          @for (package of topPackages; track package._id) {
            <mat-card>
              <mat-card-title>{{ package.name }}</mat-card-title>
              <mat-card-content>
                <p>Credits: {{ package.credits }}</p>
                <p>Price: {{ package.price | currency }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
        <a mat-raised-button color="primary" routerLink="/credit-packages">View All Packages</a>

        <h3>Credit History</h3>
        @if (isLoading) {
          <mat-spinner diameter="40"></mat-spinner>
        } @else if (creditHistory.length) {
          <table mat-table [dataSource]="creditHistory">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.date | date }}</td>
            </ng-container>
            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.amount }}</td>
            </ng-container>
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.description }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
          <mat-paginator 
            [length]="totalTransactions"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPageChange($event)">
          </mat-paginator>
        } @else {
          <p>No credit history available.</p>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 800px;
      margin: 20px auto;
    }
    table {
      width: 100%;
    }
    mat-spinner {
      margin: 20px auto;
    }
    .package-summary {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .package-summary mat-card {
      width: 150px;
    }
  `]
})
export class CreditsComponent implements OnInit {
  private creditService = inject(CreditService);
  private creditPackageService = inject(CreditPackageService);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);

  creditInfo: CreditInfo | null = null;
  creditHistory: CreditTransaction[] = [];
  displayedColumns: string[] = ['date', 'amount', 'description'];
  isLoading: boolean = false;
  totalTransactions: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  topPackages: CreditPackage[] = [];
  purchaseAmount: number = 1;


  ngOnInit() {
    this.loadCreditInfo();
    this.loadCreditHistory();
    this.loadTopPackages();
  }
  loadCreditInfo() {
    this.isLoading = true;
    this.creditService.getCreditBalance().subscribe({
      next: (info) => {
        this.creditInfo = info;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadCreditHistory() {
    this.isLoading = true;
    this.creditService.getCreditHistory(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.creditHistory = response.transactions;
        this.totalTransactions = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadTopPackages() {
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => {
        this.topPackages = packages.slice(0, 3); // Show top 3 packages
      },
      error: (error) => {
        this.notificationService.showError('Error loading credit packages');
      }
    });
  }

  
  purchaseCredits() {
    if (this.purchaseAmount < 1) {
      this.notificationService.showError('Please enter a valid amount');
      return;
    }

    this.isLoading = true;
    this.stripeService.createPaymentIntent(this.purchaseAmount * 100).subscribe({
      next: (response) => {
        this.stripeService.confirmPayment(response.clientSecret).then(() => {
          this.creditService.addCredits(this.purchaseAmount, 'Credit purchase').subscribe({
            next: (response) => {
              if (this.creditInfo) {
                this.creditInfo.credits = response.credits;
              }
              this.loadCreditHistory();
              this.isLoading = false;
            },
            error: () => {
              this.isLoading = false;
            }
          });
        }).catch((error) => {
          this.notificationService.showError('Payment failed: ' + error.message);
          this.isLoading = false;
        });
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCreditHistory();
  }
}