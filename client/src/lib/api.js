import axios from 'axios';

let apiBase = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '/api';
if (apiBase !== '/api' && !apiBase.endsWith('/api')) {
  apiBase = `${apiBase.replace(/\/+$/, '')}/api`;
}

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorPayload = {
      status: error.response?.status || 500,
      code: error.response?.data?.error?.code || 'NETWORK_ERROR',
      message: error.response?.data?.error?.message || error.message || 'An unexpected error occurred',
      details: error.response?.data?.error?.details || null,
    };
    return Promise.reject(errorPayload);
  }
);

export default api;
