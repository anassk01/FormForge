//backend/src/models/workspace.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';


export interface IForm {
  _id: mongoose.Types.ObjectId;
  name: string;
  structure: any;
  values?: Record<string, any>;
  submissions?: {
    _id: mongoose.Types.ObjectId;
    values: any;
    submissionDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  isTemplate: boolean;
  parentTemplateId?: mongoose.Types.ObjectId;
}



export interface IFolder {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  forms: IForm[];
  subfolders: IFolder[];
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


const FormSchema: Schema = new Schema({
  name: { type: String, required: true },
  structure: { type: Schema.Types.Mixed, required: true, default: {} },
  isTemplate: { type: Boolean, default: false },
  parentTemplateId: { type: Schema.Types.ObjectId, ref: 'Form' },
  values: { type: Schema.Types.Mixed },
  submissions: [{
    values: { type: Schema.Types.Mixed },
    submissionDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  forms: [FormSchema], // Array of forms
  subfolders: [{ type: Schema.Types.Mixed }], // Array of subfolders
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