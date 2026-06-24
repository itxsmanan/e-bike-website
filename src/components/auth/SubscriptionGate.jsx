/**
 * SubscriptionGate.jsx
 * ──────────────────────────────────────────────────────────
 * Paywall screen shown when a user is logged in but has
 * NOT yet subscribed. Replaces the main app content.
 *
 * SWAP-OUT GUIDE:
 *   • The "Subscribe Now" button calls `subscribe()` from AuthContext.
 *   • To wire in real payment, replace the `subscribe()` call with your
 *     payment intent creation flow (e.g. Stripe, JazzCash API).
 *   • After successful payment confirmation, call `subscribe()` to unlock.
 * ──────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';

import { FiCheck, FiZap, FiBook, FiHeadphones, FiStar, FiX } from 'react-icons/fi';
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
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Feature Row ────────────────────────────────────────────────────────────

function FeatureRow({ icon: Icon, text }) {
  return (
    <li className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-dim)' }}>
      <span
        className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: 'rgba(201,169,98,0.12)', color: 'var(--gold)' }}
      >
        <Icon size={13} />
      </span>
      {text}
    </li>
  );
}

// ── UserAvatar (mini) ──────────────────────────────────────────────────────

function UserChip({ user }) {
  return (
    <div className="sub-gate-user-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-6">
      {user?.avatar ? (
        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
      ) : (
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: 'var(--gold)', color: '#0C1035' }}
        >
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </span>
      )}
      <span>Signed in as <strong style={{ color: 'var(--text)' }}>{user?.name}</strong></span>
    </div>
  );
}

// ── SubscriptionGate (main export) ────────────────────────────────────────

export default function SubscriptionGate() {
  const { user, subscribe, logout, closeSubGate } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lock body scroll while gate is open — prevents double scrollbar
  useEffect(() => {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await subscribe('premium');
      setSuccess(true);
      // AuthContext sets isSubscribed = true & closes gate automatically
    } catch {
      /* handle payment error here in future */
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Overlay: fixed, no overflow — body scroll locked via modal-open class.
       The card itself scrolls internally — no double scrollbar. */
    <div
      id="subscription-gate"
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) closeSubGate(); }}
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(ellipse, var(--gold) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gate card — scrolls internally so only one scrollbar ever appears */}
      <div
        id="subscription-gate-card"
        className="modal-content relative w-full max-w-lg"
        style={{
          maxHeight: 'calc(100vh - 2rem)',
        }}
      >
        {/* Gold top accent */}
        <div className="h-1 w-full rounded-t-2xl" style={{ background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-bright), var(--gold-dim))' }} />

        {/* Close Button */}
        <button
          id="sub-gate-close-btn"
          type="button"
          onClick={closeSubGate}
          aria-label="Close"
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
          style={{ color: 'var(--text)', background: 'var(--border)', zIndex: 10 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,169,98,0.2)'; e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
        >
          <FiX size={16} />
        </button>

        <div className="p-8 md:p-10">
          {/* Logo + heading */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src="/logo.png"
              alt="Kitabon Ki Dolat"
              className="h-14 w-auto object-contain mb-4"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(201,169,98,0.4))' }}
            />

            <UserChip user={user} />

            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
            >
              Unlock Premium Access
            </h2>
            <p className="text-sm max-w-sm" style={{ color: 'var(--text-dim)' }}>
              You're one step away from Pakistan's largest digital library of books, audiobooks, and exclusive author events.
            </p>
          </div>

          {/* Plan card */}
          <div
            className="rounded-xl p-6 mb-6"
            style={{
              background: 'rgba(201,169,98,0.05)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Plan header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="sub-gate-plan-badge text-xs font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Half-Yearly Plan</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Save 20% — Rs. 400/month</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black" style={{ color: 'var(--gold-bright)' }}>Rs. 2,399</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>/6 months</div>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5">
              <FeatureRow icon={FiBook}       text="Full E-Library access — thousands of titles" />
              <FeatureRow icon={FiHeadphones} text="Unlimited audiobook streaming" />
              <FeatureRow icon={FiStar}       text="1 signed paperback included free" />
              <FeatureRow icon={FiCheck}      text="Private reader community access" />
              <FeatureRow icon={FiZap}        text="Early access to new releases" />
            </ul>
          </div>

          {/* CTA */}
          {success ? (
            <div
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-sm"
              style={{ background: 'rgba(34,211,238,0.1)', color: 'var(--cyan)', border: '1px solid rgba(34,211,238,0.2)' }}
            >
              <FiCheck size={18} /> Subscription activated! Loading your library…
            </div>
          ) : (
            <button
              id="subscribe-now-btn"
              type="button"
              disabled={loading}
              onClick={handleSubscribe}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: loading
                  ? 'rgba(201,169,98,0.5)'
                  : 'linear-gradient(135deg, var(--gold), var(--gold-bright))',
                color: '#0C1035',
                boxShadow: loading ? 'none' : '0 6px 24px rgba(201,169,98,0.4)',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {loading ? (
                <><Spinner /> Activating subscription…</>
              ) : (
                <><FiZap size={16} /> Subscribe Now — Rs. 2,399</>
              )}
            </button>
          )}

          {/* Other plans link */}
          <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            Want a different plan?{' '}
            <a
              href="/#subscriptions"
              className="font-semibold hover:underline"
              style={{ color: 'var(--gold)' }}
              onClick={(e) => {
                closeSubGate();
                const el = document.getElementById('subscriptions');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View all plans
            </a>
          </p>

          {/* Divider */}
          <div className="my-5 h-px" style={{ background: 'var(--border)' }} />

          {/* Sign out option */}
          <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            Not {user?.name?.split(' ')[0] ?? 'you'}?{' '}
            <button
              id="gate-logout-btn"
              type="button"
              onClick={logout}
              className="font-medium hover:underline transition-colors"
              style={{ color: 'var(--text-dim)' }}
            >
              Sign out
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
