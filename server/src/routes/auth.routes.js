import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators/auth.schema.js';
import { loginLimiter } from '../middleware/rateLimit.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginLimiter, validate(loginSchema), authController.login);
router.post('/logout', requireAuth, authController.logout);
router.get('/me', requireAuth, authController.getMe);

export default router;
