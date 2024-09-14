//frontend/src/app/components/workspace/workspace-create/workspace-create.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WorkspaceService } from '../../../services/workspace.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workspace-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <h2>Create New Workspace</h2>
    <form [formGroup]="workspaceForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Workspace Name</mat-label>
        <input matInput formControlName="name" required>
        <mat-error *ngIf="workspaceForm.get('name')?.hasError('required')">Workspace name is required</mat-error>
        <mat-error *ngIf="workspaceForm.get('name')?.hasError('minlength')">Workspace name must be at least 3 characters long</mat-error>
        <mat-error *ngIf="workspaceForm.get('name')?.hasError('maxlength')">Workspace name cannot exceed 50 characters</mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description" rows="3"></textarea>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="workspaceForm.invalid">Create Workspace</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 300px;
      margin: 0 auto;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class WorkspaceCreateComponent {
  workspaceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private workspaceService: WorkspaceService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.workspaceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const { name, description } = this.workspaceForm.value;
      this.workspaceService.createWorkspace(name, description).subscribe({
        next: () => {
          this.snackBar.open('Workspace created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/workspaces']);
        },
        error: (error) => {
          console.error('Error creating workspace', error);
          this.snackBar.open('Failed to create workspace. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
}