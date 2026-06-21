import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const logoUrdu = '\u06a9\u062a\u0627\u0628\u0648\u06ba \u06a9\u06cc \u062f\u0648\u0644\u062a';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
                <div className="logo-container" style={{ cursor: 'pointer' }} onClick={(e) => handleNavClick(e, 'home')}>
                    <div className="logo-emblem" aria-hidden="true">
                        <svg viewBox="0 0 64 64" role="img">
                            <circle cx="32" cy="32" r="30" />
                            <path d="M40.8 14.2c-9.7 4.8-16 12.1-16.6 21.8-.4 7.2 4.7 11.7 12.5 11.7 4.8 0 8.9-1.2 12.6-3.4-3.6 6.1-10.1 10.1-18.6 10.1-11.3 0-19.2-7.1-18.6-17.9.6-11.5 9.1-20.6 22.5-25.2l6.2 2.9Z" />
                            <path d="M39.1 15.7c2.3 5.3 2.4 10.1.1 14.4 5.2-2.1 8.6-6.1 10.1-12.2l-10.2-2.2Z" />
                        </svg>
                    </div>
                    <div className="logo-wordmark">
                        <div className="logo-urdu" lang="ur" dir="rtl">{logoUrdu}</div>
                        <div className="logo-english">KITABON KI DOLAT</div>
                    </div>
                </div>

                <ul className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
                    <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
                    <li><a href="#books" onClick={(e) => handleNavClick(e, 'books')}>Books</a></li>
                    <li><a href="#audiobooks" onClick={(e) => handleNavClick(e, 'audiobooks')}>Audio Books</a></li>
                    <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')}>Celebrity Events</a></li>
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
                    <li><a href="#subscriptions" className="btn-primary" onClick={(e) => handleNavClick(e, 'subscriptions')}>Subscribe</a></li>
                </ul>

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
        </nav>
    );
}
