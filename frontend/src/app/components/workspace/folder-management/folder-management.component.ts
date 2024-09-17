import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FolderDialogComponent } from '../../../dialogs/workspaces/folder-dialog.component';
import { ConfirmDialogComponent } from '../../../dialogs/workspaces/confirm-dialog.component';
import { FolderManagementService } from '../../../services/folder-management.service';
import { Folder } from '../../../interfaces/workspace.interface';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  _id: string;
}

@Component({
  selector: 'app-folder-management',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule],
  template: `
    <div class="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition duration-150 ease-in-out">
      <h3 class="text-xl font-semibold mb-4">Folders</h3>
      <button (click)="addFolder()" class="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out mb-4">
        Add Folder
      </button>
      @if (dataSource.data.length) {
        <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
          <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
            <button mat-icon-button disabled></button>
            <span class="font-medium">{{node.name}}</span>
            <div class="ml-auto">
              <button (click)="selectFolder(node)" class="text-cyan-500 hover:text-cyan-600 transition duration-150 ease-in-out mr-2">
                <mat-icon>folder_open</mat-icon>
              </button>
              <button (click)="editFolder(node)" class="text-cyan-500 hover:text-cyan-600 transition duration-150 ease-in-out mr-2">
                <mat-icon>edit</mat-icon>
              </button>
              <button (click)="deleteFolder(node)" class="text-red-500 hover:text-red-600 transition duration-150 ease-in-out">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-tree-node>

          <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
            <button mat-icon-button matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
              <mat-icon class="mat-icon-rtl-mirror">
                {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
              </mat-icon>
            </button>
            <span class="font-medium">{{node.name}}</span>
            <div class="ml-auto">
              <button (click)="selectFolder(node)" class="text-cyan-500 hover:text-cyan-600 transition duration-150 ease-in-out mr-2">
                <mat-icon>folder_open</mat-icon>
              </button>
              <button (click)="editFolder(node)" class="text-cyan-500 hover:text-cyan-600 transition duration-150 ease-in-out mr-2">
                <mat-icon>edit</mat-icon>
              </button>
              <button (click)="deleteFolder(node)" class="text-red-500 hover:text-red-600 transition duration-150 ease-in-out mr-2">
                <mat-icon>delete</mat-icon>
              </button>
              <button (click)="addSubfolder(node)" class="text-green-500 hover:text-green-600 transition duration-150 ease-in-out">
                <mat-icon>add</mat-icon>
              </button>
            </div>
          </mat-tree-node>
        </mat-tree>
      } @else {
        <p class="text-gray-500">No folders found. Click 'Add Folder' to create one.</p>
      }
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Inter', sans-serif;
    }
    .mat-tree {
      background: transparent;
    }
    .mat-tree-node {
      min-height: 48px;
      max-height: 48px;
    }
  `]
})
export class FolderManagementComponent {
  @Input() workspaceId!: string;
  @Output() folderSelected = new EventEmitter<string>();

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private folderManagementService = inject(FolderManagementService);

  folders = signal<Folder[]>([]);

  private _transformer = (node: Folder, level: number): FlatNode => ({
    expandable: !!node.subfolders && node.subfolders.length > 0,
    name: node.name,
    level: level,
    _id: node._id,
  });

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subfolders
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders() {
    this.folderManagementService.getFolders(this.workspaceId).subscribe({
      next: (folders) => {
        this.folders.set(folders);
        this.dataSource.data = folders;
        if (folders.length === 0) {
          this.showNotification('No folders found. You can create a new folder.', 'info');
        }
      },
      error: (error) => {
        console.error('Error loading folders:', error);
        this.showNotification('Error loading folders. Please try again.', 'error');
      }
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addFolder(parentNode?: FlatNode) {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.addFolder(this.workspaceId, result, parentNode?._id).subscribe({
          next: () => {
            this.showNotification('Folder created successfully', 'success');
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error creating folder:', error);
            this.showNotification('Error creating folder. Please try again.', 'error');
          }
        });
      }
    });
  }

  editFolder(node: FlatNode) {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '250px',
      data: { name: node.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.editFolder(this.workspaceId, node._id, result).subscribe({
          next: () => {
            this.showNotification('Folder updated successfully', 'success');
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error updating folder:', error);
            this.showNotification('Error updating folder. Please try again.', 'error');
          }
        });
      }
    });
  }

  deleteFolder(node: FlatNode) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Delete Folder', message: `Are you sure you want to delete "${node.name}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.deleteFolder(this.workspaceId, node._id).subscribe({
          next: () => {
            this.showNotification('Folder deleted successfully', 'success');
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error deleting folder:', error);
            this.showNotification('Error deleting folder. Please try again.', 'error');
          }
        });
      }
    });
  }

  addSubfolder(node: FlatNode) {
    this.addFolder(node);
  }

  selectFolder(node: FlatNode) {
    this.folderSelected.emit(node._id);
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info') {
    const colorClass = type === 'success' ? 'bg-green-500' :
                       type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: [colorClass, 'text-white', 'font-medium']
    });
  }
}