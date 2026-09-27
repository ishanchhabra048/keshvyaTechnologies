import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z.string().trim().min(1).optional(),
  summary: z.string().trim().min(10).max(240),
  description: z.string().default(''),
  category: z.enum(['website', 'web-app', 'ecommerce', 'branding']),
  industry: z.string().default(''),
  clientName: z.string().default(''),
  year: z.coerce.number().int().min(2000).max(2100).optional().or(z.literal(0)),
  techStack: z.array(z.string().max(30)).max(12).default([]),
  coverImage: z.object({ url: z.string().optional(), publicId: z.string().optional(), alt: z.string().optional() }).optional().nullable(),
  gallery: z.array(z.object({ url: z.string(), publicId: z.string(), alt: z.string().optional() })).max(12).default([]),
  liveUrl: z.string().url().or(z.literal('')).default(''),
  results: z.array(z.object({ label: z.string(), value: z.string() })).max(4).default([]),
  testimonial: z.object({ quote: z.string(), author: z.string(), role: z.string() }).optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
  order: z.coerce.number().int().default(0)
});
