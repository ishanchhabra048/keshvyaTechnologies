import { useQuery } from '@tanstack/react-query';
import api from '../lib/api.js';
import { fallbackProjects } from '../content/fallbackProjects.js';

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/projects/${slug}`);
        if (res.data?.data) {
          return res.data.data;
        }
        throw new Error('Invalid project response');
      } catch (err) {
        console.warn(`API fetch for project '${slug}' failed, checking fallback projects:`, err.message);
        const match = fallbackProjects.find(p => p.slug === slug);
        if (match) return match;
        throw err;
      }
    },
    enabled: Boolean(slug),
  });
}
