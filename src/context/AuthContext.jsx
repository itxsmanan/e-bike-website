/**
 * AuthContext.jsx
 * ──────────────────────────────────────────────────────────
 * Frontend-only authentication simulation using React Context.
 *
 * SWAP-OUT GUIDE (when backend is ready):
 *   • Replace the `await mockDelay()` calls with real `fetch`/`axios` calls.
 *   • Replace `setUser(MOCK_GOOGLE_USER)` with the API response payload.
 *   • Add error handling (try/catch) around each service call.
 *   • The component API (login, signup, loginWithGoogle, subscribe, logout)
 *     remains identical — no consumer components need to change.
 * ──────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, useCallback } from 'react';

// ── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_GOOGLE_USER = {
  name: 'Alex Developer',
  email: 'alex@example.com',
  // DiceBear avatar — replace with real OAuth photo URL later
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
};

/** Simulates a network round-trip (1 second). Remove when using real API. */
const mockDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [authError, setAuthError] = useState(null);

  // ── Modal visibility ────────────────────────────────────────────────────────
  // Controls whether the AuthModal overlay is shown. Any component can call
  // openAuthModal() to trigger sign-in without blocking the home page.
  const [showAuthModal, setShowAuthModal] = useState(false);
  const openAuthModal  = useCallback(() => setShowAuthModal(true),  []);
  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setAuthError(null);
  }, []);

  // ── Subscription gate visibility ────────────────────────────────────────────
  // Show the subscription gate only when the user explicitly tries to access
  // a gated action while logged in but not yet subscribed.
  const [showSubGate, setShowSubGate] = useState(false);
  const openSubGate  = useCallback(() => setShowSubGate(true),  []);
  const closeSubGate = useCallback(() => setShowSubGate(false), []);

  // ── Mock Auth Actions ───────────────────────────────────────────────────────

  /**
   * Sign in with email + password.
   * SWAP: Replace body with `await authService.login(email, password)` and
   *       set `user` from the response object.
   */
  const login = useCallback(async (email, _password) => {
    setAuthError(null);
    await mockDelay();
    setUser({ name: email.split('@')[0], email, avatar: null });
    setIsLoggedIn(true);
    setShowAuthModal(false); // auto-close on success
  }, []);

  /**
   * Register a new account.
   * SWAP: Replace body with `await authService.register(name, email, password)`.
   */
  const signup = useCallback(async (name, email, _password) => {
    setAuthError(null);
    await mockDelay();
    setUser({ name, email, avatar: null });
    setIsLoggedIn(true);
    setShowAuthModal(false); // auto-close on success
  }, []);

  /**
   * OAuth — Continue with Google.
   * SWAP: Replace body with real Google OAuth flow (e.g., Firebase, Auth0, etc.)
   *       and set `user` from the OAuth response profile.
   */
  const loginWithGoogle = useCallback(async () => {
    setAuthError(null);
    await mockDelay();
    setUser(MOCK_GOOGLE_USER);
    setIsLoggedIn(true);
    setShowAuthModal(false); // auto-close on success
  }, []);

  /**
   * Activate a subscription plan.
   * SWAP: Replace body with `await billingService.subscribe(planId)`.
   * @param {string} [planId] - Plan identifier (unused in mock, ready for API)
   */
  const subscribe = useCallback(async (_planId = 'premium') => {
    await mockDelay(800);
    setIsSubscribed(true);
    setShowSubGate(false); // dismiss gate after subscribing
  }, []);

  /**
   * Sign out and reset all state.
   * SWAP: Add `await authService.logout()` before clearing state.
   */
  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setIsSubscribed(false);
    setAuthError(null);
    setShowSubGate(false);
  }, []);

  // ── Context Value ───────────────────────────────────────────────────────────

  const value = {
    // State
    user,
    isLoggedIn,
    isSubscribed,
    authError,
    showAuthModal,
    showSubGate,
    // Actions
    login,
    signup,
    loginWithGoogle,
    subscribe,
    logout,
    setAuthError,
    openAuthModal,
    closeAuthModal,
    openSubGate,
    closeSubGate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useAuth — consume auth state & actions from any component.
 *
 * @example
 *   const { user, isLoggedIn, logout } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
