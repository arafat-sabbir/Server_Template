import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

//Fint User
const findUser = catchAsync(async (req, res) => {
  const result = await userService.findUser(req.body);
  return sendResponse(res, { data: {}, message: result.message });
});

//Register User
const registerUser = catchAsync(async (req, res) => {
  const result = await userService.registerUser(req.body);
  return sendResponse(res, { data: result, message: result.message });
});

//update user
const updateUser = catchAsync(async (req, res) => {
  const { user } = req.user;
  const result = await userService.updateUser(user, req.body);
  return sendResponse(res, { data: result, message: 'User Updated Successfully' });
});

//Verify Otp
const verifyOtp = catchAsync(async (req, res) => {
  const result = await userService.verifyOtp(req.body);
  return sendResponse(res, { data: result, message: 'Otp Verified SuccessFully Please Login' });
});

//login user

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);
  return sendResponse(res, { data: result, message: 'Logged In SuccessFully' });
});

//Get User By User Token
const getUser = catchAsync(async (req, res) => {
  const { user } = req.user;
  const result = await userService.getUser(user);
  return sendResponse(res, { data: result, message: 'User Retrieved Successfully' });
});

export const userController = {
  registerUser,
  findUser,
  verifyOtp,
  loginUser,
  getUser,
  updateUser,
};
