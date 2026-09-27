import { getPublicProjects, getPublicProjectBySlug } from '../services/project.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listPublicProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
  const filter = {};
  if (req.query.category && req.query.category !== 'all') filter.category = req.query.category;
  if (req.query.featured === 'true') filter.featured = true;

  const result = await getPublicProjects(filter, page, limit);
  
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  sendSuccess(res, result.data, result.meta);
});

export const getPublicProject = asyncHandler(async (req, res) => {
  const project = await getPublicProjectBySlug(req.params.slug);
  if (!project) throw new ApiError(404, 'Project not found', 'NOT_FOUND');
  
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  sendSuccess(res, project);
});
