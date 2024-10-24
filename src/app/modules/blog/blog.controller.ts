import { Request, Response } from 'express';
import { blogServices } from './blog.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Blog.
const createBlog = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new blog and get the result
  const result = await blogServices.createBlog(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Blog created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single blog by ID.
 const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the blog by ID and get the result
  const result = await blogServices.getBlogById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Blog Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple blog.
 const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple blog based on query parameters and get the result
  const result = await blogServices.getAllBlog(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Blogs Retrieved Successfully',
    data: result,
  });
});


const editBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to update the blog by ID and get the result
  const result = await blogServices.editBlog(id, req.body);
  // Send a success response with the updated resource data
  sendResponse(res, {
    message: 'Blog Updated Successfully',
    data: result,
  });
});


const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to delete the blog by ID and get the result
  const result = await blogServices.deleteBlog(id);
  // Send a success response with the deleted resource data
  sendResponse(res, {
    message: 'Blog Deleted Successfully',
    data: result,
  });
})

export const blogControllers = {
  createBlog,
  getSingleBlog,
  getAllBlog,
  editBlog,
  deleteBlog
}