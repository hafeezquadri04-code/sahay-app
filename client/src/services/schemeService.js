import api from './api';

export const schemeApi = api;

const categoryDescriptions = {
  Scholarship: 'Financial support for students, fees, and continued education.',
  Health: 'Coverage and protection against major medical expenses.',
  Skills: 'Training and certification pathways for employability and growth.',
  Livelihood: 'Entrepreneurship and income-generation support programs.',
  'Disability Support': 'Programs tailored for accessibility, health, and inclusive support.',
};

function scoreSchemeForProfile(scheme, profile) {
  if (!profile) return 0;

  let score = 0;
  const annualIncome = Number(profile.annualIncome || 0);
  const recommendation = scheme.recommendedFor || {};

  if (recommendation.occupation?.length && recommendation.occupation.includes(profile.occupation)) {
    score += 3;
  }
  if (recommendation.education?.length && recommendation.education.includes(profile.education)) {
    score += 2;
  }
  if (recommendation.gender?.length && recommendation.gender.includes(profile.gender)) {
    score += 2;
  }
  if (recommendation.category?.length && recommendation.category.includes(profile.category)) {
    score += 3;
  }
  if (recommendation.disabilityStatus && recommendation.disabilityStatus === profile.disabilityStatus) {
    score += 4;
  }
  if (recommendation.maxIncome && annualIncome && annualIncome <= recommendation.maxIncome) {
    score += 2;
  }
  if (profile.state) {
    score += 1;
  }

  return score;
}

export async function getSchemes(filters = {}) {
  try {
    const res = await api.get('/schemes', { params: filters });
    const data = res.data;
    // Backend returns { schemes: [...] }
    const schemes = Array.isArray(data) ? data : (data?.schemes || []);
    return schemes;
  } catch (err) {
    throw new Error(err?.message || 'Failed to load schemes');
  }
}

export async function getSchemeById(id) {
  try {
    const res = await api.get(`/schemes/${id}`);
    return res.data || null;
  } catch (err) {
    if (err?.status === 404) return null;
    throw new Error(err?.message || 'Failed to load scheme');
  }
}

export async function getSchemeCategories() {
  try {
    const res = await api.get('/schemes');
    const data = res.data;
    const schemes = Array.isArray(data) ? data : (data?.schemes || []);
    return ['All', ...new Set(schemes.map((s) => s.category))];
  } catch (err) {
    throw new Error(err?.message || 'Failed to load categories');
  }
}

export async function getFeaturedSchemeCategories() {
  try {
    const res = await api.get('/schemes');
    const data = res.data;
    const schemes = Array.isArray(data) ? data : (data?.schemes || []);
    return Object.entries(
      schemes.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
      }, {})
    )
      .map(([name, count]) => ({
        name,
        count,
        description: categoryDescriptions[name] || 'Support schemes available in this category.',
      }))
      .slice(0, 4);
  } catch (err) {
    throw new Error(err?.message || 'Failed to load featured categories');
  }
}

export async function getRecommendedSchemes(profile) {
  try {
    const res = await api.get('/schemes');
    const data = res.data;
    const schemes = Array.isArray(data) ? data : (data?.schemes || []);
    const ranked = [...schemes].sort(
      (a, b) => scoreSchemeForProfile(b, profile) - scoreSchemeForProfile(a, profile)
    );
    return ranked.slice(0, 3);
  } catch (err) {
    throw new Error(err?.message || 'Failed to load recommendations');
  }
}
