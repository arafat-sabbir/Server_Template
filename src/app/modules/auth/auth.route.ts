// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { 
  createAuth,
  createManyAuth,
  updateAuth,
  updateManyAuth,
  deleteAuth,
  deleteManyAuth,
  getAuthById,
  getManyAuth
} from './auth.controller';

//Import validation from corresponding module
import { validateAuthId } from './auth.validation';

// Initialize router
const router = Router();

// Define route handlers
/**
 * @route POST /api/v1/auth/create-auth
 * @description Create a new auth
 * @access Public
 * @param {function} controller - ['createAuth']
 */
router.post("/create-auth", createAuth);

/**
 * @route POST /api/v1/auth/create-auth/many
 * @description Create multiple auth
 * @access Public
 * @param {function} controller - ['createManyAuth']
 */
router.post("/create-auth/many", createManyAuth);

/**
 * @route PUT /api/v1/auth/update-auth/many
 * @description Update multiple auth information
 * @access Public
 * @param {function} controller - ['updateManyAuth']
 */
router.put("/update-auth/many", updateManyAuth);

/**
 * @route PUT /api/v1/auth/update-auth/:id
 * @description Update auth information
 * @param {string} id - The ID of the auth to update
 * @access Public
 * @param {function} controller - ['updateAuth']
 * @param {function} validation - ['validateAuthId']
 */
router.put("/update-auth/:id", validateAuthId, updateAuth);


/**
 * @route DELETE /api/v1/auth/delete-auth/many
 * @description Delete multiple auth
 * @access Public
 * @param {function} controller - ['deleteManyAuth']
 */
router.delete("/delete-auth/many", deleteManyAuth);

/**
 * @route DELETE /api/v1/auth/delete-auth/:id
 * @description Delete a auth
 * @param {string} id - The ID of the auth to delete
 * @access Public
 * @param {function} controller - ['deleteAuth']
 * @param {function} validation - ['validateAuthId']
 */
router.delete("/delete-auth/:id", validateAuthId, deleteAuth);

/**
 * @route GET /api/v1/auth/get-auth/many
 * @description Get multiple auth
 * @access Public
 * @param {function} controller - ['getManyAuth']
 */
router.get("/get-auth/many", getManyAuth);

/**
 * @route GET /api/v1/auth/get-auth/:id
 * @description Get a auth by ID
 * @param {string} id - The ID of the auth to retrieve
 * @access Public
 * @param {function} controller - ['getAuthById']
 * @param {function} validation - ['validateAuthId']
 */
router.get("/get-auth/:id", validateAuthId, getAuthById);

// Export the router
const AuthRoutes = router;
export default AuthRoutes;