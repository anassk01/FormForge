// src/app/interfaces/workspace.interface.ts
export interface Workspace {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: WorkspaceMember[];
  folders: Folder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  user: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manageUsers: boolean;
  };
}

export interface WorkspacesResponse {
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;
  totalWorkspaces: number;
}

export interface Folder {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  forms: string[]; // IDs of both templates and instances
  subfolders: Folder[];
}

export interface Form {
  _id: string;
  name: string;
  structure: any;
  isTemplate: boolean;
  parentTemplateId?: string;
  values?: Record<string, any>;
  submissions?: FormSubmission[];
  createdAt: Date;
  updatedAt: Date;
  state: 'template' | 'new_instance' | 'submitted_instance';
}


export interface FormTemplate extends Form {
  isTemplate: true;
  state: 'template';
}

export interface FormInstance extends Form {
  isTemplate: false;
  parentTemplateId: string;
  values: Record<string, any>;
  submissionDate: Date;
  state: 'new_instance' | 'submitted_instance';
}


export interface FormSubmission {
  _id: string;
  formId: string;
  values: any;
  submissionDate: Date;
}

export interface FormUpdate {
  action: 'create' | 'update' | 'delete';
  form?: Form;
  formId?: string;
}

export interface SavedForm extends Form {
  workspaceId: string;
  folderId: string;
}

export type AnyForm = FormTemplate | FormInstance;