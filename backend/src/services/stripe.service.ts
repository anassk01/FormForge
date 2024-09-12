// src/services/stripe.service.ts

import Stripe from 'stripe';
import { IUser } from '../models/user.model';
import { CreditPackage } from '../models/credit-package.model';
import mongoose from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
});

export class StripeService {
  static async createCustomer(user: IUser): Promise<string> {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user._id?.toString() || '' },
    });
    return customer.id;
  }

  static async createSubscription(user: IUser, packageId: string): Promise<Stripe.Subscription> {
    const creditPackage = await CreditPackage.findById(packageId);

    if (!creditPackage) {
      throw new Error('Credit package not found');
    }

    let customerId: string;
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user._id.toString() },
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    } else {
      customerId = user.stripeCustomerId;
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: creditPackage.stripePriceId }],
      metadata: { packageId: packageId.toString() },
    });

    return subscription;
  }

  static async createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
  }



  static async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  }

  static async updateSubscription(subscriptionId: string, newPackageId: string): Promise<string> {
    const creditPackage = await CreditPackage.findById(newPackageId);
    if (!creditPackage) {
      throw new Error('Credit package not found');
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{ price: creditPackage.stripePriceId }],
      metadata: { packageId: newPackageId.toString() },
    });

    return updatedSubscription.id;
  }

  static async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripe.subscriptions.retrieve(subscriptionId);
  }

  static async handleWebhook(payload: Buffer, signature: string): Promise<Stripe.Event> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    try {
      return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }
}