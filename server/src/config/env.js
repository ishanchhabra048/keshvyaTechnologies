import { z } from 'zod';
import dotenv from 'dotenv';

// In development, load from .env (in production, Render provides them)
dotenv.config();

const rawOrigins = process.env.CLIENT_ORIGINS || process.env.CLIENT_URL || 'http://localhost:5173';
const parsedOrigins = rawOrigins
  .split(',')
  .map(s => s.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/agency'),
  JWT_SECRET: z.string().default('fallback_secret_for_development_must_be_32_chars_long_minimum'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  CLIENT_ORIGINS: z.array(z.string()).default(parsedOrigins),
  CLIENT_URL: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().optional(),
  MAIL_TO: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().optional(),
});

const _env = envSchema.safeParse({
  ...process.env,
  CLIENT_ORIGINS: parsedOrigins,
});

if (!_env.success) {
  console.warn('Environment variable warning:', _env.error.format());
}

export const env = _env.data || {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/agency',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_for_development_must_be_32_chars_long_minimum',
  JWT_EXPIRES_IN: '1d',
  CLIENT_ORIGINS: parsedOrigins,
};

