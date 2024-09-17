// src/controllers/payment.controller.ts

import { Request, Response } from 'express';
import { StripeService } from '../services/stripe.service';
import { User } from '../models/user.model';
import { CreditPackage, ICreditPackage } from '../models/credit-package.model';
import mongoose from 'mongoose';
import { EmailService } from '../services/email.service';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent', error });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  try {
    const event = await StripeService.handleWebhook(req.body, signature);

    switch (event.type) {
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const checkExpiredGracePeriods = async () => {
  const now = new Date();
  const usersWithExpiredGrace = await User.find({
    'subscription.status': 'grace',
    'subscription.graceEndDate': { $lt: now }
  });

  for (const user of usersWithExpiredGrace) {
    if (user.subscription) {
      user.subscription.status = 'expired';
      user.subscription.graceEndDate = undefined;
      await user.save();
      await EmailService.sendSubscriptionCancelledNotification(user);
    }
  }
};

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscription = await StripeService.retrieveSubscription(invoice.subscription as string);
  const user = await User.findOne({ stripeCustomerId: invoice.customer as string });
  
  if (!user) {
    console.error('User not found for invoice:', invoice.id);
    return;
  }

  const creditPackage = await CreditPackage.findById(subscription.metadata.packageId);
  
  if (!creditPackage) {
    console.error('Credit package not found for subscription:', subscription.id);
    return;
  }

  const packageId = creditPackage._id instanceof mongoose.Types.ObjectId
    ? creditPackage._id
    : new mongoose.Types.ObjectId(creditPackage._id);

  user.subscription = {
    packageId: packageId,
    startDate: new Date(subscription.current_period_start * 1000),
    endDate: new Date(subscription.current_period_end * 1000),
    status: 'active',
    stripeSubscriptionId: subscription.id
  };

  user.credits += creditPackage.credits;
  user.creditHistory.push({
    id: new mongoose.Types.ObjectId().toString(), // Add this line
    amount: creditPackage.credits,
    description: `Subscription renewal: ${creditPackage.name}`,
    date: new Date()
  });
  await user.save();
  
  console.log('User subscription renewed:', user.email);

  // Send confirmation email
  await EmailService.sendSubscriptionConfirmation(user, creditPackage);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const user = await User.findOne({ stripeCustomerId: invoice.customer as string });
  
  if (!user) {
    console.error('User not found for failed invoice:', invoice.id);
    return;
  }

  console.log('Payment failed for user:', user.email);

  // Set grace period
  if (user.subscription) {
    const graceEndDate = new Date();
    graceEndDate.setDate(graceEndDate.getDate() + 3); // 3 days grace period
    user.subscription = {
      ...user.subscription,
      status: 'grace',
      graceEndDate: graceEndDate
    };
    await user.save();
  }

  // Send payment failed notification
  await EmailService.sendPaymentFailedNotification(user);
}


async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await User.findOne({ 'subscription.stripeSubscriptionId': subscription.id });
  
  if (!user) {
    console.error('User not found for deleted subscription:', subscription.id);
    return;
  }

  user.subscription = undefined;
  await user.save();
  console.log('Subscription cancelled for user:', user.email);

  // Send subscription cancelled notification
  await EmailService.sendSubscriptionCancelledNotification(user);
}