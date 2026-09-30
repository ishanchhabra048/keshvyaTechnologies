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
  (response) => {
    // If we received an HTML response when expecting JSON (e.g. Vercel SPA rewrite fallback for /api)
    if (
      typeof response.data === 'string' &&
      (response.data.trim().startsWith('<!DOCTYPE html>') ||
        response.data.trim().startsWith('<!doctype html>') ||
        response.data.trim().startsWith('<html'))
    ) {
      const error = new Error('API returned HTML instead of JSON. Backend service may be unreachable or misconfigured.');
      error.response = {
        status: 502,
        data: {
          error: {
            code: 'BAD_GATEWAY',
            message: 'Backend API service is currently unavailable or waking up.',
          },
        },
      };
      return Promise.reject(error);
    }
    return response;
  },
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
