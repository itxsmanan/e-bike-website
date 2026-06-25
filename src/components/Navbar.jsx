import { useState, useEffect, useRef } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';


const logoUrdu = '\u06a9\u062a\u0627\u0628\u0648\u06ba \u06a9\u06cc \u062f\u0648\u0644\u062a';

// ── UserMenu ──────────────────────────────────────────────────────────────────
// Displayed in the Navbar when the user is authenticated.
function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <div ref={menuRef} className="relative" style={{ zIndex: 200 }}>
      <button
        id="user-avatar-btn"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-full transition-all duration-200"
        style={{ outline: 'none' }}
      >
        {/* Avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: '2px solid var(--gold)', boxShadow: '0 0 0 2px rgba(201,169,98,0.2)' }}
          />
        ) : (
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold select-none"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))', color: '#0C1035', border: '2px solid var(--gold)' }}
          >
            {initials}
          </span>
        )}
        {/* Name — hidden on small screens */}
        <span
          className="hidden sm:block text-sm font-medium max-w-[100px] truncate"
          style={{ color: 'var(--text)' }}
        >
          {user?.name?.split(' ')[0]}
        </span>
        {/* Chevron */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          id="user-dropdown"
          className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(19,24,64,0.98) 0%, rgba(12,16,53,0.98) 100%)',
            border: '1px solid rgba(201,169,98,0.2)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,169,98,0.1)',
            animation: 'authFadeIn 0.18s ease both',
          }}
          role="menu"
        >
          {/* Profile info */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(201,169,98,0.1)' }}>
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{user?.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
            <span
              className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(34,211,238,0.1)', color: 'var(--cyan)', border: '1px solid rgba(34,211,238,0.2)' }}
            >
              ✦ Premium
            </span>
          </div>

          {/* Actions */}
          <div className="py-1">
            <button
              id="navbar-logout-btn"
              type="button"
              onClick={() => { setOpen(false); onLogout(); }}
              role="menuitem"
              className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,169,98,0.06)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-dim)'; }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes authFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoggedIn, isSubscribed, logout, openAuthModal } = useAuth();
    const { readingCount } = useLibrary();

    const [theme, setTheme] = useState(
        () => localStorage.getItem('kitabon_theme') || 'light'
    );

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.body.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
            document.body.classList.remove('light-theme');
        }
        localStorage.setItem('kitabon_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        setMenuOpen(false);

        if (location.pathname !== '/' && !location.pathname.startsWith('/book/') && !location.pathname.startsWith('/event/') && !location.pathname.startsWith('/payment/')) {
            navigate('/', { state: { scrollTo: targetId } });
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                navigate('/');
                setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    };

    return (
        <nav className="nav" aria-label="Primary navigation">
            <div className="nav-container">
                <div className="logo-container nav-logo-container" style={{ cursor: 'pointer' }} onClick={(e) => handleNavClick(e, 'home')}>
                    <img src="/logo.png" alt="Kitabon Ki Dolat" className="nav-logo-img" />
                </div>

                <ul className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
                    <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
                    <li><a href="#books" onClick={(e) => handleNavClick(e, 'books')}>Books</a></li>
                    <li><a href="#audiobooks" onClick={(e) => handleNavClick(e, 'audiobooks')}>Audio Books</a></li>
                    <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')}>Celebrity Events</a></li>
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
                    {isLoggedIn && isSubscribed && (
                        <li>
                            <a
                                href="/library"
                                id="nav-library-link"
                                onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigate('/library'); }}
                                className="relative"
                                style={{ color: 'var(--gold)' }}
                            >
                                My Library
                            </a>
                        </li>
                    )}
                    {!isSubscribed && (
                        <li>
                            <a
                                href="#subscriptions"
                                className="btn-primary"
                                onClick={(e) => {
                                    if (!isLoggedIn) {
                                        e.preventDefault();
                                        setMenuOpen(false);
                                        openAuthModal();
                                        return;
                                    }
                                    handleNavClick(e, 'subscriptions');
                                }}
                            >
                                Subscribe
                            </a>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li className="sm:hidden">
                            <a
                                href="#signin"
                                id="mobile-menu-signin-btn"
                                onClick={(e) => { e.preventDefault(); setMenuOpen(false); openAuthModal(); }}
                                style={{ color: 'var(--gold)' }}
                            >
                                Sign In
                            </a>
                        </li>
                    )}
                </ul>

                <div className="nav-actions">
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle-btn"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        type="button"
                    >
                        {theme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        )}
                    </button>

                    {/* Auth — shows user avatar when logged in, else a Sign In button */}
                    {isLoggedIn ? (
                        <UserMenu user={user} onLogout={logout} />
                    ) : (
                        <button
                            id="navbar-signin-btn"
                            type="button"
                            onClick={openAuthModal}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: 'linear-gradient(135deg, rgba(201,169,98,0.15), rgba(201,169,98,0.08))',
                                color: 'var(--gold)',
                                border: '1px solid rgba(201,169,98,0.3)',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,169,98,0.22)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,169,98,0.15), rgba(201,169,98,0.08))'; }}
                        >
                            Sign In
                        </button>
                    )}

                    <button
                        className="nav-toggle"
                        type="button"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
        </nav>
    );
}
