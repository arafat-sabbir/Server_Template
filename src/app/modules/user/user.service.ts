import { UserModel } from "./user.model";
import { IUser } from "./user.interface";

/** Create a new User */
const createUser = async (data: IUser) => {
  return await UserModel.create(data);
};

/** Get a User by ID */
const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

/** Get all Users */
const getAllUser = async (query: any) => {
  return await UserModel.find(query);
};

export const userServices = {
  createUser,
  getUserById,
  getAllUser,
};