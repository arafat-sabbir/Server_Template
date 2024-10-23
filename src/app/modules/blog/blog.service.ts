// Import the model
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

// Service function to retrieve multiple blog based on query parameters.
const getAllBlog = async (query: object) => {
  return await BlogModel.find(query);
};

export const blogServices = {
  createBlog,
  getBlogById,
  getAllBlog,
};