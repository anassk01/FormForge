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
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
      <div class="space-y-4">
        @if (user) {
          <p><span class="font-medium text-gray-700">Name:</span> {{ user.name }}</p>
          <p><span class="font-medium text-gray-700">Email:</span> {{ user.email }}</p>
          <p><span class="font-medium text-gray-700">Role:</span> {{ user.role }}</p>
          <p><span class="font-medium text-gray-700">Status:</span> {{ user.status || 'N/A' }}</p>
          <p><span class="font-medium text-gray-700">Created At:</span> {{ user.createdAt | date }}</p>
          <p><span class="font-medium text-gray-700">Last Login:</span> {{ user.lastLoginAt | date }}</p>
        } @else if (error) {
          <p class="text-red-500">Error loading user details: {{ error }}</p>
        } @else {
          <p class="text-gray-500">Loading user details...</p>
        }
      </div>
      <div class="mt-6 flex justify-end">
        <button 
          class="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
          (click)="close()"
        >
          Close
        </button>
      </div>
    </div>
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
    console.log('Loading user details. User ID:', this.data.userId);
    if (!this.data.userId) {
      this.error = 'User ID is undefined';
      return;
    }
  
    this.adminService.getUser(this.data.userId).subscribe({
      next: (user) => {
        console.log('User details loaded:', user);
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