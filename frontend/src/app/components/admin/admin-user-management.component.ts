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
    <div class="p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">User Management</h2>
      <div class="mb-4">
        <input 
          class="w-full px-3 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-cyan-500 focus:outline-none transition duration-150 ease-in-out"
          type="text"
          (keyup)="applyFilter($event)"
          placeholder="Search users"
          #input
        >
      </div>
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
            <th *ngFor="let column of displayedColumns" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                [attr.mat-sort-header]="column !== 'actions' ? column : undefined">
              {{ column }}
            </th>

            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let user of dataSource.data">
              <td class="px-6 py-4 whitespace-nowrap">{{user.email}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{user.name}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{user.role}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{user.accountStatus || 'N/A'}}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex justify-center space-x-2">
                  <button 
                    class="text-cyan-500 hover:text-cyan-600 font-medium transition duration-150 ease-in-out"
                    (click)="openUserDetails(user)"
                  >
                    View
                  </button>
                  <button 
                    *ngIf="user.status !== 'suspended'"
                    class="text-red-500 hover:text-red-600 font-medium transition duration-150 ease-in-out"
                    (click)="suspendUser(user)"
                  >
                    Suspend
                  </button>
                  <button 
                    *ngIf="user.status === 'suspended'"
                    class="text-green-500 hover:text-green-600 font-medium transition duration-150 ease-in-out"
                    (click)="activateUser(user)"
                  >
                    Activate
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <mat-paginator 
          [pageSizeOptions]="[5, 10, 25, 100]" 
          showFirstLastButtons
          class="bg-gray-50 border-t border-gray-200"
        ></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #F5F5F5;
      min-height: 100vh;
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
          panelClass: ['bg-red-500', 'text-white']
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
    console.log('Opening user details for:', user);
    this.dialog.open(UserDetailComponent, {
      width: '400px',
      data: { userId: user._id }
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
          this.snackBar.open(`User ${user.name} has been suspended.`, 'Close', { 
            duration: 3000,
            panelClass: ['bg-blue-500', 'text-white']
          });
        },
        error: (error) => {
          console.error('Error suspending user:', error);
          this.snackBar.open('Error suspending user. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['bg-red-500', 'text-white']
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
          this.snackBar.open(`User ${user.name} has been activated.`, 'Close', { 
            duration: 3000,
            panelClass: ['bg-green-500', 'text-white']
          });
        },
        error: (error) => {
          console.error('Error activating user:', error);
          this.snackBar.open('Error activating user. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['bg-red-500', 'text-white']
          });
        }
      });
    }
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

