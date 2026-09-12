/**
 * Auth Context for Trident Admin Panel
 * 
 * Authenticates via the trident-backend POST /admin/login endpoint.
 * Stores JWT token in localStorage for subsequent admin API calls.
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { apiRequest, setToken, clearToken, getToken } from '../services/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    // Check if we have a valid token stored
    return !!getToken();
  });

  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('trident_admin_info');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Login — calls POST /admin/login on the backend, stores JWT token.
   */
  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: { username, password },
      });

      if (data?.success && data?.token) {
        // Store JWT token
        setToken(data.token);

        // Store admin info
        const adminInfo = data.user || { username, name: 'Trident Admin', role: 'admin' };
        localStorage.setItem('trident_admin_info', JSON.stringify(adminInfo));

        setIsAdminLoggedIn(true);
        setAdmin(adminInfo);
        setLoading(false);
        return { success: true };
      } else {
        setError('Login failed — unexpected response');
        setLoading(false);
        return { success: false, error: 'Login failed' };
      }
    } catch (err) {
      const message = err.status === 401 ? 'Invalid credentials' : (err.message || 'Login failed');
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  }, []);

  /**
   * Logout — clears JWT token and login state.
   */
  const logout = useCallback(() => {
    clearToken();
    localStorage.removeItem('trident_admin_info');
    setIsAdminLoggedIn(false);
    setAdmin(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAdminLoggedIn,
      admin,
      loading,
      error,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}

export default AuthContext;
