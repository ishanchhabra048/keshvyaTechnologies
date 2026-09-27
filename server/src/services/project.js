import Project from '../models/Project.js';
import Inquiry from '../models/Inquiry.js';
import { slugify } from '../utils/slugify.js';
import { ApiError } from '../utils/ApiError.js';
import { deleteImage } from './upload.js';

export const getPublicProjects = async (filter = {}, page = 1, limit = 12) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
  const skip = (p - 1) * l;
  const query = { status: 'published', ...filter };
  
  const [data, total] = await Promise.all([
    Project.find(query).select('-description').sort({ featured: -1, order: 1, publishedAt: -1 }).skip(skip).limit(l).lean(),
    Project.countDocuments(query)
  ]);
  return { data, meta: { page: p, limit: l, total, totalPages: Math.ceil(total / l) } };
};

export const getPublicProjectBySlug = async (slug) => {
  const project = await Project.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();
  if (!project) {
    throw new ApiError(404, 'Project not found', 'NOT_FOUND');
  }
  return project;
};

export const getAdminProjects = async (filter = {}, page = 1, limit = 50) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (p - 1) * l;
  
  const [data, total] = await Promise.all([
    Project.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(l).lean(),
    Project.countDocuments(filter)
  ]);
  return { data, meta: { page: p, limit: l, total, totalPages: Math.ceil(total / l) } };
};

export const getProjectById = async (id) => {
  const project = await Project.findById(id).lean();
  if (!project) {
    throw new ApiError(404, 'Project not found', 'NOT_FOUND');
  }
  return project;
};

export const createProject = async (data) => {
  let slug = data.slug ? slugify(data.slug) : slugify(data.title);
  let exists = await Project.findOne({ slug });
  if (exists) {
    let i = 2;
    while (await Project.findOne({ slug: `${slug}-${i}` })) i++;
    slug = `${slug}-${i}`;
  }

  const projectData = {
    ...data,
    slug,
    publishedAt: data.status === 'published' ? new Date() : undefined
  };

  return await Project.create(projectData);
};

export const updateProject = async (id, data) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(404, 'Project not found', 'NOT_FOUND');
  }

  if (data.slug && data.slug !== project.slug) {
    const slug = slugify(data.slug);
    const exists = await Project.findOne({ slug, _id: { $ne: id } });
    if (exists) {
      throw new ApiError(409, 'A project with this slug already exists', 'CONFLICT');
    }
    data.slug = slug;
  }

  if (data.status === 'published' && !project.publishedAt) {
    data.publishedAt = new Date();
  }

  Object.assign(project, data);
  await project.save();
  return project.toJSON();
};

export const updateProjectStatus = async (id, status) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(404, 'Project not found', 'NOT_FOUND');
  }

  if (status === 'published') {
    if (!project.coverImage?.url) {
      throw new ApiError(400, 'Cannot publish a project without a cover image', 'VALIDATION_ERROR');
    }
    if (!project.publishedAt) {
      project.publishedAt = new Date();
    }
  }

  project.status = status;
  await project.save();
  return project.toJSON();
};

export const deleteProject = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(404, 'Project not found', 'NOT_FOUND');
  }

  // Best-effort cleanup of Cloudinary media
  if (project.coverImage?.publicId) {
    await deleteImage(project.coverImage.publicId).catch(() => {});
  }
  if (Array.isArray(project.gallery)) {
    for (const img of project.gallery) {
      if (img.publicId) {
        await deleteImage(img.publicId).catch(() => {});
      }
    }
  }

  await Project.findByIdAndDelete(id);
  return { id };
};

export const getAdminStats = async () => {
  const [projectsTotal, published, drafts, inquiriesNew, latestInquiries] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: 'published' }),
    Project.countDocuments({ status: 'draft' }),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.find().sort({ createdAt: -1 }).limit(5).lean()
  ]);

  return {
    projectsTotal,
    published,
    drafts,
    inquiriesNew,
    latestInquiries
  };
};
