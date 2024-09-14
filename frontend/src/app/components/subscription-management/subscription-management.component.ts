// src/app/components/subscription-management/subscription-management.component.ts
import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { SubscriptionService, Subscription } from '../../services/subscription.service';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Your Subscription</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <ng-container *ngIf="currentSubscription; else noSubscription">
          <p>Package: {{ currentSubscription.packageId.name || 'Unknown' }}</p>
          <p>Status: {{ currentSubscription.status }}</p>
          <p>Start Date: {{ currentSubscription.startDate | date }}</p>
          <p>End Date: {{ currentSubscription.endDate | date }}</p>
        </ng-container>
        <ng-template #noSubscription>
          <p>You don't have an active subscription.</p>
        </ng-template>
      </mat-card-content>
      <mat-card-actions>
        <button *ngIf="currentSubscription && currentSubscription.status !== 'cancelled'" mat-raised-button color="primary" (click)="openUpgradeDialog()">Upgrade</button>
        <button *ngIf="currentSubscription && currentSubscription.status !== 'cancelled'" mat-raised-button color="warn" (click)="cancelSubscription()">Cancel</button>
        <button *ngIf="!currentSubscription || currentSubscription.status === 'cancelled'" mat-raised-button color="primary" (click)="openSubscribeDialog()">Subscribe</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 600px;
      margin: 20px auto;
    }
  `]
})
export class SubscriptionManagementComponent implements OnInit {
  currentSubscription: Subscription | null = null;
  availablePackages: CreditPackage[] = [];

  private subscriptionService = inject(SubscriptionService);
  private creditPackageService = inject(CreditPackageService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadCurrentSubscription();
    this.loadAvailablePackages();
  }

  loadCurrentSubscription() {
    this.subscriptionService.getCurrentSubscription().subscribe({
      next: (subscription) => this.currentSubscription = subscription,
      error: (error) => this.notificationService.showError('Error loading subscription')
    });
  }

  loadAvailablePackages() {
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => this.availablePackages = packages.filter(p => p.isSubscription),
      error: (error) => this.notificationService.showError('Error loading packages')
    });
  }

  openSubscribeDialog() {
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '400px',
      data: { packages: this.availablePackages }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscribe(result);
      }
    });
  }

  openUpgradeDialog() {
    const dialogRef = this.dialog.open(UpgradeDialogComponent, {
      width: '400px',
      data: { 
        currentPackage: this.currentSubscription?.packageId,
        packages: this.availablePackages
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.upgradeSubscription(result);
      }
    });
  }

  subscribe(packageId: string) {
    this.subscriptionService.subscribe(packageId).subscribe({
      next: (subscription) => {
        this.currentSubscription = subscription;
        this.notificationService.showSuccess('Successfully subscribed');
      },
      error: (error) => this.notificationService.showError('Error subscribing')
    });
  }

  upgradeSubscription(packageId: string) {
    this.subscriptionService.upgradeSubscription(packageId).subscribe({
      next: (subscription) => {
        this.currentSubscription = subscription;
        this.notificationService.showSuccess('Successfully upgraded subscription');
      },
      error: (error) => this.notificationService.showError('Error upgrading subscription')
    });
  }

  cancelSubscription() {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      this.subscriptionService.cancelSubscription().subscribe({
        next: (response) => {
          if (this.currentSubscription) {
            this.currentSubscription.status = 'cancelled';
            this.currentSubscription.endDate = response.endDate;
          }
          this.notificationService.showSuccess('Subscription cancelled successfully. You will have access until the end of your billing period.');
        },
        error: (error) => this.notificationService.showError('Error cancelling subscription')
      });
    }
  }}

@Component({
  selector: 'app-subscribe-dialog',
  template: `
    <h2 mat-dialog-title>Choose a Subscription</h2>
    <mat-dialog-content>
      <mat-radio-group [(ngModel)]="selectedPackage">
        @for (pkg of data.packages; track pkg._id) {
          <mat-radio-button [value]="pkg._id">
            {{ pkg.name }} - {{ pkg.price }}/month
          </mat-radio-button>
        }
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="selectedPackage" [disabled]="!selectedPackage">Subscribe</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatRadioModule, FormsModule]
})
export class SubscribeDialogComponent {
  selectedPackage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<SubscribeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { packages: CreditPackage[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
    selector: 'app-upgrade-dialog',
    template: `
    <h2 mat-dialog-title>Upgrade Subscription</h2>
    <mat-dialog-content>
      <mat-radio-group [(ngModel)]="selectedPackage">
        @for (pkg of availableUpgrades; track pkg._id) {
          <mat-radio-button [value]="pkg._id">
            {{ pkg.name }} - {{ pkg.price }}/month
          </mat-radio-button>
        }
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="selectedPackage" [disabled]="!selectedPackage">Upgrade</button>
    </mat-dialog-actions>
  `,
    standalone: true,
    imports: [MatDialogModule, MatRadioModule, FormsModule]
  })
  export class UpgradeDialogComponent implements OnInit {
    selectedPackage: string | null = null;
    availableUpgrades: CreditPackage[] = [];
  
    constructor(
      public dialogRef: MatDialogRef<UpgradeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { currentPackage: CreditPackage | undefined, packages: CreditPackage[] }
    ) {}
  
    ngOnInit() {
      this.availableUpgrades = this.data.packages.filter(p => 
        p.price > (this.data.currentPackage?.price || 0)
      );
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }