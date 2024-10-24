import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import blogRoutes from '../modules/blog/blog.route';

const router = Router();

const routes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

const allRoutes = router;
export default allRoutes;
