import { Response ,NextFunction} from 'express';
import { User, IUser } from '../models/user.model';
import { CreditPackage, ICreditPackage } from '../models/credit-package.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { StripeService } from '../services/stripe.service';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../types';

interface SubscribeRequestBody {
  packageId: string;
}

export const getCurrentSubscription = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('getSubscriptionAnalytics - User:', req.user);
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const user = await User.findById(req.user._id).populate('subscription.packageId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error });
  }
};


export const subscribe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { packageId } = req.body as SubscribeRequestBody;
    const user = await User.findById(req.user._id);
    const creditPackage = await CreditPackage.findById(packageId);
    if (!user || !creditPackage) {
      return res.status(404).json({ message: 'User or package not found' });
    }
    if (!creditPackage.isSubscription) {
      return res.status(400).json({ message: 'Selected package is not a subscription' });
    }
    const stripeSubscription = await StripeService.createSubscription(user, packageId);
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (creditPackage.durationDays || 30) * 24 * 60 * 60 * 1000);
    user.subscription = {
      packageId: creditPackage._id as mongoose.Types.ObjectId,
      startDate,
      endDate,
      status: 'active',
      stripeSubscriptionId: stripeSubscription.id
    };
    user.credits += creditPackage.credits;
    user.creditHistory.push({
      id: new mongoose.Types.ObjectId().toString(), // Add this line
      amount: creditPackage.credits,
      description: `Subscription to ${creditPackage.name}`,
      date: startDate
    });
    await user.save();
    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};


export const cancelSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user || !user.subscription || !user.subscription.stripeSubscriptionId) {
      return res.status(404).json({ message: 'Active subscription not found' });
    }

    const cancelledSubscription = await StripeService.cancelSubscription(user.subscription.stripeSubscriptionId);

    user.subscription.status = 'cancelled';
    user.subscription.endDate = new Date(cancelledSubscription.current_period_end * 1000);
    await user.save();

    res.json({ message: 'Subscription cancelled successfully', endDate: user.subscription.endDate });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Error cancelling subscription', error: (error as Error).message });
  }
};

export const upgradeSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { packageId } = req.body;
    const user = await User.findById(req.user._id);
    const newPackage = await CreditPackage.findById(packageId);
    if (!user || !newPackage || !user.subscription) {
      return res.status(404).json({ message: 'User, package, or subscription not found' });
    }
    if (!newPackage.isSubscription) {
      return res.status(400).json({ message: 'Selected package is not a subscription' });
    }
    const updatedStripeSubscriptionId = await StripeService.updateSubscription(user.subscription.stripeSubscriptionId, packageId);
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (newPackage.durationDays || 30) * 24 * 60 * 60 * 1000);
    user.subscription = {
      packageId: newPackage._id as mongoose.Types.ObjectId,
      startDate,
      endDate,
      status: 'active',
      stripeSubscriptionId: updatedStripeSubscriptionId
    };
    // Add credit history entry for upgrade
    user.creditHistory.push({
      id: new mongoose.Types.ObjectId().toString(), 
      amount: newPackage.credits,
      description: `Upgraded subscription to ${newPackage.name}`,
      date: startDate
    });
    await user.save();
    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error upgrading subscription', error });
  }
};


export const downgradeSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { packageId } = req.body;
    const user = await User.findById(req.user._id);
    const newPackage = await CreditPackage.findById(packageId);

    if (!user || !newPackage || !user.subscription) {
      return res.status(404).json({ message: 'User, package, or subscription not found' });
    }

    if (!newPackage.isSubscription) {
      return res.status(400).json({ message: 'Selected package is not a subscription' });
    }

    const updatedStripeSubscriptionId = await StripeService.updateSubscription(user.subscription.stripeSubscriptionId, packageId);

    user.subscription = {
      ...user.subscription,
      packageId: newPackage._id as mongoose.Types.ObjectId,
      status: 'active',
      stripeSubscriptionId: updatedStripeSubscriptionId
    };

    await user.save();

    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error downgrading subscription', error });
  }
};