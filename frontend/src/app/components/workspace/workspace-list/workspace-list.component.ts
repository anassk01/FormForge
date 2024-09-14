import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../services/workspace.service';
import { Workspace, WorkspacesResponse } from '../../../interfaces/workspace.interface';

@Component({
  selector: 'app-workspace-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  template: `
    <h2>Your Workspaces</h2>
    <mat-list>
      @for (workspace of workspaces; track workspace._id) {
        <mat-list-item>
          <span matListItemTitle>{{ workspace.name }}</span>
          <span matListItemLine>{{ workspace.description }}</span>
          <span matListItemLine>Created: {{ workspace.createdAt | date }}</span>
          <button class="view" mat-icon-button [routerLink]="['/workspaces', workspace._id]">
            <mat-icon>visibility</mat-icon>
          </button>
        </mat-list-item>
      } @empty {
        <mat-list-item>No workspaces found.</mat-list-item>
      }
    </mat-list>
    <mat-paginator
      [length]="totalWorkspaces"
      [pageSize]="pageSize"
      [pageSizeOptions]="[5, 10, 25]"
      (page)="onPageChange($event)"
      aria-label="Select page">
    </mat-paginator>
    <button mat-raised-button color="primary" routerLink="/workspaces/create">Create New Workspace</button>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
    button.view {
      position: absolute;
      bottom: 50px;
      right: 16px;

    }
    mat-list-item {
      margin-bottom: 16px;
    }
  `]
})
export class WorkspaceListComponent implements OnInit {
  workspaces: Workspace[] = [];
  totalWorkspaces: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    this.loadWorkspaces();
  }

  loadWorkspaces(): void {
    this.workspaceService.getWorkspaces(this.currentPage, this.pageSize).subscribe({
      next: (response: WorkspacesResponse) => {
        this.workspaces = response.workspaces;
        this.totalWorkspaces = response.totalWorkspaces;
      },
      error: (error) => console.error('Error loading workspaces', error)
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadWorkspaces();
  }
}