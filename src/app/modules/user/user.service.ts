// Import the model
import { hashInfo } from '../../utils/hashInfo';
import { TUser } from './user.interface';
import UserModel from './user.model';

// Service function to create a new user.

const createUser = async (payload: TUser) => {
  const { password, ...data } = payload;
  const hashedPassword = await hashInfo(password);
  const newUser = await UserModel.create({ password: hashedPassword, ...data });
  return newUser;
};

// Service function to retrieve a single user by ID.

const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

// Service function to retrieve multiple user based on query parameters.

export const userServices = {
  createUser,
  getUserById,
};

