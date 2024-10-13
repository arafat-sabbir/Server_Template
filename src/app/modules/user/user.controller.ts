import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * Controller function to handle the creation of a single User.
 *
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const createUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new user and get the result
  const result = await userServices.createUser(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New user Added Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the creation of multiple user.
 *
 * @param {Request} req - The request object containing an array of user data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const createManyUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create multiple users and get the result
  const result = await userServices.createManyUser(req.body);
  // Send a success response with the created resources data
   sendResponse(res, {
    message: 'users Created Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the update operation for a single user.
 *
 * @param {Request} req - The request object containing the ID of the user to update in URL parameters and the updated data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to update the user by ID and get the result
  const result = await userServices.updateUser(id, req.body);
  // Send a success response with the updated resource data
 sendResponse(res, {
    message: 'user Updated Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the update operation for multiple user.
 *
 * @param {Request} req - The request object containing an array of user data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const updateManyUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to update multiple user and get the result
  const result = await userServices.updateManyUser(req.body);
  // Send a success response with the updated resources data
    sendResponse(res, {
    message: 'users Updated Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the deletion of a single user.
 *
 * @param {Request} req - The request object containing the ID of the user to delete in URL parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to delete the user by ID
  await userServices.deleteUser(id);
  // Send a success response confirming the deletion
  sendResponse(res, {
    message: 'user Deleted Successfully',
    data: {},
  });
});

/**
 * Controller function to handle the deletion of multiple user.
 *
 * @param {Request} req - The request object containing an array of IDs of user to delete in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const deleteManyUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to delete multiple user and get the result
  await userServices.deleteManyUser(req.body);
  // Send a success response confirming the deletions
  sendResponse(res, {
    message: 'users Deleted Successfully',
    data: {},
  });
});

/**
 * Controller function to handle the retrieval of a single user by ID.
 *
 * @param {Request} req - The request object containing the ID of the user to retrieve in URL parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the user by ID and get the result
  const result = await userServices.getUserById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'user Retrieved Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the retrieval of multiple user.
 *
 * @param {Request} req - The request object containing query parameters for filtering.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const getManyUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple user based on query parameters and get the result
  const result = await userServices.getManyUser(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'user Retrieved Successfully',
    data: result,
  });
});