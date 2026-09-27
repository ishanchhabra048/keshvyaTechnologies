import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
});

export const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many login attempts, please try again later' } },
});
