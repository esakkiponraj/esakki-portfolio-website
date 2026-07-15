import axios from 'axios';

// Points to the backend API (see /backend). Set VITE_API_URL in a
// .env file when you deploy the backend, e.g.:
// VITE_API_URL=https://your-backend.onrender.com/api
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
// Media URLs coming from the CMS are normally absolute Cloudinary URLs.
// If the backend's local-upload fallback is ever used instead, it returns
// a relative "/uploads/..." path, which 404s if used as-is on the frontend's
// own origin. This resolves it against the backend's origin so it always
// points at the server that actually has the file.
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

export function resolveMediaUrl(url?: string): string | undefined {
  if (!url) return url;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
}

<<<<<<< HEAD
=======
=======
>>>>>>> b88448106517b65e870144745704448afacf9667
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(payload: ContactPayload) {
  const { data } = await api.post('/contact', payload);
  return data;
}
