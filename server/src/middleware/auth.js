import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
      return next(new ApiError(401, 'Authentication required', 'UNAUTHORIZED'));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.sub);

    if (!user) {
      return next(new ApiError(401, 'User not found or token invalid', 'UNAUTHORIZED'));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Invalid or expired token', 'UNAUTHORIZED'));
    }
    next(error);
  }
};
