// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { blogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';


// Initialize router
const router = Router();

router.post("/create-blog",validateRequest(blogValidation.createBlogSchema), blogControllers.createBlog);

const blogRoutes = router;
export default blogRoutes;