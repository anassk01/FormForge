// src/routes/user.routes.ts

import express, { Request, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// Protect all user routes
router.use(authMiddleware);

// Helper function to wrap async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/me', asyncHandler((req: AuthRequest, res: Response) => userController.getCurrentUser(req, res)));
router.put('/me', asyncHandler((req: AuthRequest, res: Response) => userController.updateUser(req, res)));
router.get('/me/credit-history', asyncHandler((req: AuthRequest, res: Response) => userController.getUserCreditHistory(req, res)));

export default router;