import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.interface";

/** User schema definition */
const UserSchema = new Schema<IUser>(
  {
    // Define fields here
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<IUser>(
  "User",
  UserSchema
);