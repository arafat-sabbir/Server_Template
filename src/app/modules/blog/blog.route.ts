// Import Router from express
// Import Router from express
import { NextFunction, Request, Response, Router } from 'express';

// Import controller from corresponding module
import { blogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';
import { upload } from '../../utils/multer';
import convertFilePath from '../../utils/convertFilePath';
import AuthorizeRequest from '../../middlewares/auth';

// Initialize router
const router = Router();

router.post(
  '',
  upload.single('photo'),
  convertFilePath,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...req.body, photo: req.file?.path };
    next();
  },
  validateRequest(blogValidation.createBlogSchema),
  blogControllers.createBlog
);

router.get('', blogControllers.getAllBlog);

router.get('/:id', blogControllers.getSingleBlog);

router.patch('/:id', upload.single('photo'),
convertFilePath,
(req: Request, res: Response, next: NextFunction) => {
  req.body = { ...req.body, photo: req.file?.path };
  next();
}, AuthorizeRequest(), blogControllers.editBlog);


router.delete('/:id', AuthorizeRequest(), blogControllers.deleteBlog);

const blogRoutes = router;
export default blogRoutes;

