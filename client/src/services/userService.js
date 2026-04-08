import api from './api';

export const userApi = api;

const PROFILE_STORAGE_KEY = 'sahay_user_profile';

export const defaultProfileValues = {
  fullName: '',
  age: '',
  gender: '',
  state: '',
  district: '',
  education: '',
  occupation: '',
  annualIncome: '',
  category: '',
  disabilityStatus: '',
};

function readProfile() {
  if (typeof window === 'undefined') return null;
  try {
    const rawValue = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return rawValue ? { ...defaultProfileValues, ...JSON.parse(rawValue) } : null;
  } catch {
    return null;
  }
}

function writeProfile(profile) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

// Clear profile from localStorage
export function clearUserProfile() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
}

export const calculateProfileCompletion = (profileData) => {
  if (!profileData) return 0;
  const requiredFields = [
    'fullName',
    'age',
    'gender',
    'state',
    'district',
    'education',
    'occupation',
    'annualIncome',
    'category',
    'disabilityStatus',
  ];

  const filled = requiredFields.filter((field) => String(profileData[field] || '').trim() !== '');
  const calculated = Math.round((filled.length / requiredFields.length) * 100);
  return Math.min(100, calculated);
};

export async function getUserProfile() {
  try {
    const res = await api.get('/users/profile');
    const data = res.data;
    const profile = data?.profile || data || null;
    if (profile) writeProfile(profile);
    return profile;
  } catch (err) {
    // If not authenticated yet, return cached profile
    const cached = readProfile();
    if (cached) return cached;
    // If 401, return null silently (not logged in)
    if (err?.status === 401) return null;
    throw new Error(err?.message || 'Failed to load profile');
  }
}

export async function saveUserProfile(profile) {
  const nextProfile = {
    ...defaultProfileValues,
    ...profile,
  };

  try {
    const res = await api.post('/users/profile', nextProfile);
    const data = res.data;
    const saved = data?.profile || data || nextProfile;
    writeProfile(saved);
    return saved;
  } catch (err) {
    throw new Error(err?.message || 'Failed to save profile');
  }
}
