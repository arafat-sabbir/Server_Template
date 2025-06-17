import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    otp: { type: String },
    isOtpVerified: { type: Boolean, default: false },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<TUser>('User', userSchema);
export default UserModel;
