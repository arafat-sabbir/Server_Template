import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

/** Create a new User */
const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);
  sendResponse(res, { message: "New User created successfully", data: result });
});

/** Get a single User by ID */
const getSingleUser = catchAsync(async (req, res) => {
  const result = await userServices.getUserById(req.params.id);
  sendResponse(res, { message: "User retrieved successfully", data: result });
});

/** Get all Users */
const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUser(req.query);
  sendResponse(res, { message: "Users retrieved successfully", data: result });
});

export const userControllers = {
  createUser,
  getSingleUser,
  getAllUser,
};