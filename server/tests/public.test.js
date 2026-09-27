import { test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
import Project from '../src/models/Project.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Project.deleteMany({});
});

test('GET /api/projects returns envelope', async () => {
  await Project.create({ title: 'Test Project', slug: 'test', summary: 'test', category: 'website', status: 'published' });
  const res = await request(app).get('/api/projects');
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data.length).toBe(1);
  expect(res.body.meta.total).toBe(1);
});

test('GET /api/projects omits drafts', async () => {
  await Project.create({ title: 'Draft', slug: 'draft', summary: 'test', category: 'website', status: 'draft' });
  const res = await request(app).get('/api/projects');
  expect(res.body.data.length).toBe(0);
});
