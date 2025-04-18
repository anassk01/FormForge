// src/app/components/admin/admin-credit-packages.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AdminService, CreditPackage } from '../../services/admin.service';
import { CreditPackageDialogComponent } from './credit-package-dialog.component';

@Component({
  selector: 'app-admin-credit-packages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="p-5">
      <h2 class="text-2xl font-semibold mb-4">Credit Packages</h2>
      <button class="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out mb-4" 
        (click)="openDialog()">Add New Package</button>

      <mat-form-field class="w-full mb-4">
        <input matInput (keyup)="applyFilter($event)" placeholder="Filter packages" class="w-full border-b-2 border-gray-300 focus:border-cyan-500 focus:outline-none transition duration-150 ease-in-out">
      </mat-form-field>

      @if (isLoading) {
        <div class="flex justify-center items-center h-40">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (dataSource.data.length) {
        <div class="mat-elevation-z8">
          <table mat-table [dataSource]="dataSource" matSort class="min-w-full table-auto">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header class="px-4 py-2">Name</th>
              <td mat-cell *matCellDef="let creditPackage" class="px-4 py-2">{{ creditPackage.name }}</td>
            </ng-container>
            <ng-container matColumnDef="credits">
              <th mat-header-cell *matHeaderCellDef mat-sort-header class="px-4 py-2">Credits</th>
              <td mat-cell *matCellDef="let creditPackage" class="px-4 py-2">{{ creditPackage.credits }}</td>
            </ng-container>
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef mat-sort-header class="px-4 py-2">Price</th>
              <td mat-cell *matCellDef="let creditPackage" class="px-4 py-2">{{ creditPackage.price | currency }}</td>
            </ng-container>
            <ng-container matColumnDef="isSubscription">
              <th mat-header-cell *matHeaderCellDef mat-sort-header class="px-4 py-2">Subscription</th>
              <td mat-cell *matCellDef="let creditPackage" class="px-4 py-2">{{ creditPackage.isSubscription ? 'Yes' : 'No' }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="px-4 py-2">Actions</th>
              <td mat-cell *matCellDef="let creditPackage" class="px-4 py-2">
                <button mat-icon-button color="primary" (click)="openDialog(creditPackage)" class="mr-2">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deletePackage(creditPackage)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" showFirstLastButtons></mat-paginator>
        </div>
      } @else {
        <p class="text-center text-gray-500">No credit packages found.</p>
      }
    </div>
  `
})
export class AdminCreditPackagesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'credits', 'price', 'isSubscription', 'actions'];
  dataSource = new MatTableDataSource<CreditPackage>([]);
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<CreditPackage>([]);
  }

  ngOnInit() {
    this.loadCreditPackages();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCreditPackages() {
    this.isLoading = true;
    this.adminService.getAllCreditPackages().subscribe({
      next: (packages) => {
        this.dataSource.data = packages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading credit packages:', error);
        this.isLoading = false;
        this.snackBar.open('Error loading credit packages. Please try again later.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openDialog(creditPackage?: CreditPackage) {
    const dialogRef = this.dialog.open(CreditPackageDialogComponent, {
      width: '400px',
      data: creditPackage || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._id) {
          this.updatePackage(result);
        } else {
          this.createPackage(result);
        }
      }
    });
  }

  createPackage(packageData: Partial<CreditPackage>) {
    this.isLoading = true;
    
    const requiredFields: (keyof CreditPackage)[] = ['name', 'credits', 'price', 'description'];
    const missingFields = requiredFields.filter(field => !packageData[field]);
    
    if (missingFields.length > 0) {
      this.snackBar.open(
        `Missing required fields: ${missingFields.join(', ')}`, 
        'Close', 
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      this.isLoading = false;
      return;
    }

    const newPackage: Omit<CreditPackage, '_id'> = {
      name: packageData.name!,
      credits: packageData.credits!,
      price: packageData.price!,
      description: packageData.description!,
      isSubscription: packageData.isSubscription ?? false,
      durationDays: packageData.durationDays ?? 30,
      stripePriceId: packageData.stripePriceId ?? 'placeholder_stripe_id'
    };

    this.adminService.createCreditPackage(newPackage).subscribe({
      next: (createdPackage) => {
        this.dataSource.data = [...this.dataSource.data, createdPackage];
        this.snackBar.open('Credit package created successfully', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open(`Error creating credit package: ${error.message}`, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  updatePackage(packageData: CreditPackage) {
    if (!packageData._id) {
      this.snackBar.open('Unable to update: Credit package ID is missing', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.adminService.updateCreditPackage(packageData._id, packageData).subscribe({
      next: (updatedPackage) => {
        const index = this.dataSource.data.findIndex(p => p._id === updatedPackage._id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedPackage;
          this.dataSource.data = [...this.dataSource.data];           this.snackBar.open('Credit package updated successfully', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Error updating credit package:', error);
        this.snackBar.open('Error updating credit package. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deletePackage(creditPackage: CreditPackage) {
    if (!creditPackage._id) {
      this.snackBar.open('Unable to delete: Credit package ID is missing', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (confirm(`Are you sure you want to delete the package "${creditPackage.name}"?`)) {
      this.adminService.deleteCreditPackage(creditPackage._id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(p => p._id !== creditPackage._id);
          this.snackBar.open('Credit package deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting credit package:', error);
          this.snackBar.open(`Error deleting credit package: ${error.message}`, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
