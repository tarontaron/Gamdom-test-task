import { Router } from 'express';

import usersController from '../controllers/users.controller';
import authenticateMiddleware from '../middlewares/authenticate.middleware';

const router = Router();

router.get('/me', authenticateMiddleware, usersController.findMe);

export default router;
