

import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface ITimeManagementData {
  type: 'STOPWATCH' | 'TIMER';
  data: {
    laps?: { lapNumber: number; lapTime: number; cumulativeTime: number }[];
    completedSessions?: { sessionNumber: number; phase: string; duration: number }[];
    completed: boolean;
    totalDuration: number;
    currentPhase?: string;
    currentSession?: number;
  };
}

export interface IFormSubmission {
  _id: mongoose.Types.ObjectId;
  values: Record<string, any | ITimeManagementData>;
  submissionDate: Date;
}

export interface IForm {
  _id: mongoose.Types.ObjectId;
  name: string;
  structure: any; // Make sure this is not optional
  isTemplate: boolean;
  parentTemplateId?: mongoose.Types.ObjectId;
  values?: Record<string, any>;
  state: 'template' | 'new_instance' | 'submitted_instance';
  submissions?: IFormSubmission[];
  createdAt: Date;
  updatedAt: Date;
}


export interface IFolder {
  _id: mongoose.Types.ObjectId;
  name: string;
  forms: IForm[];
  subfolders: IFolder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkspaceMember {
  user: IUser['_id'];
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manageUsers: boolean;
  };
}

export interface IWorkspace extends Document {
  name: string;
  description: string;
  owner: IUser['_id'];
  members: IWorkspaceMember[];
  folders: IFolder[];
  createdAt: Date;
  updatedAt: Date;
}

const FormSubmissionSchema: Schema = new Schema({
  values: { type: Schema.Types.Mixed, required: true },
  submissionDate: { type: Date, default: Date.now }
});

const FormSchema: Schema = new Schema({
  name: { type: String, required: true },
  structure: { type: Schema.Types.Mixed, required: true },
  isTemplate: { type: Boolean, default: false },
  parentTemplateId: { type: Schema.Types.ObjectId, ref: 'Form' },
  values: { type: Schema.Types.Mixed },
  state: { type: String, enum: ['template', 'new_instance', 'submitted_instance'], required: true },
  submissions: [FormSubmissionSchema]
}, { timestamps: true });


const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  forms: [FormSchema],
  subfolders: [{ type: Schema.Types.Mixed }]
}, { timestamps: true });

const WorkspaceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['owner', 'admin', 'editor', 'viewer'], default: 'viewer' },
    permissions: {
      read: { type: Boolean, default: true },
      write: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      manageUsers: { type: Boolean, default: false }
    }
  }],
  folders: [FolderSchema]
}, { timestamps: true });

export const Workspace = mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);

