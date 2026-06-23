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
                <div className="logo-container nav-logo-container" style={{ cursor: 'pointer' }} onClick={(e) => handleNavClick(e, 'home')}>
                    <img src="/logo.png" alt="Kitabon Ki Dolat" className="nav-logo-img" />
                </div>

                <ul className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
                    <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
                    <li><a href="#books" onClick={(e) => handleNavClick(e, 'books')}>Books</a></li>
                    <li><a href="#audiobooks" onClick={(e) => handleNavClick(e, 'audiobooks')}>Audio Books</a></li>
                    <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')}>Celebrity Events</a></li>
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
                    <li><a href="#subscriptions" className="btn-primary" onClick={(e) => handleNavClick(e, 'subscriptions')}>Subscribe</a></li>
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
