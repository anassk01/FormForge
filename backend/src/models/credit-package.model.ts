// src/models/credit-package.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICreditPackage extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  credits: number;
  price: number;
  description: string;
  isSubscription: boolean;
  durationDays: number;
  stripePriceId: string;
  
}

const CreditPackageSchema: Schema = new Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  isSubscription: { type: Boolean, default: false },
  durationDays: { type: Number, required: true, min: 1 },
  stripePriceId: { type: String, required: true },
}, { timestamps: true });

export const CreditPackage = mongoose.model<ICreditPackage>('CreditPackage', CreditPackageSchema);