import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { IWorkspace } from './workspace.model';

export interface IActivityLog extends Document {
  workspace: IWorkspace['_id'];
  user: IUser['_id'];
  action: string;
  details: string;
  createdAt: Date;
}

const ActivityLogSchema: Schema = new Schema({
  workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);