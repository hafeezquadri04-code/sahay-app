import axios from 'axios';
import { API_URL } from '../config/env';

const api = axios.create({
  baseURL: API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage if present
api.interceptors.request.use((config) => {
  try {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem('sahay_current_user');
      if (raw) {
        const user = JSON.parse(raw);
        const token = user?.token || user?.accessToken;
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
});

function normalizeError(error) {
  return {
    message: error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Request failed',
    status: error?.response?.status || null,
    data: error?.response?.data || null,
  };
}

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(normalizeError(err))
);

export function setAuthUser(user) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('sahay_current_user', JSON.stringify(user));
  } catch (e) {
    // ignore
  }
}

export function clearAuthUser() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('sahay_current_user');
  } catch (e) {
    // ignore
  }
}

export default api;
