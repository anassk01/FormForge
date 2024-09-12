// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { AuthenticatedRequest } from '../types';
const JWT_SECRET = process.env.JWT_SECRET ;

export interface AuthRequest extends Request {
  user?: IUser;
  cache?: any;
  credentials?: any;
  destination?: any;
  integrity?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Check if the route requires admin access
      const requiresAdmin = req.baseUrl.includes('/admin');
      if (requiresAdmin && user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }

      (req as any).user = user;
      next();
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token expired', refreshRequired: true });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export const refreshTokenMiddleware = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const newToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

    res.json({ token: newToken, refreshToken: newRefreshToken, user });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};


export type AuthMiddleware = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;