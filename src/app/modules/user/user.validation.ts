import { z } from "zod";

/** Validation schema for creating User */
const createUserSchema = z.object({
  body: z.object({
    // Add validation rules
  }),
});

export const userValidation = {
  createUserSchema,
};