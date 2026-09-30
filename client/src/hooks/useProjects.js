import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import api from '../lib/api.js';
import { fallbackProjects } from '../content/fallbackProjects.js';

export function useProjects({ category = 'all', limit = 6 } = {}) {
  return useInfiniteQuery({
    queryKey: ['projects', { category, limit }],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const params = { page: pageParam, limit };
        if (category && category !== 'all') {
          params.category = category;
        }
        const res = await api.get('/projects', { params });
        if (res.data?.data) {
          return res.data;
        }
        throw new Error('Invalid response structure');
      } catch (err) {
        console.warn('API fetch failed, utilizing client showcase projects:', err.message);
        const filtered = category && category !== 'all'
          ? fallbackProjects.filter(p => p.category === category)
          : fallbackProjects;
        const start = (pageParam - 1) * limit;
        const pagedData = filtered.slice(start, start + limit);
        const totalPages = Math.ceil(filtered.length / limit) || 1;
        return {
          status: 'success',
          data: pagedData,
          meta: {
            page: pageParam,
            limit,
            total: filtered.length,
            totalPages,
          },
        };
      }
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
      try {
        const res = await api.get('/projects', { params: { featured: true, limit: 3 } });
        if (res.data?.data) {
          return res.data.data;
        }
        throw new Error('Invalid response');
      } catch (err) {
        console.warn('API fetch failed, utilizing featured showcase projects:', err.message);
        return fallbackProjects.filter(p => p.featured).slice(0, 3);
      }
    },
  });
}
