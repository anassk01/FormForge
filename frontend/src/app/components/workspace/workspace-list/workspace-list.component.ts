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
    <div class="workspace-list-container bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
      <h2 class="workspace-list-title text-xl sm:text-2xl font-bold mb-4 text-teal-800">Your Workspaces</h2>
      <ul class="workspace-list" role="list" aria-label="List of workspaces">
        @for (workspace of workspaces; track workspace._id) {
          <li class="workspace-list-item flex justify-between items-center py-3 px-4 border-b border-gray-200 transition-colors duration-200 hover:bg-teal-50" role="listitem">
            <div class="workspace-info flex-grow mr-4">
              <h3 class="workspace-name text-lg font-bold truncate text-teal-800">{{ workspace.name }}</h3>
              <p class="workspace-description text-sm text-gray-600 mt-1">{{ workspace.description }}</p>
              <p class="workspace-created text-xs text-gray-500 mt-1">Created: {{ workspace.createdAt | date }}</p>
            </div>
            <div class="workspace-actions">
              <button class="btn-secondary" [routerLink]="['/workspaces', workspace._id]" aria-label="View workspace details">
                <span class="sr-only">View</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </li>
        } @empty {
          <li class="no-workspaces text-center text-lg p-4 text-gray-500" role="listitem">No workspaces found.</li>
        }
      </ul>
      <mat-paginator
        class="workspace-paginator mt-4"
        [length]="totalWorkspaces"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25]"
        (page)="onPageChange($event)"
        aria-label="Select page">
      </mat-paginator>
      <button class="btn-primary mt-6" routerLink="/workspaces/create">
        Create New Workspace
      </button>
    </div>
  `,
  styleUrls: ['./workspace-list.component.scss']
  
})
export class WorkspaceListComponent implements OnInit {
  workspaces: Workspace[] = [];
  totalWorkspaces: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  error: string | null = null;

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    this.loadWorkspaces();
  }

  loadWorkspaces(): void {
    this.error = null;
    this.workspaceService.getWorkspaces(this.currentPage, this.pageSize).subscribe({
      next: (response: WorkspacesResponse) => {
        this.workspaces = response.workspaces;
        this.totalWorkspaces = response.totalWorkspaces;
      },
      error: (error) => {
        console.error('Error loading workspaces', error);
        this.error = 'Failed to load workspaces. Please try again later.';
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadWorkspaces();
  }
}