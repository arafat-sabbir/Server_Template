import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
export const generateToken = async (userId: Types.ObjectId, secret: string, expiresIn: string) => {
  return jwt.sign({ user: userId }, secret, {
    expiresIn,
  });
};
