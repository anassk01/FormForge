// src/services/email.service.ts

import { IUser } from '../models/user.model';
import { ICreditPackage } from '../models/credit-package.model';

const nodemailer = require('nodemailer');

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  static async sendSubscriptionConfirmation(user: IUser, creditPackage: ICreditPackage) {
    await this.sendEmail({
      to: user.email,
      subject: 'Subscription Confirmation',
      text: `Thank you for subscribing to ${creditPackage.name}. Your subscription is now active.`,
    });
  }

  static async sendPaymentFailedNotification(user: IUser) {
    await this.sendEmail({
      to: user.email,
      subject: 'Payment Failed',
      text: 'Your recent payment has failed. Please update your payment method to avoid service interruption.',
    });
  }

  static async sendSubscriptionCancelledNotification(user: IUser) {
    await this.sendEmail({
      to: user.email,
      subject: 'Subscription Cancelled',
      text: 'Your subscription has been cancelled. We hope to see you again soon!',
    });
  }

  private static async sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  static async sendVerificationEmail(to: string, verificationURL: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Email Verification',
      html: `
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationURL}">Verify Email</a>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${to}`);
    } catch (error) {
      console.error('Error sending verification email:', error);
      // Instead of throwing, we'll log the error and continue
    }
  }

  static async sendPasswordResetEmail(to: string, resetURL: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetURL}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }
}
