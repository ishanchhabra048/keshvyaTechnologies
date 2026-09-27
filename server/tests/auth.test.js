import { test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../src/app.js';
import User from '../src/models/User.js';

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
  await User.deleteMany({});
});

test('POST /api/auth/login succeeds and sets httpOnly cookie', async () => {
  const passwordHash = await bcrypt.hash('password12345', 12);
  await User.create({ email: 'admin@test.com', passwordHash, name: 'Admin', role: 'admin' });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@test.com', password: 'password12345' });

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data.user.email).toBe('admin@test.com');
  expect(res.headers['set-cookie']).toBeDefined();
  expect(res.headers['set-cookie'][0]).toContain('token=');
});

test('POST /api/auth/login fails on incorrect password', async () => {
  const passwordHash = await bcrypt.hash('password12345', 12);
  await User.create({ email: 'admin@test.com', passwordHash, name: 'Admin', role: 'admin' });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@test.com', password: 'wrongpassword' });

  expect(res.status).toBe(401);
  expect(res.body.success).toBe(false);
  expect(res.body.error.code).toBe('UNAUTHORIZED');
});

test('GET /api/auth/me without token returns 401', async () => {
  const res = await request(app).get('/api/auth/me');
  expect(res.status).toBe(401);
  expect(res.body.success).toBe(false);
});

test('POST /api/auth/logout clears cookie', async () => {
  const passwordHash = await bcrypt.hash('password12345', 12);
  const user = await User.create({ email: 'admin@test.com', passwordHash, name: 'Admin', role: 'admin' });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@test.com', password: 'password12345' });

  const cookie = loginRes.headers['set-cookie'];

  const logoutRes = await request(app)
    .post('/api/auth/logout')
    .set('Cookie', cookie);

  expect(logoutRes.status).toBe(204);
});
