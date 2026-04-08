import api, { setAuthUser, clearAuthUser } from './api';

export const authApi = api;

const AUTH_STORAGE_KEY = 'sahay_current_user';

function readFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function writeToStorage(user) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function removeFromStorage() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function loginUser(credentials) {
  const { email, password } = credentials;
  if (!email || !password) throw new Error('Email and password are required.');

  try {
    const res = await api.post('/auth/login', { email, password });
    const data = res.data; // { user, token, message }
    const user = {
      ...data.user,
      token: data.token,
    };
    writeToStorage(user);
    setAuthUser(user);
    return { user, message: data.message || 'Signed in successfully.' };
  } catch (err) {
    throw new Error(err?.message || 'Login failed');
  }
}

export async function registerUser(payload) {
  const { name, email, password } = payload;
  if (!name || !email || !password) throw new Error('Name, email, and password are required.');

  try {
    const res = await api.post('/auth/register', { name, email, password });
    const data = res.data; // { user, token, message }
    const user = {
      ...data.user,
      token: data.token,
    };
    writeToStorage(user);
    setAuthUser(user);
    return { user, message: data.message || 'Account created.' };
  } catch (err) {
    throw new Error(err?.message || 'Registration failed');
  }
}

export async function getCurrentUser() {
  return readFromStorage();
}

export async function logoutUser() {
  clearAuthUser();
  removeFromStorage();
  return true;
}
