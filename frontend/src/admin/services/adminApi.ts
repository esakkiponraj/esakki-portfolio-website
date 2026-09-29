import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const adminApi = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attaches the admin JWT to every request automatically.
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, bounce back to the login screen.
// On successful mutations (POST, PUT, PATCH, DELETE), automatically invalidate public cache!
adminApi.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      try {
        localStorage.removeItem('portfolio_cms_cache_v2');
        // Clear sessionStorage resource caches as well
        for (let i = 0; i < sessionStorage.length; i++) {
          const k = sessionStorage.key(i);
          if (k && k.startsWith('cms_res_')) {
            sessionStorage.removeItem(k);
          }
        }
        window.dispatchEvent(new Event('cms_content_updated'));
      } catch {
        // ignore
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_admin_token');
      localStorage.removeItem('portfolio_admin_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await adminApi.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
}
