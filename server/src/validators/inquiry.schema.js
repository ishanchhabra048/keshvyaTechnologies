import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  projectType: z.enum(['New website', 'Redesign', 'Web app', 'E-commerce', 'Other']),
  budget: z.enum(['Under $1k', '$1k-$3k', '$3k-$10k', '$10k+', 'Not sure']),
  message: z.string().trim().min(10).max(2000),
  website: z.string().trim().optional() // honeypot
});
