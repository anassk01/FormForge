// src/routes/payment.routes.ts

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as paymentController from '../controllers/payment.controller';

const router = express.Router();

router.use(authMiddleware); // Protect all payment routes

router.post('/create-payment-intent', authMiddleware, paymentController.createPaymentIntent);

// New webhook route
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.handleStripeWebhook);

export default router;
