/**
 * AuthModal.jsx
 * ──────────────────────────────────────────────────────────
 * Full-screen auth overlay with Sign In / Sign Up tabs and
 * a "Continue with Google" OAuth button.
 *
 * Uses the existing design tokens (--midnight, --gold, --accent, etc.)
 * and Tailwind v4 utilities.
 * ──────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';

import { FcGoogle } from 'react-icons/fc';
import {
  FiMail, FiLock, FiUser, FiEye, FiEyeOff,
  FiArrowRight,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// ── Spinner ────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ── Input Field ────────────────────────────────────────────────────────────

function AuthInput({ id, label, type = 'text', icon: Icon, value, onChange, placeholder, required, rightElement }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium" style={{ color: 'var(--text-dim)' }}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
            <Icon size={16} />
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border text-sm outline-none transition-all duration-200 py-3 focus:border-[var(--gold)] focus:ring-2 focus:ring-[rgba(201,169,98,0.2)]"
          style={{
            background: 'var(--navy)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
            paddingLeft: Icon ? '2.5rem' : '1rem',
            paddingRight: rightElement ? '3rem' : '1rem',
          }}
        />
        {rightElement && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Sign In Form ───────────────────────────────────────────────────────────

function SignInForm({ onSuccess }) {
  const { login, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setAuthError(err.message || 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const eyeButton = (
    <button
      type="button"
      onClick={() => setShowPw((v) => !v)}
      className="transition-colors"
      style={{ color: 'var(--text-muted)' }}
      aria-label={showPw ? 'Hide password' : 'Show password'}
    >
      {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
    </button>
  );

  return (
    <form id="signin-form" onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <AuthInput
        id="signin-email"
        label="Email Address"
        type="email"
        icon={FiMail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
      />
      <AuthInput
        id="signin-password"
        label="Password"
        type={showPw ? 'text' : 'password'}
        icon={FiLock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        rightElement={eyeButton}
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="text-xs transition-colors hover:underline"
          style={{ color: 'var(--gold)' }}
        >
          Forgot password?
        </button>
      </div>

      {authError && (
        <p className="text-xs rounded-lg px-3 py-2" style={{ background: 'rgba(224,85,103,0.12)', color: '#E05567', border: '1px solid rgba(224,85,103,0.25)' }}>
          {authError}
        </p>
      )}

      <button
        id="signin-submit-btn"
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: loading ? 'rgba(201,169,98,0.6)' : 'linear-gradient(135deg, var(--gold), var(--gold-bright))',
          color: '#0C1035',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(201,169,98,0.35)',
        }}
      >
        {loading ? <><Spinner /> Signing in…</> : <><FiArrowRight size={16} /> Sign In</>}
      </button>
    </form>
  );
}

// ── Sign Up Form ───────────────────────────────────────────────────────────

function SignUpForm({ onSuccess }) {
  const { signup, authError, setAuthError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (password !== confirm) {
      setAuthError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      onSuccess?.();
    } catch (err) {
      setAuthError(err.message || 'Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const eyeButton = (
    <button
      type="button"
      onClick={() => setShowPw((v) => !v)}
      className="transition-colors"
      style={{ color: 'var(--text-muted)' }}
      aria-label={showPw ? 'Hide password' : 'Show password'}
    >
      {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
    </button>
  );

  return (
    <form id="signup-form" onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <AuthInput
        id="signup-name"
        label="Full Name"
        icon={FiUser}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Alex Developer"
        required
      />
      <AuthInput
        id="signup-email"
        label="Email Address"
        type="email"
        icon={FiMail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
      />
      <AuthInput
        id="signup-password"
        label="Password"
        type={showPw ? 'text' : 'password'}
        icon={FiLock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Min. 6 characters"
        required
        rightElement={eyeButton}
      />
      <AuthInput
        id="signup-confirm"
        label="Confirm Password"
        type={showPw ? 'text' : 'password'}
        icon={FiLock}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Repeat password"
        required
      />

      {authError && (
        <p className="text-xs rounded-lg px-3 py-2" style={{ background: 'rgba(224,85,103,0.12)', color: '#E05567', border: '1px solid rgba(224,85,103,0.25)' }}>
          {authError}
        </p>
      )}

      <button
        id="signup-submit-btn"
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: loading ? 'rgba(201,169,98,0.6)' : 'linear-gradient(135deg, var(--gold), var(--gold-bright))',
          color: '#0C1035',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(201,169,98,0.35)',
        }}
      >
        {loading ? <><Spinner /> Creating account…</> : <><FiArrowRight size={16} /> Create Account</>}
      </button>

      <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        By signing up, you agree to our{' '}
        <a href="/terms" className="hover:underline" style={{ color: 'var(--gold)' }}>Terms</a>
        {' & '}
        <a href="/privacy" className="hover:underline" style={{ color: 'var(--gold)' }}>Privacy Policy</a>.
      </p>
    </form>
  );
}

// ── AuthModal (main export) ────────────────────────────────────────────────

/**
 * AuthModal
 *
 * @param {'signin'|'signup'} [defaultTab] - Which tab to open first.
 */
export default function AuthModal({ defaultTab = 'signin' }) {
  const { loginWithGoogle, setAuthError, closeAuthModal } = useAuth();
  const [tab, setTab] = useState(defaultTab);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Lock body scroll while modal is open — prevents double scrollbar
  useEffect(() => {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleTabChange = (newTab) => {
    setAuthError(null);
    setTab(newTab);
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      // AuthContext sets isLoggedIn = true → App.jsx will unmount this modal
    } catch (err) {
      setAuthError(err.message || 'Google sign-in failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    /* Overlay: fixed, no overflow — body scroll is locked via modal-open class.
       The card itself scrolls internally so there's only ever ONE scrollbar. */
    <div
      id="auth-modal-overlay"
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) closeAuthModal(); }}
    >
      {/* Decorative background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
      </div>

      {/* Card — scrolls internally if content overflows on small screens */}
      <div
        id="auth-modal-card"
        className="modal-content relative w-full"
        style={{
          maxWidth: '448px',
          maxHeight: 'calc(100vh - 2rem)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Authentication"
      >
        {/* Gold top accent bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-bright), var(--gold-dim))' }} />

        <div className="p-8">
          {/* Close button */}
          <button
            id="auth-modal-close-btn"
            type="button"
            onClick={closeAuthModal}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{ color: 'var(--text)', background: 'var(--border)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,169,98,0.2)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Brand header — uses real logo.png */}
          <div className="flex flex-col items-center gap-1 mb-6">
            <img
              src="/logo.png"
              alt="Kitabon Ki Dolat"
              className="h-14 w-auto object-contain mb-1"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(201,169,98,0.4))' }}
            />
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Pakistan's Premium Digital Library
            </p>
          </div>

          {/* Google OAuth button */}
          <button
            id="google-login-btn"
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3 font-semibold text-sm transition-all duration-200 mb-5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#1f2937',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => { if (!googleLoading) e.currentTarget.style.background = 'rgba(255,255,255,1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; }}
          >
            {googleLoading ? (
              <><span className="text-gray-600"><Spinner /></span> Signing in with Google…</>
            ) : (
              <><FcGoogle size={20} /> Continue with Google</>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs font-medium px-1" style={{ color: 'var(--text-muted)' }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--navy)', border: '1px solid var(--border)' }}>
            {['signin', 'signup'].map((t) => (
              <button
                key={t}
                id={`tab-${t}-btn`}
                type="button"
                onClick={() => handleTabChange(t)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer"
                style={{
                  background: tab === t ? 'var(--slate)' : 'transparent',
                  color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
                  border: tab === t ? '1px solid var(--border)' : '1px solid transparent',
                  boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                }}
                aria-selected={tab === t}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form panel */}
          <div
            key={tab}
            style={{
              animation: 'authFadeIn 0.25s ease both',
            }}
          >
            {tab === 'signin'
              ? <SignInForm />
              : <SignUpForm />
            }
          </div>

          {/* Footer toggle link */}
          <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
            {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              id={tab === 'signin' ? 'goto-signup-btn' : 'goto-signin-btn'}
              type="button"
              onClick={() => handleTabChange(tab === 'signin' ? 'signup' : 'signin')}
              className="font-semibold hover:underline transition-colors"
              style={{ color: 'var(--gold)' }}
            >
              {tab === 'signin' ? 'Create one' : 'Sign in instead'}
            </button>
          </p>
        </div>
      </div>

      {/* Keyframe for tab transition */}
      <style>{`
        @keyframes authFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
