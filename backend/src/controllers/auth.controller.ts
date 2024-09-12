//auth.contoller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import crypto from 'crypto';
import { EmailService } from '../services/email.service';
import speakeasy from 'speakeasy';
import { isStrongPassword } from '../utils/passwordUtils';
import { AuthRequest } from '../middleware/auth.middleware';
import { logAuthEvent } from '../services/auth-logger.service';
import QRCode from 'qrcode';
import { sign, verify } from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password does not meet strength requirements' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    const verificationToken = newUser.generateVerificationToken();
    await newUser.save();

    const verificationURL = `${FRONTEND_URL}/verify-email/${verificationToken}?email=${email}`;

    try {
      await EmailService.sendVerificationEmail(newUser.email, verificationURL);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    logAuthEvent('user_registered', newUser._id.toString());
    res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    logAuthEvent('registration_error', 'unknown', { error: (error as Error).message });
    res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log(`Invalid password for user: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isLockedOut && user.isLockedOut()) {
      console.log(`Account locked for user: ${email}`);
      return res.status(423).json({ message: 'Account is locked. Please try again later.' });
    }

    if (!user.isEmailVerified && user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Email not verified. Please verify your email to login.',
        requiresVerification: true
      });
    }

    if (user.isTwoFactorEnabled) {
      return res.json({ requires2FA: true, userId: user._id });
    }

    await user.resetFailedLoginAttempts();

    const token = generateToken(user, rememberMe);
    const refreshToken = generateRefreshToken(user);
    logAuthEvent('successful_login', user._id.toString(), { rememberMe, role: user.role });

    user.lastLogin = new Date();
    await user.save();

    console.log('User logged in:', user);
    console.log('User role:', user.role);
    
    res.json({ 
      token, 
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    logAuthEvent('login_error', 'unknown', { error: (error as Error).message });
    res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
  }
};



export const login2FA = async (req: Request, res: Response) => {
  try {
    const { email, password, token } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isTwoFactorEnabled) {
      return res.status(400).json({ message: '2FA is not enabled for this user' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret!,
      encoding: 'base32',
      token: token
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid 2FA token' });
    }

    const jwtToken = generateToken(user, false);

    user.lastLogin = new Date();
    await user.save();

    res.json({ token: jwtToken, user: getUserResponseData(user) });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
};

export const enable2FA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const secret = speakeasy.generateSecret({ length: 32 });
  req.user.twoFactorSecret = secret.base32;
  await req.user.save();

  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: req.user.email,
    issuer: process.env.TOTP_ISSUER || 'YourAppName'
  });

  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

  res.json({
    secret: secret.base32,
    qrCodeDataUrl
  });
};

export const verify2FA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { token } = req.body;
  const user = req.user;

  if (!user.twoFactorSecret) {
    res.status(400).json({ message: '2FA is not set up for this user' });
    return;
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token: token,
    window: 1
  });

  if (verified) {
    user.isTwoFactorEnabled = true;
    await user.save();
    res.json({ verified: true, message: '2FA enabled successfully' });
  } else {
    res.status(400).json({ verified: false, message: 'Invalid token' });
  }
};

export const disable2FA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const user = req.user;

  if (!user.isTwoFactorEnabled) {
    res.status(400).json({ message: '2FA is not enabled for this user' });
    return;
  }

  user.twoFactorSecret = undefined;
  user.isTwoFactorEnabled = false;
  await user.save();
  res.json({ disabled: true, message: '2FA disabled successfully' });
};

export const getTwoFAStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }
  res.json({ enabled: req.user.isTwoFactorEnabled });
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetURL = `${FRONTEND_URL}/reset-password/${resetToken}`;
    await EmailService.sendPasswordResetEmail(user.email, resetURL);

    res.status(200).json({ message: 'If a user with this email exists, a password reset link has been sent.' });
  } catch (error) {
    console.error('Error in password reset request:', error);
    res.status(500).json({ message: 'Error in password reset request', error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: 'Password does not meet strength requirements' });
    }

    if (user.isPasswordInHistory(newPassword)) {
      return res.status(400).json({ message: 'Password has been used recently. Please choose a different password.' });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password', error });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return;
  }
  if (!(await user.comparePassword(currentPassword))) {
    res.status(400).json({ message: 'Current password is incorrect' });
    return;
  }

  if (!isStrongPassword(newPassword)) {
    res.status(400).json({ message: 'Password does not meet strength requirements' });
    return;
  }

  if (user.isPasswordInHistory(newPassword)) {
    res.status(400).json({ message: 'Password has been used recently' });
    return;
  }

  user.addPasswordToHistory(user.password);
  user.password = newPassword;
  await user.save();

  logAuthEvent('password_changed', user._id.toString());
  res.json({ message: 'Password changed successfully' });
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token', isExpired: true });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const jwtToken = generateToken(user, false);

    res.status(200).json({ message: 'Email verified successfully', token: jwtToken });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email', error });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newToken = generateToken(user, false);
    const newRefreshToken = generateRefreshToken(user);

    res.json({ 
      token: newToken, 
      refreshToken: newRefreshToken,
      user: getUserResponseData(user)
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};




export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, isEmailVerified: false });

    if (!user) {
      return res.status(400).json({ message: 'User not found or already verified' });
    }

    const verificationToken = user.generateVerificationToken();
    await user.save();

    const verificationURL = `${FRONTEND_URL}/verify-email/${verificationToken}`;
    await EmailService.sendVerificationEmail(user.email, verificationURL);

    res.status(200).json({ message: 'Verification email resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending verification email', error });
  }
};

// Helper functions
function generateToken(user: IUser, rememberMe: boolean): string {
  console.log('Generating token with secret:', process.env.JWT_SECRET);
  return sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: rememberMe ? '30d' : process.env.JWT_EXPIRATION }
  );
}
function generateRefreshToken(user: IUser): string {
  return sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  );
}

function getUserResponseData(user: IUser) {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    requires2FA: user.isTwoFactorEnabled,
    twoFactorCompleted: false,
    isEmailVerified: user.isEmailVerified
  };
}

export const getEmailVerificationStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log('Checking email verification status for user:', userId);
    
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User email verification status:', user.isEmailVerified);
    res.json({ isVerified: user.isEmailVerified });
  } catch (error) {
    console.error('Error checking email verification status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
