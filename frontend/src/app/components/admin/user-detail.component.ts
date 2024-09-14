// src/app/components/admin/user-detail.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AdminService, User } from '../../services/admin.service';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>User Details</h2>
    <mat-dialog-content>
      @if (user) {
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <p><strong>Status:</strong> {{ user.status || 'N/A' }}</p>
              <p><strong>Created At:</strong> {{ user.createdAt | date }}</p>
        <p><strong>Last Login:</strong> {{ user.lastLoginAt | date }}</p>
      } @else if (error) {
        <p>Error loading user details: {{ error }}</p>
      } @else {
        <p>Loading user details...</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  error: string | null = null;


  constructor(
    private adminService: AdminService,
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { userId: string }
  ) {}
  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    console.log('Loading user details. User ID:', this.data.userId); // Add this line
    if (!this.data.userId) {
      this.error = 'User ID is undefined';
      return;
    }
  
    this.adminService.getUser(this.data.userId).subscribe({
      next: (user) => {
        console.log('User details loaded:', user); // Add this line
        this.user = user;
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.error = 'Failed to load user details. Please try again.';
      }
    });
  }

  close() {
    this.dialogRef.close();
  }


}