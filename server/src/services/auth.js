import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const DUMMY_HASH = '$2a$12$e8Y6lqW8.d4Msh0ZfxE3UOB8R6Q69Q3iTqQ9wV10mEaV.yqVqWb0a';

export const login = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  
  const hashToCompare = user ? user.passwordHash : DUMMY_HASH;
  const isMatch = await bcrypt.compare(password, hashToCompare);

  if (!user || !isMatch) {
    throw new ApiError(401, 'Invalid email or password', 'UNAUTHORIZED');
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = jwt.sign(
    { sub: user._id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN || '1d' }
  );

  const userJson = user.toJSON();

  return { user: userJson, token };
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(401, 'User not found', 'UNAUTHORIZED');
  }
  return user.toJSON();
};
