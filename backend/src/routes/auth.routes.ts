import { Router } from 'express';
import validateBodyMiddleware from '../middlewares/validateBody.middleware';
import authController from '../controllers/auth.controller';
import loginValidator from '../validators/login.validator';
import registerValidator from '../validators/register.validator';

const router = Router();

router.post('/login', validateBodyMiddleware(loginValidator), authController.login);
router.post('/register', validateBodyMiddleware(registerValidator), authController.register);

export default router;
