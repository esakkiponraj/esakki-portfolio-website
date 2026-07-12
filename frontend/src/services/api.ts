import axios from 'axios';

// Points to the backend API (see /backend). Set VITE_API_URL in a
// .env file when you deploy the backend, e.g.:
// VITE_API_URL=https://your-backend.onrender.com/api
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

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
