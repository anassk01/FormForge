import mongoose, { Schema, Document } from 'mongoose';

export interface ICode extends Document {
  rawCode: string;
  interpretedStructure: object;
  createdAt: Date;
}

const CodeSchema: Schema = new Schema({
  rawCode: { type: String, required: true },
  interpretedStructure: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Code = mongoose.model<ICode>('Code', CodeSchema);