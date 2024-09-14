// src/app/components/auth/register/register.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" placeholder="Password" required>
        <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
        <mat-error *ngIf="registerForm.get('password')?.hasError('weakPassword')">Password does not meet strength requirements</mat-error>
      </mat-form-field>
      <div class="password-requirements">
        Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
      </div>
      <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Register</button>
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
      margin-bottom: 20px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    
    if (hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas) {
      return null;
    } else {
      return { 'weakPassword': true };
    }
  }


  onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.snackBar.open(response.message || 'Registration successful. Please check your email to verify your account.', 'Close', { duration: 5000 });
          this.router.navigate(['/verify-email'], { queryParams: { email: this.registerForm.value.email } });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.snackBar.open(error.error.message || 'Registration failed. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
  
  
}