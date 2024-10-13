import mongoose, { Schema } from 'mongoose';
import { TAuth } from './auth.interface';

// Define an interface representing a Auth document

// Define the Auth schema
const AuthSchema: Schema<TAuth> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
});

// Create the Auth model
const Auth = mongoose.model<TAuth>('Auth', AuthSchema);

// Export the Auth model
export default Auth;