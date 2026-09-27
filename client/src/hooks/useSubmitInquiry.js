import { useMutation } from '@tanstack/react-query';
import api from '../lib/api.js';

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/inquiries', data);
      return res.data;
    },
  });
}
