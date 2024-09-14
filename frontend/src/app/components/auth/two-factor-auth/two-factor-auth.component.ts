import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

interface TwoFAStatus {
  enabled: boolean;
}

@Component({
  selector: 'app-two-factor-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="two-factor-auth-container">
      <h2>Two-Factor Authentication</h2>
      @if (twoFAEnabled) {
        <p>Two-factor authentication is currently enabled.</p>
        <button mat-raised-button color="warn" (click)="disable2FA()">Disable 2FA</button>
      } @else {
        @if (secret && qrCodeDataUrl) {
          <img [src]="qrCodeDataUrl" alt="QR Code for 2FA">
          <p>Secret key: {{ secret }}</p>
          <p>Scan the QR code or enter the secret key in your authenticator app.</p>
          <form [formGroup]="verificationForm" (ngSubmit)="verify2FA()">
            <mat-form-field>
              <mat-label>Verification Code</mat-label>
              <input matInput formControlName="token" required>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="verificationForm.invalid">Verify</button>
          </form>
        } @else {
          <button mat-raised-button color="primary" (click)="enable2FA()">Enable 2FA</button>
        }
      }
    </div>
  `,
  styles: [`
    .two-factor-auth-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
    }
    img {
      max-width: 200px;
      margin-bottom: 20px;
    }
  `]
})
export class TwoFactorAuthComponent implements OnInit {
  twoFAEnabled = false;
  secret: string | null = null;
  qrCodeDataUrl: string | null = null;
  verificationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.verificationForm = this.formBuilder.group({
      token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
    this.checkTwoFAStatus();
  }

  checkTwoFAStatus() {
    this.authService.getTwoFAStatus().subscribe({
      next: (status: TwoFAStatus) => {
        this.twoFAEnabled = status.enabled;
      },
      error: (error: any) => {
        console.error('Error checking 2FA status:', error);
        this.snackBar.open('Failed to check 2FA status.', 'Close', { duration: 5000 });
      }
    });
  }

  enable2FA() {
    this.authService.enable2FA().subscribe({
      next: (response: { secret: string; qrCodeDataUrl: string }) => {
        this.secret = response.secret;
        this.qrCodeDataUrl = response.qrCodeDataUrl;
      },
      error: (error: any) => {
        console.error('Error enabling 2FA:', error);
        this.snackBar.open('Failed to enable 2FA. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  verify2FA() {
    if (this.verificationForm.valid) {
      const token = this.verificationForm.value.token;
      this.authService.verify2FA(token).subscribe({
        next: (response: { verified: boolean; message: string }) => {
          if (response.verified) {
            this.twoFAEnabled = true;
            this.snackBar.open(response.message, 'Close', { duration: 5000 });
          } else {
            this.snackBar.open(response.message, 'Close', { duration: 5000 });
          }
        },
        error: (error: any) => {
          console.error('Error verifying 2FA:', error);
          this.snackBar.open('Failed to verify 2FA. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }

  disable2FA() {
    this.authService.disable2FA().subscribe({
      next: (response: { disabled: boolean; message: string }) => {
        if (response.disabled) {
          this.twoFAEnabled = false;
          this.secret = null;
          this.qrCodeDataUrl = null;
          this.snackBar.open(response.message, 'Close', { duration: 5000 });
        } else {
          this.snackBar.open('Failed to disable 2FA. Please try again.', 'Close', { duration: 5000 });
        }
      },
      error: (error: any) => {
        console.error('Error disabling 2FA:', error);
        this.snackBar.open('Failed to disable 2FA. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
}