// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { 
  createUser,
} from './user.controller';

//Import validation from corresponding module

// Initialize router
const router = Router();

router.post("/create-user", createUser);

const userRoutes = router;
export default userRoutes;