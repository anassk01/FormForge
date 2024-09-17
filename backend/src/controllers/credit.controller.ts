import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/user.model';
import { logAuthEvent } from '../services/auth-logger.service';
import { CreditPackage } from '../models/credit-package.model';
import mongoose from 'mongoose';

export const getCreditBalance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const creditInfo = {
      credits: user.credits,
      lastUpdated: new Date(),
      recentTransactions: user.creditHistory.slice(-5) // Get last 5 transactions
    };
    res.json(creditInfo);
    logAuthEvent('credit_balance_check', user._id.toString(), { balance: user.credits });
  } catch (error) {
    console.error('Error fetching credit balance:', error);
    res.status(500).json({ message: 'Error fetching credit balance', error });
  }
};


export const addCredits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { amount, description } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({ message: 'Invalid credit amount' });
      return;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    user.credits += amount;
    user.creditHistory.push({
      id: new mongoose.Types.ObjectId().toString(),
      amount,
      description,
      date: new Date()
    });
    
    await user.save();
    res.json({ credits: user.credits, message: 'Credits added successfully' });
    logAuthEvent('credits_added', user._id.toString(), { amount, newBalance: user.credits });
  } catch (error) {
    console.error('Error adding credits:', error);
    res.status(500).json({ message: 'Error adding credits', error });
  }
};

export const useCredits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { amount, description } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({ message: 'Invalid credit amount' });
      return;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (user.credits < amount) {
      res.status(400).json({ message: 'Insufficient credits' });
      logAuthEvent('insufficient_credits', user._id.toString(), { attempted: amount, available: user.credits });
      return;
    }
    user.credits -= amount;
      user.creditHistory.push({
        id: new mongoose.Types.ObjectId().toString(),
        amount: -amount,
        description,
        date: new Date()
      });
      
    await user.save();
    res.json({ credits: user.credits, message: 'Credits used successfully' });
    logAuthEvent('credits_used', user._id.toString(), { amount, newBalance: user.credits });
  } catch (error) {
    console.error('Error using credits:', error);
    res.status(500).json({ message: 'Error using credits', error });
  }
};

export const getCreditHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const transactions = user.creditHistory.slice(startIndex, endIndex);
    const total = user.creditHistory.length;
    res.json({ transactions, total });
    logAuthEvent('credit_history_viewed', user._id.toString());
  } catch (error) {
    console.error('Error fetching credit history:', error);
    res.status(500).json({ message: 'Error fetching credit history', error });
  }
};

export const purchasePackage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { packageId } = req.body;
    const user = await User.findById(req.user._id);
    const creditPackage = await CreditPackage.findById(packageId);

    if (!user || !creditPackage) {
      res.status(404).json({ message: 'User or credit package not found' });
      return;
    }

    user.credits += creditPackage.credits;
    user.creditHistory.push({
      id: new mongoose.Types.ObjectId().toString(),
      amount: creditPackage.credits,
      description: `Purchased ${creditPackage.name}`,
      date: new Date()
    });



    await user.save();

    res.json({ credits: user.credits, message: 'Credit package purchased successfully' });
    logAuthEvent('credit_package_purchased', user._id.toString(), { packageId, credits: creditPackage.credits });
  } catch (error) {
    console.error('Error purchasing credit package:', error);
    res.status(500).json({ message: 'Error purchasing credit package', error });
  }
};