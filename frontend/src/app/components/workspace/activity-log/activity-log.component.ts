import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { WorkspaceService } from '../../../services/workspace.service';
import { ActivityLog, ActivityLogsResponse } from '../../../interfaces/activity-log.interface';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivityLogDetailComponent } from '../activity-log-detail/activity-log-detail.component';
import { throttleTime, tap } from 'rxjs/operators';
import {MatPaginatorModule , PageEvent} from '@angular/material/paginator';




@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    ScrollingModule
  ],

  template: `
    <h3>Activity Log</h3>
    
    <!-- Filter controls -->
    <div class="filters">
      <mat-form-field>
        <mat-label>Action Type</mat-label>
        <mat-select [(ngModel)]="actionTypeFilter" (selectionChange)="applyFilters()">
          <mat-option value="">All</mat-option>
          <mat-option value="create">Create</mat-option>
          <mat-option value="update">Update</mat-option>
          <mat-option value="delete">Delete</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Date Range</mat-label>
        <mat-date-range-input [rangePicker]="picker">
          <input matStartDate placeholder="Start date" [(ngModel)]="startDate" (dateChange)="applyFilters()">
          <input matEndDate placeholder="End date" [(ngModel)]="endDate" (dateChange)="applyFilters()">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
    </div>

    <button mat-raised-button color="primary" (click)="exportLogs()">Export Logs</button>
    
    <cdk-virtual-scroll-viewport itemSize="50" class="virtual-scroll-viewport">
      <mat-list>
        @for (log of activityLogs; track log._id) {
          <mat-list-item (click)="openLogDetail(log)">
            <span matListItemTitle>{{ log.action }}</span>
            <span matListItemLine>{{ log.details }}</span>
            <span matListItemLine>By {{ log.user.name }} on {{ log.createdAt | date:'medium' }}</span>
          </mat-list-item>
        }
      </mat-list>
    </cdk-virtual-scroll-viewport>

    <mat-list>
      @for (log of activityLogs; track log._id) {
        <mat-list-item (click)="openLogDetail(log)">
          <span matListItemTitle>{{ log.action }}</span>
          <span matListItemLine>{{ log.details }}</span>
          <span matListItemLine>By {{ log.user.name }} on {{ log.createdAt | date:'medium' }}</span>
        </mat-list-item>
      } @empty {
        <mat-list-item>No activity logs found.</mat-list-item>
      }
    </mat-list>

    <mat-paginator
      [length]="totalLogs"
      [pageSize]="pageSize"
      [pageSizeOptions]="[5, 10, 25]"
      (page)="onPageChange($event)"
      aria-label="Select page of activity logs">
    </mat-paginator>
  `,
  styles: [`
    :host {
      display: block;
      margin-top: 20px;
    }
    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    button {
      margin-bottom: 16px;
    }
  `]
})
export class ActivityLogComponent implements OnInit, OnDestroy {
  @Input() workspaceId!: string;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  activityLogs: ActivityLog[] = [];
  private activityLogsSubject = new BehaviorSubject<ActivityLog[]>([]);
  private subscription: Subscription | null = null;

  totalLogs: number = 0;
  pageSize: number = 10;
  private currentPage = 1;
  private loading = false;

  // New filter properties
  actionTypeFilter: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(
    private workspaceService: WorkspaceService ,     
    private dialog: MatDialog)
   {}

  ngOnInit() {
    this.loadActivityLogs();
    this.subscribeToRealtimeUpdates();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private loadInitialLogs() {
    this.loadLogs();
  }


  private setupVirtualScrolling() {
    this.subscription = this.viewport.scrolledIndexChange.pipe(
      throttleTime(200),
      tap((index) => {
        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();
        if (end === total && !this.loading) {
          this.loadMoreLogs();
        }
      })
    ).subscribe();
  }

  private loadLogs() {
    this.loading = true;
    this.workspaceService.getActivityLogs(
      this.workspaceId,
      this.currentPage,
      this.pageSize,
      this.actionTypeFilter,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (response) => {
        this.activityLogs = [...this.activityLogs, ...response.activityLogs];
        this.activityLogsSubject.next(this.activityLogs);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading activity logs:', error);
        this.loading = false;
      }
    });
  }

  private loadMoreLogs() {
    this.currentPage++;
    this.loadLogs();
  }



  loadActivityLogs() {
    this.workspaceService.getActivityLogs(
      this.workspaceId, 
      this.currentPage, 
      this.pageSize,
      this.actionTypeFilter,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (response: ActivityLogsResponse) => {
        this.activityLogs = response.activityLogs;
        this.totalLogs = response.totalLogs;
      },
      error: (error) => console.error('Error loading activity logs:', error)
    });
  }

  private subscribeToRealtimeUpdates() {
    this.subscription = this.workspaceService.getRealtimeActivityLogs(this.workspaceId)
      .subscribe({
        next: (logs) => {
          this.activityLogs = logs;
          this.totalLogs = this.totalLogs + 1; // Increment total logs count
        },
        error: (error) => console.error('Error in real-time activity logs:', error)
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadActivityLogs();
  }


  applyFilters() {
    this.currentPage = 1;
    this.activityLogs = [];
    this.loadLogs();
  }

  openLogDetail(log: ActivityLog) {
    this.dialog.open(ActivityLogDetailComponent, {
      width: '400px',
      data: { log }
    });
  }


  exportLogs() {
    this.workspaceService.exportActivityLogs(
      this.workspaceId,
      this.actionTypeFilter,
      this.startDate,
      this.endDate
    ).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `activity_logs_${this.workspaceId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}