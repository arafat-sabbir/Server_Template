import mongoose, { Model, Schema } from 'mongoose';
import { TOtp } from './otp.interface';

const otpSchema = new Schema<TOtp>(
  {
    otp: { type: String, required: true },
    expireAt: { type: Date, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const OtpModel: Model<TOtp> = mongoose.model<TOtp>('Otp', otpSchema);
