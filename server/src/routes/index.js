import { Router } from 'express';
import projectRoutes from './project.routes.js';
import inquiryRoutes from './inquiry.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
