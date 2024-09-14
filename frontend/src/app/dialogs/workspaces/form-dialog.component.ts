// src/app/components/workspace/form-dialog/form-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent
  ],
  template: `
    <h2 mat-dialog-title>{{ data.isNew ? 'Create' : 'Edit' }} Form</h2>
    <mat-dialog-content>
      <form [formGroup]="formGroup">
        <mat-form-field>
          <mat-label>Form Name</mat-label>
          <input matInput formControlName="name" required>
          <!-- <mat-error *ngIf="formGroup.get('name')?.hasError('required') && formGroup.get('name')?.touched">
            Form name is required
          </mat-error> -->
        </mat-form-field>
        <!-- Add more fields for form structure as needed -->
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" [disabled]="formGroup.invalid" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class FormDialogComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any, isNew: boolean }
  ) {
    this.formGroup = this.fb.group({
      name: [data.form.name || '', [Validators.required]],
      // Add more form controls for the form structure as needed
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        ...this.data.form,
        ...this.formGroup.value
      });
    }
  }
}
