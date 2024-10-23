import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

// Define an interface representing a Blog document

// Define the Blog schema
const BlogSchema: Schema<TBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create the Blog model
const BlogModel = mongoose.model<TBlog>('Blog', BlogSchema);

// Export the Blog model
export default BlogModel;
