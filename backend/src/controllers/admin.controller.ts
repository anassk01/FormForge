// src/controllers/admin.controller.ts

import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { CreditPackage , ICreditPackage} from '../models/credit-package.model';
import { SubscriptionAnalyticsService } from '../services/subscription-analytics.service';
import { AuthRequest } from '../middleware/auth.middleware'; // Import the AuthRequest type

export const getAllUsers = async (req: Request, res: Response) => {
  console.log('getAllUsers function called');
  try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sort = (req.query.sort as string) || 'name';
      const order = (req.query.order as string) || 'asc';
      const search = req.query.search as string;
    console.log('Query parameters:', { page, limit, sort, order, search });

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('MongoDB query:', JSON.stringify(query));

    const total = await User.countDocuments(query);
    console.log('Total users:', total);

    const users = await User.find(query)
      .select('-password')
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    console.log('Users found:', users.length);
    console.log('First user:', users[0]);

    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    console.log('Getting user by ID:', req.params.id); // Add this line
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user); // Add this line
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { accountStatus: 'suspended' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User suspended successfully', user });
  } catch (error) {
    console.error('Error suspending user:', error);
    res.status(500).json({ message: 'Error suspending user', error });
  }
};

export const activateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { accountStatus: 'active' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User activated successfully', user });
  } catch (error) {
    console.error('Error activating user:', error);
    res.status(500).json({ message: 'Error activating user', error });
  }
};


export const getAllCreditPackages = async (req: Request, res: Response) => {
  try {
    const creditPackages = await CreditPackage.find();
    res.json(creditPackages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching credit packages', error });
  }
};

export const createCreditPackage = async (req: Request, res: Response) => {
  try {
    console.log('Received request to create credit package:', req.body);
    const packageData: ICreditPackage = req.body;

    // Validate required fields
    const requiredFields = ['name', 'credits', 'price', 'description', 'durationDays', 'stripePriceId'];
    const missingFields = requiredFields.filter(field => !packageData[field as keyof ICreditPackage]);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const newPackage = new CreditPackage(packageData);
    console.log('Creating new credit package:', newPackage);
    await newPackage.save();
    console.log('Credit package created successfully:', newPackage);
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

export const updateCreditPackage = async (req: Request, res: Response) => {
  try {
    const updatedCreditPackage = await CreditPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCreditPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json(updatedCreditPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating credit package', error });
  }
};

export const deleteCreditPackage = async (req: Request, res: Response) => {
  try {
    const deletedCreditPackage = await CreditPackage.findByIdAndDelete(req.params.id);
    if (!deletedCreditPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json({ message: 'Credit package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting credit package', error });
  }
};

export const getSubscriptionAnalytics = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const activeSubscribers = await SubscriptionAnalyticsService.getActiveSubscribersCount();
    const mrr = await SubscriptionAnalyticsService.getMonthlyRecurringRevenue();
    const churnRate = await SubscriptionAnalyticsService.getChurnRate();
    const newSubscribers = await SubscriptionAnalyticsService.getNewSubscribersCount();
    const arpu = await SubscriptionAnalyticsService.getAverageRevenuePerUser();
    const growthRate = await SubscriptionAnalyticsService.getSubscriptionGrowthRate();

    res.json({
      activeSubscribers,
      monthlyRecurringRevenue: mrr,
      churnRate,
      newSubscribers,
      averageRevenuePerUser: arpu,
      subscriptionGrowthRate: growthRate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription analytics', error });
  }
};

