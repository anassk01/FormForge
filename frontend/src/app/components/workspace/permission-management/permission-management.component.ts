//frontend/src/app/components/workspace/permission-management/permission-management.component.ts
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceService } from '../../../services/workspace.service';
import { WorkspaceMember } from '../../../interfaces/workspace.interface';

@Component({
    selector: 'app-permission-management',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <h3>Manage Permissions</h3>
    <ul>
      @for (member of members; track member.user) {
        <li>
          {{ member.user }}
          <select [(ngModel)]="member.role" (change)="updatePermissions(member)">
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <label><input type="checkbox" [(ngModel)]="member.permissions.read" (change)="updatePermissions(member)"> Read</label>
          <label><input type="checkbox" [(ngModel)]="member.permissions.write" (change)="updatePermissions(member)"> Write</label>
          <label><input type="checkbox" [(ngModel)]="member.permissions.delete" (change)="updatePermissions(member)"> Delete</label>
          <label><input type="checkbox" [(ngModel)]="member.permissions.manageUsers" (change)="updatePermissions(member)"> Manage Users</label>
        </li>
      }
    </ul>
  `
})
export class PermissionManagementComponent {
  @Input() members: WorkspaceMember[] = [];
  @Input() workspaceId: string = '';
  @Output() permissionsUpdated = new EventEmitter<void>();

  constructor(private workspaceService: WorkspaceService) {}

  updatePermissions(member: WorkspaceMember) {
    this.workspaceService.updateMemberPermissions(this.workspaceId, member.user, member.role, member.permissions)
      .subscribe({
        next: () => {
          this.permissionsUpdated.emit();
        },
        error: (error) => console.error('Error updating permissions:', error)
      });
  }
}