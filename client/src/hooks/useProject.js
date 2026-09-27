import { useQuery } from '@tanstack/react-query';
import api from '../lib/api.js';

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const res = await api.get(`/projects/${slug}`);
      return res.data.data;
    },
    enabled: Boolean(slug),
  });
}
