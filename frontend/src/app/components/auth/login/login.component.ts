//frontend/src/app/login.component.ts
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
        <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
        <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
        <button mat-icon-button matSuffix (click)="togglePasswordVisibility()" type="button">
          <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
      </mat-form-field>
      @if (requires2FA) {
        <mat-form-field>
          <mat-label>2FA Code</mat-label>
          <input matInput formControlName="twoFactorCode" required>
          <mat-error *ngIf="loginForm.get('twoFactorCode')?.hasError('required')">2FA Code is required</mat-error>
        </mat-form-field>
      }
      <mat-checkbox formControlName="rememberMe">Remember me</mat-checkbox>
      <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
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
      margin-bottom: 20px;
    }
    mat-checkbox {
      margin-bottom: 20px;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  requires2FA = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
      twoFactorCode: ['']
    });
  }
  ngOnInit(): void {
    // Check if the user just verified their email
    this.route.queryParams.subscribe(params => {
      if (params['verified'] === 'true') {
        this.snackBar.open('Email verified successfully. You can now log in.', 'Close', { duration: 5000 });
      }
    });
  }
  


  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { email, password, rememberMe, twoFactorCode } = this.loginForm.value;
      if (this.requires2FA) {
        this.authService.login2FA(email, password, twoFactorCode).subscribe({
          next: (user) => this.handleSuccessfulLogin(user),
          error: (error) => this.handleLoginError(error)
        });
      } else {
        this.authService.login(email, password, rememberMe).subscribe({
          next: (user) => {
            console.log('Login response user:', user); // Add this line to log the user object
            if (!user.isEmailVerified) {
              this.handleUnverifiedEmail(user.email);
            } else if (user.requires2FA) {
              this.requires2FA = true;
              this.snackBar.open('Please enter your 2FA code to complete login.', 'Close', { duration: 5000 });
            } else {
              this.handleSuccessfulLogin(user);
            }
          },
          error: (error) => this.handleLoginError(error)
        });
      }
    }
  }


  private handleUnverifiedEmail(email: string): void {
    this.snackBar.open('Email not verified. Please verify your email to login.', 'Resend', { duration: 10000 })
      .onAction().subscribe(() => {
        this.resendVerificationEmail(email);
      });
    this.isLoading = false;
  }

  private handleSuccessfulLogin(user: any): void {
    console.log('Handling successful login for user:', user);
    if (user.isEmailVerified === false) {
      this.handleUnverifiedEmail(user.email);
    } else {
      this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    }
    this.isLoading = false;
  }

  
  private handleLoginError(error: any): void {
    console.error('Login failed:', error);
    if (error.error?.message === 'Email not verified') {
      this.snackBar.open('Email not verified. Please verify your email to login.', 'Verify', { duration: 10000 })
        .onAction().subscribe(() => {
          const email = this.loginForm.get('email')?.value;
          this.router.navigateByUrl(`/request-verification-email?email=${encodeURIComponent(email)}`);
        });
    } else {
      this.snackBar.open(error.error?.message || 'Login failed. Please check your credentials.', 'Close', { duration: 5000 });
    }
    this.isLoading = false;
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  resendVerificationEmail(email: string): void {
    this.isLoading = true;
    this.authService.resendVerificationEmail(email).subscribe({
      next: () => {
        this.snackBar.open('Verification email resent. Please check your inbox.', 'Close', { duration: 5000 });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error resending verification email:', error);
        this.snackBar.open('Failed to resend verification email. Please try again.', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

}

