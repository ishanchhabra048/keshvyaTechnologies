import { test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
import Inquiry from '../src/models/Inquiry.js';

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
  await Inquiry.deleteMany({});
});

test('POST /api/inquiries saves inquiry and returns 201', async () => {
  const payload = {
    name: 'John', email: 'john@test.com', projectType: 'Web app', budget: '$10k+', message: 'Hello there message'
  };
  const res = await request(app).post('/api/inquiries').send(payload);
  expect(res.status).toBe(201);
  const doc = await Inquiry.findOne();
  expect(doc.email).toBe('john@test.com');
});

test('POST /api/inquiries rejects invalid email', async () => {
  const payload = {
    name: 'John', email: 'not-an-email', projectType: 'Web app', budget: '$10k+', message: 'Hello there message'
  };
  const res = await request(app).post('/api/inquiries').send(payload);
  expect(res.status).toBe(400);
  expect(res.body.error.code).toBe('VALIDATION_ERROR');
});

test('POST /api/inquiries skips save if honeypot filled', async () => {
  const payload = {
    name: 'Bot', email: 'bot@test.com', projectType: 'Web app', budget: '$10k+', message: 'Hello there message', website: 'http://spam.com'
  };
  const res = await request(app).post('/api/inquiries').send(payload);
  expect(res.status).toBe(201);
  const count = await Inquiry.countDocuments();
  expect(count).toBe(0);
});
