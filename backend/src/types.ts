import { Request } from 'express';
import { IUser } from '../src/models/user.model';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}