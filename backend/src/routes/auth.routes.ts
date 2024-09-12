import express, { Request, Response, NextFunction } from 'express';
import * as authController from '../controllers/auth.controller';
import { loginLimiter, passwordResetLimiter } from '../middleware/rateLimiter';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// Helper function to wrap async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes
router.post('/register', asyncHandler(authController.register));
router.post('/login', loginLimiter, asyncHandler(authController.login));
router.post('/login-2fa', loginLimiter, asyncHandler(authController.login2FA));
router.post('/logout', authController.logout);
router.post('/request-password-reset', passwordResetLimiter, asyncHandler(authController.requestPasswordReset));
router.post('/reset-password', asyncHandler(authController.resetPassword));
router.post('/resend-verification-email', asyncHandler(authController.resendVerificationEmail));
router.get('/verify-email/:token', asyncHandler(authController.verifyEmail));

// Add this new route for refresh token
router.post('/refresh-token', asyncHandler(authController.refreshToken));

// Semi-protected route (requires a token but doesn't throw an error if not present)
router.post('/refresh-token', (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as AuthRequest, res, (err?: any) => {
    if (err) {
      // If there's an error (no token), just continue to the controller
      return next();
    }
    next();
  });
}, asyncHandler(authController.refreshToken));

// Protected routes (require authentication)
router.use(authMiddleware);

// Helper function to convert AuthRequest to Request for protected routes
const authRequestHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  fn(req as AuthRequest, res, next).catch(next);
};

router.post('/enable-2fa', authRequestHandler(authController.enable2FA));
router.post('/verify-2fa', authRequestHandler(authController.verify2FA));
router.post('/disable-2fa', authRequestHandler(authController.disable2FA));
router.post('/change-password', authRequestHandler(authController.changePassword));
router.get('/2fa-status', authRequestHandler(authController.getTwoFAStatus));
router.get('/email-verification-status/:userId', authMiddleware, authController.getEmailVerificationStatus);
export default router;