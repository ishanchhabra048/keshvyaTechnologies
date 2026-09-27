import * as projectService from '../services/project.js';
import * as inquiryService from '../services/inquiry.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getStats = asyncHandler(async (req, res) => {
  const stats = await projectService.getAdminStats();
  sendSuccess(res, stats);
});

export const listProjects = asyncHandler(async (req, res) => {
  const { status, q, page, limit } = req.query;
  const filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }
  if (q && q.trim()) {
    filter.title = { $regex: q.trim(), $options: 'i' };
  }

  const result = await projectService.getAdminProjects(filter, page, limit);
  sendSuccess(res, result.data, result.meta);
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  sendSuccess(res, project);
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  sendSuccess(res, project, undefined, 201);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  sendSuccess(res, project);
});

export const updateProjectStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const project = await projectService.updateProjectStatus(req.params.id, status);
  sendSuccess(res, project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const result = await projectService.deleteProject(req.params.id);
  sendSuccess(res, result);
});

export const listInquiries = asyncHandler(async (req, res) => {
  const { status, page, limit } = req.query;
  const filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }

  const result = await inquiryService.getAdminInquiries(filter, page, limit);
  sendSuccess(res, result.data, result.meta);
});

export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const inquiry = await inquiryService.updateInquiryStatus(req.params.id, status);
  sendSuccess(res, inquiry);
});

export const deleteInquiry = asyncHandler(async (req, res) => {
  const result = await inquiryService.deleteInquiry(req.params.id);
  sendSuccess(res, result);
});
