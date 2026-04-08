import { createContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authService';
import {
  calculateProfileCompletion,
  clearUserProfile,
  getUserProfile,
  saveUserProfile,
} from '../services/userService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrateAuthState() {
      try {
        const [savedUser, savedProfile] = await Promise.all([
          getCurrentUser(),
          getUserProfile(),
        ]);

        if (isMounted) {
          setUser(savedUser);
          setProfile(savedProfile);
        }
      } catch (err) {
        // keep a resilient client: log and continue with empty state
        // eslint-disable-next-line no-console
        console.error('Failed to hydrate auth state', err);
        if (isMounted) {
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    hydrateAuthState();

    return () => {
      isMounted = false;
    };
  }, []);

  async function login(credentials) {
    const response = await loginUser(credentials);
    setUser(response.user);
    return response;
  }

  async function register(payload) {
    const response = await registerUser(payload);
    setUser(response.user);
    return response;
  }

  async function logout() {
    await logoutUser();
    setUser(null);
    setProfile(null); // clear profile on logout
    clearUserProfile(); // remove profile from localStorage
  }

  async function saveProfile(profilePayload) {
    const savedProfile = await saveUserProfile(profilePayload);
    setProfile(savedProfile);
    return savedProfile;
  }

  async function refreshProfile() {
    const nextProfile = await getUserProfile();
    setProfile(nextProfile);
    return nextProfile;
  }

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: Boolean(user),
    profileCompletion: calculateProfileCompletion(profile),
    login,
    register,
    logout,
    saveProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
