import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
import AuthorizeRequest from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserSchema),
  userController.registerUser
);

router.post('/find-user', validateRequest(userValidation.findUserSchema), userController.findUser);

router.post(
  '/verify-otp',
  validateRequest(userValidation.otpVerifySchema),
  userController.verifyOtp
);

router.post('/login', validateRequest(userValidation.loginUserSchema), userController.loginUser);

router.get('/get-user', AuthorizeRequest(), userController.getUser);

router.patch(
  '/update-user',
  AuthorizeRequest(),

  validateRequest(userValidation.updateUserSchema),
  userController.updateUser
);

export const userRoutes = router;
