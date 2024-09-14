import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <h1 mat-dialog-title>{{ data.name ? 'Edit' : 'Add' }} Folder</h1>
    <div mat-dialog-content>
      <form [formGroup]="folderForm">
        <mat-form-field>
          <mat-label>Folder Name</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="folderForm.get('name')?.hasError('required')">
            Folder name is required
          </mat-error>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button [disabled]="folderForm.invalid" (click)="onSubmit()">
        {{ data.name ? 'Update' : 'Add' }}
      </button>
    </div>
  `
})
export class FolderDialogComponent {
  folderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private fb: FormBuilder
  ) {
    this.folderForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.minLength(1)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.folderForm.valid) {
      this.dialogRef.close(this.folderForm.value.name);
    }
  }
}