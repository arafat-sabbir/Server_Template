import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

/** Create a new User */
router.post(
  "/create-user",
  validateRequest(userValidation.createUserSchema),
  userControllers.createUser
);

export const userRoutes = router;