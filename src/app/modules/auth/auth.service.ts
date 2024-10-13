// Import the model
import AuthModel from './auth.model'; 

/**
 * Service function to create a new auth.
 *
 * @param data - The data to create a new auth.
 * @returns {Promise<Auth>} - The created auth.
 */
const createAuth = async (data: object) => {
  const newAuth = new AuthModel(data);
  return await newAuth.save();
};

/**
 * Service function to create multiple auth.
 *
 * @param data - An array of data to create multiple auth.
 * @returns {Promise<Auth[]>} - The created auth.
 */
const createManyAuth = async (data: object[]) => {
  return await AuthModel.insertMany(data);
};

/**
 * Service function to update a single auth by ID.
 *
 * @param id - The ID of the auth to update.
 * @param data - The updated data for the auth.
 * @returns {Promise<Auth>} - The updated auth.
 */
const updateAuth = async (id: string, data: object) => {
  return await AuthModel.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Service function to update multiple auth.
 *
 * @param data - An array of data to update multiple auth.
 * @returns {Promise<Auth[]>} - The updated auth.
 */
const updateManyAuth = async (data: { id: string, updates: object }[]) => {
  const updatePromises = data.map(({ id, updates }) =>
    AuthModel.findByIdAndUpdate(id, updates, { new: true })
  );
  return await Promise.all(updatePromises);
};

/**
 * Service function to delete a single auth by ID.
 *
 * @param id - The ID of the auth to delete.
 * @returns {Promise<Auth>} - The deleted auth.
 */
const deleteAuth = async (id: string) => {
  return await AuthModel.findByIdAndDelete(id);
};

/**
 * Service function to delete multiple auth.
 *
 * @param ids - An array of IDs of auth to delete.
 * @returns {Promise<Auth[]>} - The deleted auth.
 */
const deleteManyAuth = async (ids: string[]) => {
  return await AuthModel.deleteMany({ _id: { $in: ids } });
};

/**
 * Service function to retrieve a single auth by ID.
 *
 * @param id - The ID of the auth to retrieve.
 * @returns {Promise<Auth>} - The retrieved auth.
 */
const getAuthById = async (id: string) => {
  return await AuthModel.findById(id);
};

/**
 * Service function to retrieve multiple auth based on query parameters.
 *
 * @param query - The query parameters for filtering auth.
 * @returns {Promise<Auth[]>} - The retrieved auth.
 */
const getManyAuth = async (query: object) => {
  return await AuthModel.find(query);
};

export const authServices = {
  createAuth,
  createManyAuth,
  updateAuth,
  updateManyAuth,
  deleteAuth,
  deleteManyAuth,
  getAuthById,
  getManyAuth,
};