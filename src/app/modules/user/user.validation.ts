import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email Is Required' }),
  }),
});

const findUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email Is Required' }),
  }),
});

const otpVerifySchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email Is Required' }),
    name: z.string({ required_error: 'Name Is Required' }),
    password: z
      .string({ required_error: 'Password Is Required' })
      .min(5, 'Password must be at least 5 characters long'),
    otp: z.string({ required_error: 'Otp Is Required' }),
  }),
});

const loginUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email Is Required' }),
    password: z
      .string({ required_error: 'Password Is Required' })
      .min(5, 'Password must be at least 5 characters long'),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const userValidation = {
  createUserSchema,
  findUserSchema,
  otpVerifySchema,
  loginUserSchema,
  updateUserSchema,
};
