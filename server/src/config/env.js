import { z } from 'zod';
import dotenv from 'dotenv';

// In development, load from .env (in production, Render provides them)
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().url().or(z.string().startsWith('mongodb')).default('mongodb://localhost:27017/agency'),
  JWT_SECRET: z.string().min(32).default('fallback_secret_for_development_must_be_32_chars'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  CLIENT_ORIGINS: z.string().transform(str => str.split(',')).default('http://localhost:5173'),
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
  ADMIN_PASSWORD: z.string().min(12).optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  if (process.env.NODE_ENV !== 'test') process.exit(1);
}

export const env = _env.data || {};
