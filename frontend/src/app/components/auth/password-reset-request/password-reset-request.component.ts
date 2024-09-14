import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-reset-request',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid || isLoading">
        {{ isLoading ? 'Sending...' : 'Reset Password' }}
      </button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
    }
  `]
})
export class PasswordResetRequestComponent {
  resetForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.authService.requestPasswordReset(this.resetForm.value.email).subscribe({
        next: () => {
          this.snackBar.open('Password reset email sent. Please check your inbox.', 'Close', { duration: 5000 });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Password reset request failed:', error);
          this.snackBar.open(error.error.message || 'Failed to send reset email. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}