import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivityLog } from '../../../interfaces/activity-log.interface';

@Component({
  selector: 'app-activity-log-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Activity Log Detail</h2>
    <mat-dialog-content>
      <p><strong>Action:</strong> {{ data.log.action }}</p>
      <p><strong>Details:</strong> {{ data.log.details }}</p>
      <p><strong>User:</strong> {{ data.log.user.name }} ({{ data.log.user.email }})</p>
      <p><strong>Date:</strong> {{ data.log.createdAt | date:'medium' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px;
    }
  `]
})
export class ActivityLogDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<ActivityLogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { log: ActivityLog }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}