// src/app/components/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionManagementComponent } from '../subscription-management/subscription-management.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule, 
    SubscriptionManagementComponent
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Name:</strong> {{ user?.name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <p><strong>Credits:</strong> {{ user?.credits }}</p>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button color="primary" routerLink="/two-factor-auth">Manage Two-Factor Authentication</a>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Change Password</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="changePasswordForm" (ngSubmit)="onChangePassword()">
            <mat-form-field>
              <input matInput type="password" formControlName="currentPassword" placeholder="Current Password">
              <mat-error *ngIf="changePasswordForm.get('currentPassword')?.hasError('required')">Current password is required</mat-error>
            </mat-form-field>
            <mat-form-field>
              <input matInput type="password" formControlName="newPassword" placeholder="New Password">
              <mat-error *ngIf="changePasswordForm.get('newPassword')?.hasError('required')">New password is required</mat-error>
              <mat-error *ngIf="changePasswordForm.get('newPassword')?.hasError('minlength')">Password must be at least 8 characters long</mat-error>
              <mat-error *ngIf="changePasswordForm.get('newPassword')?.hasError('weakPassword')">Password must contain uppercase, lowercase, number, and special character</mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="changePasswordForm.invalid">Change Password</button>
          </form>
        </mat-card-content>
      </mat-card>

      <app-subscription-management></app-subscription-management>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 20px auto;
    }
    mat-card {
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  changePasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => this.notificationService.showError('Error loading user profile')
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

  onChangePassword() {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      this.authService.changePassword(currentPassword, newPassword).subscribe({
        next: () => {
          this.notificationService.showSuccess('Password changed successfully');
          this.changePasswordForm.reset();
        },
        error: (error) => {
          this.notificationService.showError(error.error.message || 'Failed to change password');
        }
      });
    }
  }
}