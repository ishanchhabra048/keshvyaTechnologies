const fs = require('fs');
const path = require('path');

const write = (file, content) => {
  const p = path.join(__dirname, 'server/src', file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n');
};

write('config/db.js', "import mongoose from 'mongoose'; import { env } from './env.js'; export const connectDB = async () => { try { if (mongoose.connection.readyState === 1) return; await mongoose.connect(env.MONGODB_URI); console.log('MongoDB connected'); } catch (error) { console.error(error.message); process.exit(1); } };");
write('utils/ApiError.js', "export class ApiError extends Error { constructor(status, message, code = 'INTERNAL_ERROR', details = null) { super(message); this.status = status; this.code = code; this.details = details; Error.captureStackTrace(this, this.constructor); } }");
write('utils/asyncHandler.js', "export const asyncHandler = (fn) => (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next); };");
write('utils/slugify.js', "export const slugify = (text) => text.toString().toLowerCase().trim().replace(/[\\s\\W-]+/g, '-').replace(/^-+|-+$/g, '');");
write('utils/response.js', "export const sendSuccess = (res, data, meta = undefined, status = 200) => { res.status(status).json({ success: true, data, meta }); };");
write('middleware/notFound.js', "import { ApiError } from '../utils/ApiError.js'; export const notFound = (req, res, next) => next(new ApiError(404, Route  not found, 'NOT_FOUND'));");
write('middleware/validate.js', "import { asyncHandler } from '../utils/asyncHandler.js'; export const validate = (schema) => asyncHandler(async (req, res, next) => { req.body = await schema.parseAsync(req.body); next(); });");

const errorHandler = import { env } from '../config/env.js';
export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500; let code = err.code || 'SERVER_ERROR'; let message = err.message || 'An unexpected error occurred'; let details = err.details || undefined;
  if (err.name === 'ZodError') { status = 400; code = 'VALIDATION_ERROR'; message = 'Invalid input'; details = err.errors.map(e => ({ path: e.path.join('.'), message: e.message })); }
  else if (err.code === 11000) { status = 409; code = 'CONFLICT'; message = 'Duplicate field value'; }
  else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') { status = 401; code = 'UNAUTHORIZED'; message = 'Invalid token'; }
  if (env.NODE_ENV !== 'production' && status === 500) console.error(err);
  res.status(status).json({ success: false, error: { code, message, details } });
};;
write('middleware/errorHandler.js', errorHandler);

const rateLimitCode = import rateLimit from 'express-rate-limit';
export const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } } });
export const inquiryLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } } });;
write('middleware/rateLimit.js', rateLimitCode);

const originCheck = import { env } from '../config/env.js'; import { ApiError } from '../utils/ApiError.js';
export const originCheck = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const origin = req.headers.origin;
    if (!origin || !env.CLIENT_ORIGINS.includes(origin)) return next(new ApiError(403, 'Forbidden', 'FORBIDDEN'));
  }
  next();
};;
write('middleware/originCheck.js', originCheck);

