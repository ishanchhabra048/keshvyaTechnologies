import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const isOriginAllowed = (origin) => {
  if (!origin) return true;
  // Localhost (any port)
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  if (/^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  // Any Vercel deployment (*.vercel.app)
  if (/^https:\/\/([a-zA-Z0-9_-]+\.)?vercel\.app$/.test(origin)) return true;
  // Any Render app
  if (/^https:\/\/([a-zA-Z0-9_-]+\.)?onrender\.com$/.test(origin)) return true;
  // Configured origins
  if (Array.isArray(env.CLIENT_ORIGINS) && env.CLIENT_ORIGINS.some(allowed => origin === allowed || allowed === '*')) {
    return true;
  }
  return false;
};

export const originCheck = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const origin = req.headers.origin;
    if (origin && !isOriginAllowed(origin)) {
      return next(new ApiError(403, 'Forbidden origin', 'FORBIDDEN'));
    }
  }
  next();
};

