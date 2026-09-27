import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import api from '../lib/api.js';

export function useProjects({ category = 'all', limit = 6 } = {}) {
  return useInfiniteQuery({
    queryKey: ['projects', { category, limit }],
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam, limit };
      if (category && category !== 'all') {
        params.category = category;
      }
      const res = await api.get('/projects', { params });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const res = await api.get('/projects', { params: { featured: true, limit: 3 } });
      return res.data.data;
    },
  });
}
