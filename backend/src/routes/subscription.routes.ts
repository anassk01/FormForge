import express, { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as subscriptionController from '../controllers/subscription.controller';

const router = express.Router();

router.use(authMiddleware);

// Helper function to wrap async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/current', asyncHandler(subscriptionController.getCurrentSubscription));
router.post('/subscribe', asyncHandler(subscriptionController.subscribe));
router.post('/cancel', asyncHandler(subscriptionController.cancelSubscription));
router.post('/upgrade', asyncHandler(subscriptionController.upgradeSubscription));
router.post('/downgrade', asyncHandler(subscriptionController.downgradeSubscription));

export default router;