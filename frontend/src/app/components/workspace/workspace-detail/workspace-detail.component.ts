//src/app/components/workspace/workspace-detail/workspace-detail.component.ts
import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { WorkspaceService } from '../../../services/workspace.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { ConfirmDialogComponent } from '../../../dialogs/workspaces/confirm-dialog.component';
import { PermissionManagementComponent } from '../permission-management/permission-management.component';
import { AuthService } from '../../../services/auth.service';
import { ActivityLogComponent } from '../activity-log/activity-log.component';
import { FolderManagementComponent } from '../folder-management/folder-management.component';
import { FormManagementComponent } from '../form-management/form-management.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { FormManagementService } from '../../../services/form-management.service';
import { Workspace, Form, FormTemplate, FormInstance } from '../../../interfaces/workspace.interface';
@Component({
  selector: 'app-workspace-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    PermissionManagementComponent,
    ActivityLogComponent,
    FolderManagementComponent,
    FormManagementComponent,
    FormGeneratorComponent
  ],
  templateUrl: './workspace-detail.component.html',
})
export class WorkspaceDetailComponent implements OnInit, OnDestroy {
  workspace = signal<Workspace | null>(null);
  loading = signal(true);
  workspaceForm: FormGroup;
  canManageUsers = signal(false);
  activeUsers: string[] = [];
  selectedFolderId = signal<string | null>(null);
  selectedForm = signal<any | null>(null);
  
  private workspaceUpdateSubscription: Subscription | null = null;
  private activeUsersSubscription: Subscription | null = null;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private workspaceService = inject(WorkspaceService);
  private webSocketService = inject(WebSocketService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private formManagementService = inject(FormManagementService);
  
  templates = signal<FormTemplate[]>([]);
  instances = signal<FormInstance[]>([]);
  constructor() {
    this.workspaceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['']
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadWorkspace(id);
      this.webSocketService.joinWorkspace(id);
      this.subscribeToWorkspaceUpdates(id);
      this.subscribeToActiveUsers();
      this.checkUserPermissions();
    } else {
      this.loading.set(false);
    }
  }
  ngOnDestroy(): void {
    const currentWorkspace = this.workspace();
    if (currentWorkspace) {
      this.webSocketService.leaveWorkspace(currentWorkspace._id);
    }
    this.workspaceUpdateSubscription?.unsubscribe();
    this.activeUsersSubscription?.unsubscribe();
  }
  loadWorkspace(id: string): void {
    this.workspaceService.getWorkspaces().subscribe({
      next: (response) => {
        const workspace = response.workspaces.find(w => w._id === id);
        if (workspace) {
          this.workspace.set(workspace);
          this.workspaceForm.patchValue({
            name: workspace.name,
            description: workspace.description
          });
        } else {
          this.snackBar.open('Workspace not found', 'Close', { duration: 5000 });
        }
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error loading workspace', error);
        this.snackBar.open('Error loading workspace. Please try again.', 'Close', { duration: 5000 });
        this.loading.set(false);
      }
    });
  }
  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const currentWorkspace = this.workspace();
      if (currentWorkspace?._id) {
        const { name, description } = this.workspaceForm.value;
        this.workspaceService.updateWorkspace(currentWorkspace._id, name, description).subscribe({
          next: () => {
            this.snackBar.open('Workspace updated successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating workspace', error);
            this.snackBar.open('Error updating workspace. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    }
  }
  onDelete(): void {
    const currentWorkspace = this.workspace();
    if (currentWorkspace?._id) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Delete Workspace',
          message: `Are you sure you want to delete the workspace "${currentWorkspace.name}"?`
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.workspaceService.deleteWorkspace(currentWorkspace._id).subscribe({
            next: () => {
              this.snackBar.open('Workspace deleted successfully', 'Close', { duration: 3000 });
              this.router.navigate(['/workspaces']);
            },
            error: (error) => {
              console.error('Error deleting workspace', error);
              this.snackBar.open('Error deleting workspace. Please try again.', 'Close', { duration: 5000 });
            }
          });
        }
      });
    }
  }
  private checkUserPermissions() {
    const currentUser = this.authService.currentUserValue;
    const currentWorkspace = this.workspace();
    if (currentWorkspace && currentUser) {
      const currentMember = currentWorkspace.members.find(m => m.user === currentUser.id);
      this.canManageUsers.set(currentMember?.role === 'owner' || currentMember?.role === 'admin' || !!currentMember?.permissions?.manageUsers);
    }
  }
  onPermissionsUpdated() {
    const currentWorkspace = this.workspace();
    if (currentWorkspace?._id) {
      this.loadWorkspace(currentWorkspace._id);
    }
  }
  private subscribeToWorkspaceUpdates(workspaceId: string): void {
    this.workspaceUpdateSubscription = this.webSocketService.getWorkspaceUpdates().subscribe(
      update => {
        if (update && update.workspace._id === workspaceId) {
          this.workspace.set(update.workspace);
          this.workspaceForm.patchValue({
            name: update.workspace.name,
            description: update.workspace.description
          });
        }
      }
    );
  }
  private subscribeToActiveUsers(): void {
    this.activeUsersSubscription = this.webSocketService.getActiveUsers().subscribe(
      (users: string[]) => {
        this.activeUsers = users;
      }
    );
  }
  onFolderSelected(folderId: string): void {
    this.selectedFolderId.set(folderId);
    this.selectedForm.set(null);
    this.loadFormsInFolder(folderId);
  }
  onFormSaved(event: { formData: any, structure: any }): void {
    const workspaceId = this.workspace()?._id;
    const folderId = this.selectedFolderId();
    const selectedForm = this.selectedForm();
    
    if (!workspaceId || !folderId || !selectedForm) {
      this.snackBar.open('Unable to save form: Workspace, folder, or form not selected', 'Close', { duration: 3000 });
      return;
    }
    this.formManagementService.saveForm(workspaceId, folderId, selectedForm._id, event).subscribe({
      next: (savedForm) => {
        console.log('Form saved successfully:', savedForm);
        this.snackBar.open('Form saved successfully!', 'Close', { duration: 3000 });
        this.loadFormsInFolder(folderId);
      },
      error: (error) => {
        console.error('Error saving form:', error);
        this.snackBar.open('Error saving form. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  onFormSubmitted(event: { formData: any, structure: any }): void {
    const workspaceId = this.workspace()?._id;
    const folderId = this.selectedFolderId();
    const selectedForm = this.selectedForm();
    
    if (!workspaceId || !folderId || !selectedForm) {
      this.snackBar.open('Unable to submit form: Workspace, folder, or form not selected', 'Close', { duration: 3000 });
      return;
    }
    this.formManagementService.submitForm(workspaceId, folderId, selectedForm._id, event.formData).subscribe({
      next: (submission) => {
        console.log('Form submitted successfully:', submission);
        this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
        this.loadFormsInFolder(folderId);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.snackBar.open('Error submitting form. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  onFormSelected(form: Form): void {
    this.selectedForm.set(form);
  }
  loadFormsInFolder(folderId: string): void {
    const workspaceId = this.workspace()?._id;
    if (workspaceId) {
      this.formManagementService.getFormsInFolder(workspaceId, folderId).subscribe({
        next: ({templates, instances}) => {
          this.templates.set(templates as FormTemplate[]);
          this.instances.set(instances as FormInstance[]);
        },
        error: (error) => {
          console.error('Error loading forms:', error);
          this.snackBar.open('Error loading forms. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
  
}

