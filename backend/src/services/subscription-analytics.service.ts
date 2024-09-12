// src/services/subscription-analytics.service.ts

import { User, IUser } from '../models/user.model';
import { ICreditPackage } from '../models/credit-package.model';

export class SubscriptionAnalyticsService {
  static async getActiveSubscribersCount(): Promise<number> {
    return User.countDocuments({ 'subscription.status': 'active' });
  }

  static async getMonthlyRecurringRevenue(): Promise<number> {
    const activeSubscriptions = await User.find({ 'subscription.status': 'active' }).populate('subscription.packageId');
    return activeSubscriptions.reduce((total, user) => {
      const creditPackage = (user.subscription?.packageId as ICreditPackage | undefined);
      return total + (creditPackage?.price || 0);
    }, 0);
  }

  static async getChurnRate(periodInDays: number = 30): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);

    const totalSubscribersAtStart = await User.countDocuments({
      'subscription.startDate': { $lt: periodStart }
    });

    const cancelledSubscriptions = await User.countDocuments({
      'subscription.status': 'cancelled',
      'subscription.endDate': { $gte: periodStart, $lt: now }
    });

    return totalSubscribersAtStart > 0 ? cancelledSubscriptions / totalSubscribersAtStart : 0;
  }


  static async getNewSubscribersCount(periodInDays: number = 30): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);
    return User.countDocuments({
      'subscription.startDate': { $gte: periodStart, $lte: now }
    });
  }

  static async getAverageRevenuePerUser(): Promise<number> {
    const totalRevenue = await this.getMonthlyRecurringRevenue();
    const activeSubscribers = await this.getActiveSubscribersCount();
    return activeSubscribers > 0 ? totalRevenue / activeSubscribers : 0;
  }

  static async getSubscriptionGrowthRate(periodInDays: number = 30): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);
    const subscribersAtStart = await User.countDocuments({
      'subscription.startDate': { $lt: periodStart },
      'subscription.status': 'active'
    });
    const currentSubscribers = await this.getActiveSubscribersCount();
    return subscribersAtStart > 0 ? (currentSubscribers - subscribersAtStart) / subscribersAtStart : 0;
  }
}