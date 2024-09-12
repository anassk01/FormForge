import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';

interface AuthRequest extends Request {
  user?: IUser;
}

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as AuthRequest).user;
    console.log('Admin Middleware - User:', user);
    console.log('Admin Middleware - User Role:', user?.role);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    console.log('Admin Middleware - Access granted');
    next();
  } catch (error) {
    console.error('Error in admin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};