import { Router } from 'express';
import { handleInquiry } from '../controllers/inquiry.js';
import { validate } from '../middleware/validate.js';
import { inquirySchema } from '../validators/inquiry.schema.js';
import { inquiryLimiter } from '../middleware/rateLimit.js';

const router = Router();
router.post('/', inquiryLimiter, validate(inquirySchema), handleInquiry);

export default router;
