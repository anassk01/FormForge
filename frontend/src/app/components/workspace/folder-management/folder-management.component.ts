import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
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
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <h3>Folders</h3>
    <button mat-raised-button color="primary" (click)="addFolder()">Add Folder</button>
    @if (dataSource.data.length) {
        <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
              <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
        <button mat-icon-button disabled></button>
        {{node.name}}
        <button mat-icon-button (click)="selectFolder(node)"><mat-icon>folder_open</mat-icon></button>
        <button mat-icon-button (click)="editFolder(node)"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button (click)="deleteFolder(node)"><mat-icon>delete</mat-icon></button>
      </mat-tree-node>

      <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
        <button mat-icon-button matTreeNodeToggle
                [attr.aria-label]="'Toggle ' + node.name">
          <mat-icon class="mat-icon-rtl-mirror">
            {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
          </mat-icon>
        </button>
        {{node.name}}
        <button mat-icon-button (click)="selectFolder(node)"><mat-icon>folder_open</mat-icon></button>
        <button mat-icon-button (click)="editFolder(node)"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button (click)="deleteFolder(node)"><mat-icon>delete</mat-icon></button>
        <button mat-icon-button (click)="addSubfolder(node)"><mat-icon>add</mat-icon></button>
      </mat-tree-node>
    </mat-tree>    } @else {
      <p>No folders found. Click 'Add Folder' to create one.</p>
    }
  `
})
export class FolderManagementComponent {
  @Input() workspaceId!: string;
  @Output() folderSelected = new EventEmitter<string>();

  private _transformer = (node: Folder, level: number): FlatNode => {
    return {
      expandable: !!node.subfolders && node.subfolders.length > 0,
      name: node.name,
      level: level,
      _id: node._id,
    };
  };

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

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private folderManagementService = inject(FolderManagementService);

  ngOnInit() {
    this.loadFolders();
  }
  loadFolders() {
    this.folderManagementService.getFolders(this.workspaceId).subscribe({
      next: (folders) => {
        this.dataSource.data = folders;
        if (folders.length === 0) {
          this.snackBar.open('No folders found. You can create a new folder.', 'Close', { duration: 5000 });
        }
      },
      error: (error) => {
        console.error('Error loading folders:', error);
        this.snackBar.open('Error loading folders. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addFolder(parentNode?: FlatNode): void {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.addFolder(this.workspaceId, result, parentNode?._id).subscribe({
          next: () => {
            this.snackBar.open('Folder created successfully', 'Close', { duration: 3000 });
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error creating folder:', error);
            this.snackBar.open('Error creating folder. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  editFolder(node: FlatNode): void {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '250px',
      data: { name: node.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.editFolder(this.workspaceId, node._id, result).subscribe({
          next: () => {
            this.snackBar.open('Folder updated successfully', 'Close', { duration: 3000 });
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error updating folder:', error);
            this.snackBar.open('Error updating folder. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  deleteFolder(node: FlatNode): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Delete Folder', message: `Are you sure you want to delete "${node.name}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.deleteFolder(this.workspaceId, node._id).subscribe({
          next: () => {
            this.snackBar.open('Folder deleted successfully', 'Close', { duration: 3000 });
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error deleting folder:', error);
            this.snackBar.open('Error deleting folder. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  addSubfolder(node: FlatNode): void {
    this.addFolder(node);
  }

  selectFolder(node: FlatNode): void {
    this.folderSelected.emit(node._id);
  }
}