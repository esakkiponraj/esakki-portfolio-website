import { api } from './api';

// Thin wrappers around the public (no-auth) read endpoints.
// Each one throws on failure — the caller (PortfolioDataContext)
// decides how to fall back gracefully.

export async function fetchProfile() {
  const { data } = await api.get('/profile');
  return data.data;
}

export async function fetchContactInfo() {
  const { data } = await api.get('/contact-info');
  return data.data;
}

export async function fetchProjects() {
  const { data } = await api.get('/projects');
  return data.data;
}

export async function fetchSkills() {
  const { data } = await api.get('/skills');
  return data.data;
}

export async function fetchEducation() {
  const { data } = await api.get('/education');
  return data.data;
}

export async function fetchExperience() {
  const { data } = await api.get('/experience');
  return data.data;
}

export async function fetchAchievements() {
  const { data } = await api.get('/achievements');
  return data.data;
}

export async function fetchCertificates() {
  const { data } = await api.get('/certificates');
  return data.data;
}

export async function fetchSocialLinks() {
  const { data } = await api.get('/social-links');
  return data.data;
}
