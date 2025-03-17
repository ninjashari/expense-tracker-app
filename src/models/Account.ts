import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'closed';
  initialBalance: number;
  openingDate: Date;
  currency: string;
  notes?: string;
  accountNumber?: string;
  minimumBalance?: number;
  creditLimit?: number;
  interestRate?: number;
  paymentDueDate?: Date;
  minimumPayment?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['savings', 'checking', 'credit', 'investment', 'loan', 'other'],
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'closed'],
      default: 'active',
    },
    initialBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    openingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    currency: {
      type: String,
      required: true,
      default: 'INR',
    },
    notes: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    minimumBalance: {
      type: Number,
      default: 0,
    },
    creditLimit: {
      type: Number,
    },
    interestRate: {
      type: Number,
    },
    paymentDueDate: {
      type: Date,
    },
    minimumPayment: {
      type: Number,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

export default mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema); 