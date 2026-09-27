import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an optimized Cloudinary delivery URL with auto format and quality.
 * If URL is not a Cloudinary asset (e.g. local /placeholders/ SVG), returns untouched.
 */
export function cdn(url, width) {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) return url;
  
  const widthParam = width ? `w_${width},` : '';
  const transform = `f_auto,q_auto,${widthParam}c_limit`;
  return url.replace('/upload/', `/upload/${transform}/`);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
