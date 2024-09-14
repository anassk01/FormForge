// component/auth/email/request-verification-email.component.ts
import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-verification-email',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <form [formGroup]="requestForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
        <mat-error *ngIf="requestForm.get('email')?.hasError('required')">Email is required</mat-error>
        <mat-error *ngIf="requestForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="requestForm.invalid || isLoading">
        {{ isLoading ? 'Sending...' : 'Request Verification Email' }}
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
  `]
})
export class RequestVerificationEmailComponent implements OnInit {
  requestForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.requestForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.requestForm.patchValue({ email: params['email'] });
      }
    });
  }


  onSubmit(): void {
    if (this.requestForm.valid && !this.isLoading) {
      this.isLoading = true;
      const email = this.requestForm.get('email')?.value;
      this.authService.resendVerificationEmail(email).subscribe({
        next: () => {
          this.snackBar.open('Verification email sent. Please check your inbox.', 'Close', { duration: 5000 });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error sending verification email:', error);
          this.snackBar.open('Failed to send verification email. Please try again later.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}