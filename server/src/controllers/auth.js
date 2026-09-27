import * as authService from '../services/auth.js';
import { sendSuccess } from '../utils/response.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);

  res.cookie('token', token, COOKIE_OPTIONS);
  sendSuccess(res, { user });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.status(204).send();
});

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, { user: req.user.toJSON ? req.user.toJSON() : req.user });
});
