// src/app/components/auth/email/email-verification/email-verification.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="email-verification-container">
      <h2>Email Verification</h2>
      @if (isLoading) {
        <mat-spinner></mat-spinner>
      } @else if (isVerified) {
        <p>Your email has been successfully verified. You can now log in.</p>
      } @else {
        <p>{{ errorMessage }}</p>
        @if (isExpired) {
          <button mat-raised-button color="primary" (click)="resendVerificationEmail()">Resend Verification Email</button>
        }
      }
    </div>
  `,
  styles: [`
    .email-verification-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
  `]
})
export class EmailVerificationComponent implements OnInit {
  isLoading = true;
  isVerified = false;
  isExpired = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.verifyEmail(token);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Invalid verification link';
    }
  }

  private verifyEmail(token: string) {
    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.isVerified = true;
        this.snackBar.open('Email verified successfully', 'Close', { duration: 5000 });
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        console.error('Email verification failed:', error);
        if (error.error?.isExpired) {
          this.isExpired = true;
          this.errorMessage = 'Your verification link has expired. Please request a new one.';
        } else {
          this.errorMessage = 'Email verification failed. Please try again or contact support.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  resendVerificationEmail() {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
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
    } else {
      this.snackBar.open('Email address not found. Please try requesting a new verification email.', 'Close', { duration: 5000 });
    }
  }
}