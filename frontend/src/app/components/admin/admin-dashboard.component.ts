import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService, AnalyticsData } from '../../services/admin.service';
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
    <div class="admin-dashboard bg-white p-6">
      <h1 class="text-2xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>
      <mat-tab-group class="bg-gray-50 rounded-lg shadow-sm">
        <mat-tab label="Analytics">
          <ng-template matTabContent>
            <div class="p-6">
              <h2 class="text-xl font-medium mb-6 text-gray-700">Subscription Analytics</h2>
              @if (isLoading) {
                <div class="flex justify-center items-center h-64">
                  <mat-spinner [diameter]="40"></mat-spinner>
                </div>
              } @else if (analytics) {
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <mat-card class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <mat-card-title class="text-lg font-medium text-gray-700 mb-2">Active Subscribers</mat-card-title>
                    <mat-card-content class="text-2xl font-semibold text-cyan-500">{{ analytics.activeSubscribers }}</mat-card-content>
                  </mat-card>
                  <mat-card class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <mat-card-title class="text-lg font-medium text-gray-700 mb-2">Monthly Recurring Revenue</mat-card-title>
                    <mat-card-content class="text-2xl font-semibold text-cyan-500">{{ analytics.monthlyRecurringRevenue.toFixed(2) }}</mat-card-content>
                  </mat-card>
                  <mat-card class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <mat-card-title class="text-lg font-medium text-gray-700 mb-2">Churn Rate</mat-card-title>
                    <mat-card-content class="text-2xl font-semibold text-cyan-500">{{ (analytics.churnRate * 100).toFixed(2) }}%</mat-card-content>
                  </mat-card>
                  <mat-card class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <mat-card-title class="text-lg font-medium text-gray-700 mb-2">New Subscribers (Last 30 Days)</mat-card-title>
                    <mat-card-content class="text-2xl font-semibold text-cyan-500">{{ analytics.newSubscribers }}</mat-card-content>
                  </mat-card>
                  <mat-card class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <mat-card-title class="text-lg font-medium text-gray-700 mb-2">Average Revenue Per User</mat-card-title>
                    <mat-card-content class="text-2xl font-semibold text-cyan-500">{{ analytics.averageRevenuePerUser.toFixed(2) }}</mat-card-content>
                  </mat-card>
                  <mat-card class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <mat-card-title class="text-lg font-medium text-gray-700 mb-2">Subscription Growth Rate</mat-card-title>
                    <mat-card-content class="text-2xl font-semibold text-cyan-500">{{ (analytics.subscriptionGrowthRate * 100).toFixed(2) }}%</mat-card-content>
                  </mat-card>
                </div>
              } @else {
                <p class="text-red-500 text-center text-lg">Failed to load analytics data. Please try again later.</p>
              }
            </div>
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
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  analytics: AnalyticsData | null = null;
  isLoading = true;
  private router = inject(Router);

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