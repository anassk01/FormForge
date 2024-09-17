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
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ data._id ? 'Edit' : 'Add' }} Credit Package</h2>
      <form [formGroup]="packageForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" type="text" formControlName="name" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50">
          @if (packageForm.get('name')?.hasError('required') && packageForm.get('name')?.touched) {
            <p class="mt-1 text-sm text-red-600">Name is required</p>
          }
        </div>

        <div>
          <label for="credits" class="block text-sm font-medium text-gray-700">Credits</label>
          <input id="credits" type="number" formControlName="credits" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50">
          @if (packageForm.get('credits')?.hasError('required') && packageForm.get('credits')?.touched) {
            <p class="mt-1 text-sm text-red-600">Credits is required</p>
          }
          @if (packageForm.get('credits')?.hasError('min')) {
            <p class="mt-1 text-sm text-red-600">Credits must be at least 1</p>
          }
        </div>

        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input id="price" type="number" formControlName="price" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50">
          @if (packageForm.get('price')?.hasError('required') && packageForm.get('price')?.touched) {
            <p class="mt-1 text-sm text-red-600">Price is required</p>
          }
          @if (packageForm.get('price')?.hasError('min')) {
            <p class="mt-1 text-sm text-red-600">Price must be at least 0</p>
          }
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" formControlName="description" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"></textarea>
          @if (packageForm.get('description')?.hasError('required') && packageForm.get('description')?.touched) {
            <p class="mt-1 text-sm text-red-600">Description is required</p>
          }
        </div>

        <div class="flex items-center">
          <input id="isSubscription" type="checkbox" formControlName="isSubscription"
                 class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded">
          <label for="isSubscription" class="ml-2 block text-sm text-gray-900">Is Subscription</label>
        </div>

        <div>
          <label for="durationDays" class="block text-sm font-medium text-gray-700">Duration (days)</label>
          <input id="durationDays" type="number" formControlName="durationDays" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50">
          @if (packageForm.get('durationDays')?.hasError('required') && packageForm.get('durationDays')?.touched) {
            <p class="mt-1 text-sm text-red-600">Duration is required</p>
          }
          @if (packageForm.get('durationDays')?.hasError('min')) {
            <p class="mt-1 text-sm text-red-600">Duration must be at least 1 day</p>
          }
        </div>

        <div>
          <label for="stripePriceId" class="block text-sm font-medium text-gray-700">Stripe Price ID</label>
          <input id="stripePriceId" type="text" formControlName="stripePriceId" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50">
          @if (packageForm.get('stripePriceId')?.hasError('required') && packageForm.get('stripePriceId')?.touched) {
            <p class="mt-1 text-sm text-red-600">Stripe Price ID is required</p>
          }
        </div>
      </form>
      <div class="mt-6 flex justify-end space-x-3">
        <button 
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
          (click)="onCancel()"
        >
          Cancel
        </button>
        <button 
          class="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
          [disabled]="packageForm.invalid"
          (click)="onSubmit()"
        >
          {{ data._id ? 'Update' : 'Create' }}
        </button>
      </div>
    </div>
  `
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