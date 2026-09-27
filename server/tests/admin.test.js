import { test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Project from '../src/models/Project.js';
import Inquiry from '../src/models/Inquiry.js';

let mongoServer;
let authCookie;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const passwordHash = await bcrypt.hash('adminpass12345', 12);
  await User.create({ email: 'admin@studio.com', passwordHash, name: 'Admin', role: 'admin' });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@studio.com', password: 'adminpass12345' });

  authCookie = res.headers['set-cookie'];
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Project.deleteMany({});
  await Inquiry.deleteMany({});
});

test('GET /api/admin/stats returns counts and recent inquiries', async () => {
  await Project.create({ title: 'P1', slug: 'p1', summary: 'summary 1234567890', category: 'website', status: 'published' });
  await Project.create({ title: 'P2', slug: 'p2', summary: 'summary 1234567890', category: 'web-app', status: 'draft' });
  await Inquiry.create({ name: 'John Doe', email: 'john@example.com', projectType: 'New website', budget: '$1k-$3k', message: 'Hello project inquiry' });

  const res = await request(app)
    .get('/api/admin/stats')
    .set('Cookie', authCookie);

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data.projectsTotal).toBe(2);
  expect(res.body.data.published).toBe(1);
  expect(res.body.data.drafts).toBe(1);
  expect(res.body.data.inquiriesNew).toBe(1);
});

test('POST /api/admin/projects creates a new project in draft mode', async () => {
  const newProj = {
    title: 'Brand New Showcase',
    summary: 'A wonderful new showcase project description',
    category: 'website',
    techStack: ['React', 'Tailwind']
  };

  const res = await request(app)
    .post('/api/admin/projects')
    .set('Cookie', authCookie)
    .send(newProj);

  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
  expect(res.body.data.slug).toBe('brand-new-showcase');
  expect(res.body.data.status).toBe('draft');
});

test('PATCH /api/admin/projects/:id/status updates status and enforces coverImage for publishing', async () => {
  const proj = await Project.create({
    title: 'Draft Project',
    slug: 'draft-project',
    summary: 'A test project with summary',
    category: 'website',
    status: 'draft'
  });

  // Attempt to publish without coverImage should fail with 400
  const failRes = await request(app)
    .patch(`/api/admin/projects/${proj._id}/status`)
    .set('Cookie', authCookie)
    .send({ status: 'published' });

  expect(failRes.status).toBe(400);

  // Add coverImage and publish
  proj.coverImage = { url: 'https://example.com/cover.jpg', publicId: 'cov1' };
  await proj.save();

  const successRes = await request(app)
    .patch(`/api/admin/projects/${proj._id}/status`)
    .set('Cookie', authCookie)
    .send({ status: 'published' });

  expect(successRes.status).toBe(200);
  expect(successRes.body.data.status).toBe('published');
  expect(successRes.body.data.publishedAt).toBeDefined();
});

test('DELETE /api/admin/projects/:id deletes project', async () => {
  const proj = await Project.create({
    title: 'To Delete',
    slug: 'to-delete',
    summary: 'A project to be deleted',
    category: 'branding'
  });

  const res = await request(app)
    .delete(`/api/admin/projects/${proj._id}`)
    .set('Cookie', authCookie);

  expect(res.status).toBe(200);
  const check = await Project.findById(proj._id);
  expect(check).toBeNull();
});

test('GET /api/admin/inquiries and PATCH status', async () => {
  const inq = await Inquiry.create({
    name: 'Jane Doe',
    email: 'jane@example.com',
    projectType: 'Web app',
    budget: '$3k-$10k',
    message: 'Need full custom dashboard',
    status: 'new'
  });

  const listRes = await request(app)
    .get('/api/admin/inquiries')
    .set('Cookie', authCookie);

  expect(listRes.status).toBe(200);
  expect(listRes.body.data.length).toBe(1);

  const patchRes = await request(app)
    .patch(`/api/admin/inquiries/${inq._id}`)
    .set('Cookie', authCookie)
    .send({ status: 'read' });

  expect(patchRes.status).toBe(200);
  expect(patchRes.body.data.status).toBe('read');
});
