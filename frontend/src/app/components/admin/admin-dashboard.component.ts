// src/app/components/admin/admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AdminService ,AnalyticsData} from '../../services/admin.service';
import { AdminUserManagementComponent } from './admin-user-management.component';
import { AdminCreditPackagesComponent } from './admin-credit-packages.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule, 
    MatProgressSpinnerModule, 
    MatTabsModule,
    MatSnackBarModule,
    AdminUserManagementComponent,
    AdminCreditPackagesComponent
  ],
  template: `
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <mat-tab-group>
        <mat-tab label="Analytics">
          <ng-template matTabContent>
            <h2>Subscription Analytics</h2>
            @if (isLoading) {
              <div class="spinner-container">
                <mat-spinner></mat-spinner>
              </div>
            } @else if (analytics) {
              <div class="analytics-grid">
                <mat-card>
                  <mat-card-title>Active Subscribers</mat-card-title>
                  <mat-card-content>{{ analytics.activeSubscribers }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Monthly Recurring Revenue</mat-card-title>
                  <mat-card-content>{{ analytics.monthlyRecurringRevenue.toFixed(2) }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Churn Rate</mat-card-title>
                  <mat-card-content>{{ (analytics.churnRate * 100).toFixed(2) }}%</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>New Subscribers (Last 30 Days)</mat-card-title>
                  <mat-card-content>{{ analytics.newSubscribers }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Average Revenue Per User</mat-card-title>
                  <mat-card-content>{{ analytics.averageRevenuePerUser.toFixed(2) }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Subscription Growth Rate</mat-card-title>
                  <mat-card-content>{{ (analytics.subscriptionGrowthRate * 100).toFixed(2) }}%</mat-card-content>
                </mat-card>
              </div>
            } @else {
              <p class="error-message">Failed to load analytics data. Please try again later.</p>
            }
          </ng-template>
        </mat-tab>
        <mat-tab label="User Management">
          <ng-template matTabContent>
            <app-admin-user-management></app-admin-user-management>
          </ng-template>
        </mat-tab>
        <mat-tab label="Credit Packages">
          <ng-template matTabContent>
            <app-admin-credit-packages></app-admin-credit-packages>
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
    }
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    mat-card {
      text-align: center;
    }
    mat-card-content {
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
    .error-message {
      color: red;
      text-align: center;
      font-size: 18px;
      margin-top: 20px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  analytics: AnalyticsData | null = null;
  isLoading = true;
  private  router = inject(Router);
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}


  ngOnInit() {
    this.loadAnalytics();
  }
  loadAnalytics() {
    console.log('Loading analytics...');
    this.isLoading = true;
    this.adminService.getSubscriptionAnalytics().subscribe({
      next: (data) => {
        console.log('Analytics data received:', data);
        this.analytics = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
        this.isLoading = false;
        this.analytics = null;
        if (error.status === 401) {
          console.log('Unauthorized access, redirecting to login');
          this.router.navigate(['/login']);
        } else {
          this.notificationService.showError('Error loading analytics. Please try again later.');
        }
      }
    });
  }
}  