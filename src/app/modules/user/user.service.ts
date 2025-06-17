/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { hashInfo } from '../../utils/hashInfo';
import { TUser } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import { OtpModel } from '../otp/otp.model';
import sendEmailOtp from '../../utils/sendOtp';
import generateToken from '../../utils/generateToken';

//Find User If User Exist Send A Message To Login Else Sent An Otp
const findUser = async (payload: Pick<TUser, 'email'>) => {
  const result = await UserModel.findOne({ email: payload.email });
  if (result?.password) {
    return { message: 'User Already Exists' };
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const message = `আপনার  ওটিপি হল ${otp} ওটিপির মেয়াদ 2.5 মিনিট`;
  await sendEmailOtp(message, payload.email);

  const now = new Date(); // Current time
  const expiryTime = new Date(now.getTime() + 3 * 60 * 1000);
  const hashedOtp = await hashInfo(otp.toString());
  await OtpModel.deleteMany({ email: payload.email });
  await OtpModel.create({ ...payload, otp: hashedOtp, expireAt: expiryTime });
  return { message: 'Otp Sent SuccessFully' };
};

// Verify Otp
const verifyOtp = async (payload: Pick<TUser, 'email' | 'otp' | 'password' | 'name'>) => {
  const result = await OtpModel.findOne({ email: payload.email });
  if (!result) {
    throw new AppError(404, 'User Not Found');
  }
  const { otp, expireAt } = result;
  const isValid = await bcrypt.compare(payload.otp, otp);
  if (!isValid) {
    throw new AppError(400, 'Invalid Otp');
  }
  if (expireAt < new Date()) {
    await OtpModel.deleteMany({ email: payload.email });
    throw new AppError(400, 'Otp Expired');
  }
  const hashPassword = await hashInfo(payload.password);
  await OtpModel.deleteMany({ email: payload.email });

  const user = await UserModel.create({
    email: payload.email,
    password: hashPassword,
    name: payload.name,
    isOtpVerified: true,
    otp: '',
    otpExpiry: '',
  });

  const accessToken = await generateToken(
    (result as any)!._id,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  return { token: accessToken, user: { _id: user._id, email: user.email, name: user.name } };
};

// Register User And Send The Response To Server With The Hashed Password
const registerUser = async (payload: TUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email });

  if (existingUser?.isOtpVerified && existingUser) {
    throw new AppError(400, 'User Already Exists');
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const message = `আপনার  ওটিপি হল ${otp} ওটিপির মেয়াদ 2.5 মিনিট`;
  await sendEmailOtp(message, payload.email);

  const now = new Date(); // Current time
  const expiryTime = new Date(now.getTime() + 3 * 60 * 1000);
  const hashedOtp = await hashInfo(otp.toString());
  await OtpModel.deleteMany({ email: payload.email });
  await OtpModel.create({ ...payload, otp: hashedOtp, expireAt: expiryTime });
  return { message: 'Otp Sent SuccessFully' };
};

// Login User And Return Access Token
const loginUser = async (payload: Pick<TUser, 'email' | 'password'>) => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  if (!user.isOtpVerified) {
    throw new AppError(400, 'User Not Verified');
  }
  const isValid = await bcrypt.compare(payload.password, user.password);
  if (!isValid) {
    throw new AppError(400, 'Invalid Password');
  }
  const accessToken = await generateToken(
    (user as any)!._id,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );
  return { token: accessToken, user: { _id: user._id, email: user.email, name: user.name } };
};

const getUser = async (id: string) => {
  const user = await UserModel.findById(id).select('-password');
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  return user;
};

// picture,name,location,gender,bloodGroup
const updateUser = async (id: string, payload: Pick<TUser, 'name'>) => {
  const user = await UserModel.findById(id).select('-password');
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  // Update only the fields present in the payload
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      (user as any)[key] = value;
    }
  });

  // Save the updated user
  await user.save();

  return {};
};

export const userService = {
  registerUser,
  findUser,
  verifyOtp,
  loginUser,
  getUser,
  updateUser,
};
