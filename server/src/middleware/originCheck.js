import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const originCheck = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const origin = req.headers.origin;
    if (origin && !env.CLIENT_ORIGINS.includes(origin)) {
      return next(new ApiError(403, 'Forbidden origin', 'FORBIDDEN'));
    }
  }
  next();
};
