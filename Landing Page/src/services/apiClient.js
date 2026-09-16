/**
 * API Client for Trident Backend
 * 
 * Thin fetch() wrapper that:
 * - Sets JSON headers
 * - Attaches JWT Bearer token for admin endpoints
 * - Handles errors consistently
 */

import { API_BASE_URL } from '../config/api';

const TOKEN_KEY = 'trident_admin_token';

/**
 * Get the stored JWT token. Checks expiration (exp claim) if present.
 */
export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const payloadStr = atob(token.split('.')[1]);
    const payload = JSON.parse(payloadStr);
    
    // JWT exp is in seconds, Date.now() is in milliseconds
    if (payload.exp && (payload.exp * 1000 < Date.now())) {
      console.warn('[apiClient] JWT token expired, clearing.');
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  } catch (err) {
    // Invalid token format
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }

  return token;
}

/**
 * Store a JWT token.
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Clear the stored JWT token.
 */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Make an API request to the trident-backend.
 * 
 * @param {string} path - API path (e.g., '/notices', '/admin/login')
 * @param {object} options - { method, body, auth }
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiRequest(path, { method = 'GET', body = null, auth = false } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, config);

  // Parse response
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    // If token is expired/invalid, auto-logout and redirect to login
    if (response.status === 401 && auth) {
      console.warn('[API Client] Token expired or invalid — redirecting to login');
      clearToken();
      // Only redirect if we're not already on the login page
      if (window.location.pathname !== '/admin') {
        window.location.href = '/admin';
      }
    }

    const errorMessage = data?.message || `API Error: ${response.status} ${response.statusText}`;
    const err = new Error(errorMessage);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}
