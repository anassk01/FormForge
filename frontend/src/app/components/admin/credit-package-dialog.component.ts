  // src/app/components/admin/credit-package-dialog.component.ts
  import { Component, Inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { CreditPackage } from '../../services/admin.service';
  
  @Component({
    selector: 'app-credit-package-dialog',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule
    ],
    template: `
      <h2 mat-dialog-title>{{ data._id ? 'Edit' : 'Add' }} Credit Package</h2>
      <mat-dialog-content>
        <form [formGroup]="packageForm">
          <mat-form-field appearance="fill">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" required>
            <mat-error *ngIf="packageForm.get('name')?.hasError('required')">Name is required</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Credits</mat-label>
            <input matInput type="number" formControlName="credits" required>
            <mat-error *ngIf="packageForm.get('credits')?.hasError('required')">Credits is required</mat-error>
            <mat-error *ngIf="packageForm.get('credits')?.hasError('min')">Credits must be at least 1</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price" required>
            <mat-error *ngIf="packageForm.get('price')?.hasError('required')">Price is required</mat-error>
            <mat-error *ngIf="packageForm.get('price')?.hasError('min')">Price must be at least 0</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" required></textarea>
            <mat-error *ngIf="packageForm.get('description')?.hasError('required')">Description is required</mat-error>
          </mat-form-field>
          <mat-checkbox formControlName="isSubscription">Is Subscription</mat-checkbox>
          <mat-form-field appearance="fill">
            <mat-label>Duration (days)</mat-label>
            <input matInput type="number" formControlName="durationDays" required>
            <mat-error *ngIf="packageForm.get('durationDays')?.hasError('required')">Duration is required</mat-error>
            <mat-error *ngIf="packageForm.get('durationDays')?.hasError('min')">Duration must be at least 1 day</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Stripe Price ID</mat-label>
            <input matInput formControlName="stripePriceId" required>
            <mat-error *ngIf="packageForm.get('stripePriceId')?.hasError('required')">Stripe Price ID is required</mat-error>
          </mat-form-field>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="packageForm.invalid" (click)="onSubmit()">
          {{ data._id ? 'Update' : 'Create' }}
        </button>
      </mat-dialog-actions>
    `,
    styles: [`
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    `]
  })
  export class CreditPackageDialogComponent {
    packageForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<CreditPackageDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Partial<CreditPackage>
    ) {
      this.packageForm = this.fb.group({
        name: [data.name || '', Validators.required],
        credits: [data.credits || '', [Validators.required, Validators.min(1)]],
        price: [data.price || '', [Validators.required, Validators.min(0)]],
        description: [data.description || '', Validators.required],
        isSubscription: [data.isSubscription || false],
        durationDays: [data.durationDays || 30, [Validators.required, Validators.min(1)]],
        stripePriceId: [data.stripePriceId || '', Validators.required]
      });
    }
    onCancel(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
      if (this.packageForm.valid) {
        const formData = this.packageForm.value;
        if (this.data._id) {
          formData._id = this.data._id;
        }
        this.dialogRef.close(formData);
      }
    }
  }
  