// src/app/components/admin/admin-user-management.component.ts

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AdminService, User } from '../../services/admin.service';
import { UserDetailComponent } from './user-detail.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="user-management-container">
      <h2>User Management</h2>
      <mat-form-field>
        <input matInput (keyup)="applyFilter($event)" placeholder="Search users" #input>
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
            <td mat-cell *matCellDef="let user">{{user.email}}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let user">{{user.name}}</td>
          </ng-container>
          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
            <td mat-cell *matCellDef="let user">{{user.role}}</td>
          </ng-container>
          <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
          <td mat-cell *matCellDef="let user">{{user.accountStatus || 'N/A'}}</td>
        </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let user">
              <button mat-button color="primary" (click)="openUserDetails(user)">View</button>
              <button mat-button color="warn" (click)="suspendUser(user)" *ngIf="user.status !== 'suspended'">Suspend</button>
              <button mat-button color="accent" (click)="activateUser(user)" *ngIf="user.status === 'suspended'">Activate</button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" showFirstLastButtons></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container {
      padding: 20px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
    table {
      width: 100%;
    }
  `]
})
export class AdminUserManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'name', 'role', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  isLoading = true;
  totalUsers = 0;
  pageSize = 10;
  currentPage = 1;
  searchTerm = '';
  private searchSubject = new Subject<string>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 1;
      this.loadUsers();
    });
  }


  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.isLoading = true;
    console.log('Loading users with params:', {
      page: this.currentPage,
      pageSize: this.pageSize,
      sort: this.sort?.active || 'name',
      order: this.sort?.direction || 'asc',
      search: this.searchTerm
    });

    this.adminService.getAllUsers(
      this.currentPage,
      this.pageSize,
      this.sort?.active || 'name',
      this.sort?.direction || 'asc',
      this.searchTerm
    ).subscribe({
      next: (response) => {
        console.log('Users loaded:', response);
        this.dataSource.data = response.users;
        this.totalUsers = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        this.snackBar.open('Error loading users. Please try again later.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
  sortData(sort: Sort) {
    this.loadUsers();
  }

  openUserDetails(user: User) {
    console.log('Opening user details for:', user); // Add this line for debugging
    this.dialog.open(UserDetailComponent, {
      width: '400px',
      data: { userId: user._id } // Change user.id to user._id
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTerm = filterValue.trim().toLowerCase();
    this.searchSubject.next(this.searchTerm);
  }


  suspendUser(user: User) {
    if (confirm(`Are you sure you want to suspend ${user.name}?`)) {
      this.adminService.suspendUser(user._id).subscribe({
        next: (response) => {
          user.status = 'suspended';
          this.snackBar.open(`User ${user.name} has been suspended.`, 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error suspending user:', error);
          this.snackBar.open('Error suspending user. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  activateUser(user: User) {
    if (confirm(`Are you sure you want to activate ${user.name}?`)) {
      this.adminService.activateUser(user._id).subscribe({
        next: (response) => {
          user.status = 'active';
          this.snackBar.open(`User ${user.name} has been activated.`, 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error activating user:', error);
          this.snackBar.open('Error activating user. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
  // testAdminRoute() {
  //   this.adminService.testAdminRoute().subscribe({
  //     next: (response) => {
  //       console.log('Admin route test successful:', response);
  //       this.snackBar.open('Admin route test successful', 'Close', { duration: 3000 });
  //     },
  //     error: (error) => {
  //       console.error('Admin route test failed:', error);
  //       this.snackBar.open('Admin route test failed', 'Close', { duration: 3000 });
  //     }
  //   });
  // }
  // testUsersRoute() {
  //   this.adminService.testUsersRoute().subscribe({
  //     next: (response) => {
  //       console.log('Users route test successful:', response);
  //       this.snackBar.open('Users route test successful', 'Close', { duration: 3000 });
  //     },
  //     error: (error) => {
  //       console.error('Users route test failed:', error);
  //       this.snackBar.open('Users route test failed', 'Close', { duration: 3000 });
  //     }
  //   });
  // }

}