// src/models/user.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface IUser extends Document {
  id: string; 
  _id: mongoose.Types.ObjectId;
  email: string;
  stripeCustomerId?: string;
  password: string;
  name: string;
  isAdmin: boolean;
  role: 'user' | 'admin';
  credits: number;
  creditHistory: {
    amount: number;
    description: string;
    date: Date;
  }[];
  subscription?: {
    packageId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'cancelled' | 'expired' | 'grace';
    stripeSubscriptionId: string;
    graceEndDate?: Date;
  };
  isEmailVerified: boolean;
  lastLogin: Date;
  twoFactorSecret?: string;
  isTwoFactorEnabled: boolean;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  passwordHistory: string[];
  accountStatus: 'active' | 'suspended' | 'deactivated';
  failedLoginAttempts: number;
  lockoutUntil: Date | null;

  comparePassword(candidatePassword: string): Promise<boolean>;
  generateVerificationToken(): string;
  incrementFailedLoginAttempts(): Promise<void>;
  resetFailedLoginAttempts(): Promise<void>;
  isLockedOut(): boolean;
  addPasswordToHistory(password: string): void;
  isPasswordInHistory(password: string): boolean;
  
  
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  credits: { type: Number, default: 0 },
  stripeCustomerId: { type: String },
  creditHistory: [{
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now }
  }],
  subscription: {
    packageId: { type: Schema.Types.ObjectId, ref: 'CreditPackage' },
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['active', 'cancelled', 'expired', 'grace'], default: 'active' },
    stripeSubscriptionId: String,
    graceEndDate: Date
  },
  isEmailVerified: { type: Boolean, default: false },
  lastLogin: Date,
  twoFactorSecret: { type: String },
  isTwoFactorEnabled: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  emailVerificationExpires: { type: Date, default: null },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordHistory: [String],
  accountStatus: { type: String, enum: ['active', 'suspended', 'deactivated'], default: 'active' },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date, default: null }
}, { timestamps: true });


UserSchema.statics.createAdminUser = async function(adminData: {
  email: string;
  password: string;
  name: string;
}): Promise<IUser> {
  const adminUser = new this({
    ...adminData,
    role: 'admin',
    isAdmin: true,
    isEmailVerified: true,
    accountStatus: 'active'
  });
  await adminUser.save();
  return adminUser;
};

interface IUserModel extends Model<IUser> {
  createAdminUser(adminData: {
    email: string;
    password: string;
    name: string;
  }): Promise<IUser>;
}

UserSchema.methods.getTwoFAStatus = function(): boolean {
  return this.isTwoFactorEnabled;
};


UserSchema.statics.createAdminUser = async function(adminData: {
  email: string;
  password: string;
  name: string;
}): Promise<IUser> {
  const adminUser = new this({
    ...adminData,
    role: 'admin',
    isAdmin: true,
    isEmailVerified: true
  });
  await adminUser.save();
  return adminUser;
};


UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.addPasswordToHistory(this.password);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateVerificationToken = function(): string {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  this.emailVerificationExpires = new Date(Date.now() + 24 * 3600000); // 24 hours
  return verificationToken;
};

UserSchema.methods.incrementFailedLoginAttempts = async function() {
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= 5) {
    this.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes lockout
  }
  await this.save();
};

UserSchema.methods.resetFailedLoginAttempts = async function() {
  this.failedLoginAttempts = 0;
  this.lockoutUntil = null;
  await this.save();
};

UserSchema.methods.isLockedOut = function(): boolean {
  return this.lockoutUntil && this.lockoutUntil > new Date();
};

UserSchema.methods.addPasswordToHistory = function(password: string) {
  this.passwordHistory.push(password);
  if (this.passwordHistory.length > 5) {
    this.passwordHistory.shift();
  }
};

UserSchema.methods.isPasswordInHistory = function(password: string): boolean {
  return this.passwordHistory.some((oldPassword: string) => bcrypt.compareSync(password, oldPassword));
};

export const User = mongoose.model<IUser, IUserModel>('User', UserSchema);