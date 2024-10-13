import { Request, Response } from 'express';
import { authServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * Controller function to handle the creation of a single Auth.
 *
 * @param {Request} req - The request object containing auth data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const createAuth = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new auth and get the result
  const result = await authServices.createAuth(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New auth Added Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the creation of multiple auth.
 *
 * @param {Request} req - The request object containing an array of auth data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const createManyAuth = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create multiple auths and get the result
  const result = await authServices.createManyAuth(req.body);
  // Send a success response with the created resources data
   sendResponse(res, {
    message: 'auths Created Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the update operation for a single auth.
 *
 * @param {Request} req - The request object containing the ID of the auth to update in URL parameters and the updated data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const updateAuth = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to update the auth by ID and get the result
  const result = await authServices.updateAuth(id, req.body);
  // Send a success response with the updated resource data
 sendResponse(res, {
    message: 'auth Updated Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the update operation for multiple auth.
 *
 * @param {Request} req - The request object containing an array of auth data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const updateManyAuth = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to update multiple auth and get the result
  const result = await authServices.updateManyAuth(req.body);
  // Send a success response with the updated resources data
    sendResponse(res, {
    message: 'auths Updated Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the deletion of a single auth.
 *
 * @param {Request} req - The request object containing the ID of the auth to delete in URL parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const deleteAuth = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to delete the auth by ID
  await authServices.deleteAuth(id);
  // Send a success response confirming the deletion
  sendResponse(res, {
    message: 'auth Deleted Successfully',
    data: {},
  });
});

/**
 * Controller function to handle the deletion of multiple auth.
 *
 * @param {Request} req - The request object containing an array of IDs of auth to delete in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const deleteManyAuth = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to delete multiple auth and get the result
  await authServices.deleteManyAuth(req.body);
  // Send a success response confirming the deletions
  sendResponse(res, {
    message: 'auths Deleted Successfully',
    data: {},
  });
});

/**
 * Controller function to handle the retrieval of a single auth by ID.
 *
 * @param {Request} req - The request object containing the ID of the auth to retrieve in URL parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const getAuthById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the auth by ID and get the result
  const result = await authServices.getAuthById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'auth Retrieved Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the retrieval of multiple auth.
 *
 * @param {Request} req - The request object containing query parameters for filtering.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const getManyAuth = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple auth based on query parameters and get the result
  const result = await authServices.getManyAuth(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'auth Retrieved Successfully',
    data: result,
  });
});