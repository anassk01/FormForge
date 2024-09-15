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
<div class="workspace-list-container">
  <h2 class="workspace-list-title">Your Workspaces</h2>

  <ul class="workspace-list">
    <!-- Iterating over workspaces -->
    @for (workspace of workspaces; track workspace._id) {
      <li class="workspace-list-item">
        <div class="workspace-info">
          <h3 class="workspace-name">{{ workspace.name }}</h3>
          <p class="workspace-description">{{ workspace.description }}</p>
          <p class="workspace-created">Created: {{ workspace.createdAt | date }}</p>
        </div>
        <div class="workspace-actions">
          <button class="view-button" [routerLink]="['/workspaces', workspace._id]">
            <i class="material-icons">visibility</i>
          </button>
        </div>
      </li>
    } @empty {
      <li class="no-workspaces">No workspaces found.</li>
    }
  </ul>

  <mat-paginator
    class="workspace-paginator"
    [length]="totalWorkspaces"
    [pageSize]="pageSize"
    [pageSizeOptions]="[5, 10, 25]"
    (page)="onPageChange($event)"
    aria-label="Select page">
  </mat-paginator>

  <button class="create-button" mat-raised-button color="primary" routerLink="/workspaces/create">
    Create New Workspace
  </button>
</div>


  `,
  styles: [`
.workspace-list-container {
  max-width: 100%;
  padding: 16px;
}

.workspace-list-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.workspace-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.workspace-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.workspace-list-item:hover {
  background-color: #f9f9f9;
}

.workspace-info {
  flex-grow: 1;
  margin-right: 16px;
}

.workspace-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.workspace-description {
  color: #666;
  margin: 4px 0 0;
  font-size: 14px;
}

.workspace-created {
  margin: 4px 0 0;
  font-size: 12px;
  color: #999;
}

.view-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #007bff;
  font-size: 24px;
}

.no-workspaces {
  text-align: center;
  font-size: 16px;
  padding: 16px;
  color: #999;
}

.workspace-paginator {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
}

.paginator-info {
  margin-right: 16px;
}

.paginator-prev,
.paginator-next {
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 14px;
  margin-left: 8px;
}

.paginator-prev:disabled,
.paginator-next:disabled {
  color: #999;
  cursor: default;
}

.create-button {
  margin-top: 24px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
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