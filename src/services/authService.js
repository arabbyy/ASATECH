/**
 * Authentication service.
 *
 * Handles user authentication via the backend API.
 * Tokens are stored in localStorage for session persistence.
 */
import { client } from "./client";
import { isApiConfigured } from "./config";

const TOKEN_KEY = "asatech-token";
const USER_KEY = "asatech-user";

/**
 * Store authentication session.
 * @param {string|null} token - JWT token
 * @param {object|null} user - User object
 */
export function setSession(token, user) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

/**
 * Get stored user from localStorage.
 * @returns {object|null} User object or null
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Get stored auth token.
 * @returns {string|null} Token or null
 */
export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

/**
 * Authenticate user with email and password.
 * @param {object} credentials - { email, password }
 * @returns {Promise<{token: string, user: object}>}
 */
export async function login({ email, password }) {
  const response = await client.post("/auth/login", { email, password });
  if (response.token && response.user) {
    setSession(response.token, response.user);
  }
  return response;
}

/**
 * Register a new user account.
 * @param {object} data - { name, email, password }
 * @returns {Promise<{token: string, user: object}>}
 */
export async function register({ name, email, password }) {
  const response = await client.post("/auth/register", { name, email, password });
  if (response.token && response.user) {
    setSession(response.token, response.user);
  }
  return response;
}

/**
 * Request password reset email.
 * @param {string} email - User email
 * @returns {Promise<{ok: boolean}>}
 */
export async function requestPasswordReset(email) {
  return client.post("/auth/password/reset-request", { email });
}

/**
 * Reset password with token.
 * @param {object} data - { token, password }
 * @returns {Promise<{ok: boolean}>}
 */
export async function resetPassword({ token, password }) {
  return client.post("/auth/password/reset", { token, password });
}

/**
 * Logout user (clear local session).
 * Backend session revocation handled server-side.
 * @returns {Promise<{ok: boolean}>}
 */
export async function logout() {
  // Optionally notify backend: await client.post("/auth/logout");
  setSession(null, null);
  return { ok: true };
}

/**
 * Get current authenticated user.
 * @returns {object|null} User object or null
 */
export function getCurrentUser() {
  return getStoredUser();
}
