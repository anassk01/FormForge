// src/controllers/credit-package.controller.ts

import { Request, Response } from 'express';
import { CreditPackage, ICreditPackage } from '../models/credit-package.model';
import { StripeService } from '../services/stripe.service';
import { User, IUser } from '../models/user.model'; // Make sure to import IUser as well

export const createCreditPackage = async (req: Request, res: Response) => {
  try {
    const packageData: ICreditPackage = req.body;

    // Validate required fields
    if (!packageData.name || !packageData.credits || !packageData.price || !packageData.description || !packageData.stripePriceId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPackage = new CreditPackage(packageData);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error: unknown) {
    console.error('Error creating credit package:', error);

    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: (error as any).errors });
      }
      res.status(500).json({ message: 'Error creating credit package', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getCreditPackages = async (req: Request, res: Response) => {
  try {
    const packages = await CreditPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching credit packages', error });
  }
};

export const updateCreditPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<ICreditPackage> = req.body;
    const updatedPackage = await CreditPackage.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating credit package', error });
  }
};

export const deleteCreditPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Credit package ID is required' });
    }
    const deletedPackage = await CreditPackage.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json({ message: 'Credit package deleted successfully' });
  } catch (error) {
    console.error('Error deleting credit package:', error);
    res.status(500).json({ message: 'Error deleting credit package', error: (error as Error).message });
  }
};


export const purchasePackage = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.body;
    const userId = (req.user as IUser | undefined)?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const creditPackage = await CreditPackage.findById(packageId);
    if (!creditPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (creditPackage.isSubscription) {
      const subscription = await StripeService.createSubscription(user, packageId);
      // Handle subscription creation
      res.json({ message: 'Subscription created', subscriptionId: subscription.id });
    } else {
      // For one-time purchases, we'll just return success and let the frontend handle the payment
      res.json({ message: 'One-time purchase initiated' });
    }
  } catch (error) {
    console.error('Error purchasing package:', error);
    res.status(500).json({ message: 'Error purchasing package', error: (error as Error).message });
  }
};