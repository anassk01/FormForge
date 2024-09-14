import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>New Password</mat-label>
        <input matInput type="password" formControlName="password" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Confirm Password</mat-label>
        <input matInput type="password" formControlName="confirmPassword" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid || isLoading">
        {{ isLoading ? 'Resetting...' : 'Set New Password' }}
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
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.snackBar.open('Invalid password reset link', 'Close', { duration: 5000 });
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }
  onSubmit(): void {
    if (this.resetForm.valid && !this.isLoading && this.token) {
      this.isLoading = true;
      this.authService.resetPassword(this.token, this.resetForm.value.password).subscribe({
        next: () => {
          this.snackBar.open('Password reset successful. You can now log in with your new password.', 'Close', { duration: 5000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Password reset failed:', error);
          this.snackBar.open(error.error.message || 'Failed to reset password. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}