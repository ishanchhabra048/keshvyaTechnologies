import { Router } from 'express';
import { listPublicProjects, getPublicProject } from '../controllers/project.js';

const router = Router();
router.get('/', listPublicProjects);
router.get('/:slug', getPublicProject);

export default router;
