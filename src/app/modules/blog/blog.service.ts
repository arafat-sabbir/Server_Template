// Import the model
import { TBlog } from './blog.interface';
import BlogModel from './blog.model';

// Service function to create a new blog.
const createBlog = async (data: object) => {
  const newBlog = await BlogModel.create(data);
  return newBlog;
};

// Service function to retrieve a single blog by ID.
const getBlogById = async (id: string) => {
  return await BlogModel.findById(id);
};

// Service function to retrieve All Blogs
const getAllBlog = async (query: object) => {
  return await BlogModel.find(query);
};

// // Service function to retrieve multiple blog based on query parameters.
const editBlog = async (id: string, payload: Partial<TBlog>) => {

  // Initialize updatedData as an empty object
  let updatedData: Partial<TBlog> = {};

  Object.keys(payload).forEach((key) => {
    // Ensure key is of type keyof TBlog and payload[key] is not undefined
    const typedKey = key as keyof TBlog;
    if (payload[typedKey] !== undefined) {
      updatedData = { ...updatedData, [typedKey]: payload[typedKey] };
    }
  });
  console.log(updatedData,"updatedData");
  // Find and update the blog by ID
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updatedBlog;
};

export const blogServices = {
  createBlog,
  getBlogById,
  getAllBlog,
  editBlog,
};

