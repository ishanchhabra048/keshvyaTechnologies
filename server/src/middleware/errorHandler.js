import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let code = err.code || 'SERVER_ERROR';
  let message = err.message || 'An unexpected error occurred';
  let details = err.details || undefined;

  if (err.name === 'ZodError') {
    status = 400;
    code = 'VALIDATION_ERROR';
    message = 'Invalid input';
    details = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
  } else if (err.code === 11000) {
    status = 409;
    code = 'CONFLICT';
    message = 'Duplicate field value';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    code = 'UNAUTHORIZED';
    message = 'Invalid token';
  }

  if (env.NODE_ENV !== 'production' && status === 500) {
    console.error(err);
  }

  res.status(status).json({ success: false, error: { code, message, details } });
};
