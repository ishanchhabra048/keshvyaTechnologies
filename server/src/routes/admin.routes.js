import { Router } from 'express';
import * as adminController from '../controllers/admin.js';
import * as uploadController from '../controllers/upload.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { uploadSingleImage } from '../middleware/upload.js';
import { projectSchema } from '../validators/project.schema.js';

const router = Router();

// All admin routes require authentication
router.use(requireAuth);

// Dashboard stats
router.get('/stats', adminController.getStats);

// Projects management
router.get('/projects', adminController.listProjects);
router.get('/projects/:id', adminController.getProject);
router.post('/projects', validate(projectSchema), adminController.createProject);
router.put('/projects/:id', validate(projectSchema), adminController.updateProject);
router.patch('/projects/:id/status', adminController.updateProjectStatus);
router.delete('/projects/:id', adminController.deleteProject);

// Uploads
router.post('/uploads', uploadSingleImage, uploadController.handleUpload);
router.delete('/uploads/:publicId', uploadController.handleDelete);

// Inquiries management
router.get('/inquiries', adminController.listInquiries);
router.patch('/inquiries/:id', adminController.updateInquiryStatus);
router.delete('/inquiries/:id', adminController.deleteInquiry);

export default router;
