import mongoose, {  Schema } from 'mongoose';
import { TUser } from './user.interface';



// Define the User schema
const UserSchema: Schema<TUser> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
});

// Create the User model
const User = mongoose.model<TUser>('User', UserSchema);

// Export the User model
export default User;