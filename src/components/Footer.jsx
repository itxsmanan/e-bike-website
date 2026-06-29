import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const socials = [
    { icon: <FaFacebookF />, label: 'Facebook', color: '#1877F2', href: 'https://www.facebook.com/share/18vdJmDF1i/' },
    { icon: <FaInstagram />, label: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/kitabonkidolat?igsh=cTV5amZrcmV4ZjNy' },
    { icon: <FaTiktok />, label: 'TikTok', color: '#000000', href: 'https://www.tiktok.com/@kitabon.ki.dolat?_r=1&_t=ZS-96fIBOm3b3V' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', color: '#25D366', href: 'https://wa.me/923410889909' },
];

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, openAuthModal } = useAuth();

    const handleScroll = (e, targetId) => {
        e.preventDefault();

        if (targetId === 'subscriptions' && !isLoggedIn) {
            openAuthModal();
            return;
        }

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: targetId } });
        } else {
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <footer className="footer-root">

            {/* ── Ambient background ── */}
            <div className="footer-bg" aria-hidden="true">
                <div className="footer-orb footer-orb-1" />
                <div className="footer-orb footer-orb-2" />
                <div className="footer-orb footer-orb-3" />
                <div className="footer-top-line" />
                <div className="footer-grid-lines" />
            </div>

            {/* ── Main grid ── */}
            <div className="footer-main">

                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo-wrap" onClick={() => navigate('/')} role="button" tabIndex={0}>
                        <img src="/logo.png" alt="Kitabon Ki Dolat" className="footer-logo-img" />
                    </div>
                    <p className="footer-tagline">
                        Pakistan's premier destination for quality literature — bridging readers with knowledge, culture, and stories that last a lifetime.
                    </p>
                    {/* Social Row */}
                    <div className="footer-socials">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                className="footer-social-btn"
                                style={{ '--social-color': s.color }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Explore */}
                <div className="footer-col">
                    <h5 className="footer-col-heading">Explore</h5>
                    <ul className="footer-links">
                        {[['#books','All Books'],['#audiobooks','Audiobooks'],['#events','Celebrity Events'],['#subscriptions','Subscriptions']].map(([id,label]) => (
                            <li key={id}>
                                <a href={id} onClick={(e) => handleScroll(e, id.slice(1))} className="footer-link">
                                    <span className="footer-link-arrow">→</span>{label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-col">
                    <h5 className="footer-col-heading">Support</h5>
                    <ul className="footer-links">
                        {[
                            ['/help','Help Center'],
                            ['/faqs','FAQs'],
                            ['/contact','Contact Us'],
                            ['/shipping','Shipping Info'],
                        ].map(([to,label]) => (
                            <li key={to}>
                                <Link to={to} className="footer-link">
                                    <span className="footer-link-arrow">→</span>{label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company */}
                <div className="footer-col">
                    <h5 className="footer-col-heading">Company</h5>
                    <ul className="footer-links">
                        {[
                            ['#about','About Dolat', true],
                            ['/privacy','Privacy Policy', false],
                            ['/terms','Terms of Service', false],
                        ].map(([target,label,isScroll]) => (
                            <li key={target}>
                                {isScroll
                                    ? <a href={target} onClick={(e) => handleScroll(e, target.slice(1))} className="footer-link"><span className="footer-link-arrow">→</span>{label}</a>
                                    : <Link to={target} className="footer-link"><span className="footer-link-arrow">→</span>{label}</Link>
                                }
                            </li>
                        ))}
                    </ul>

                    {/* Newsletter mini */}
                    <div className="footer-newsletter">
                        <p className="footer-newsletter-label">Get updates</p>
                        <div className="footer-newsletter-row">
                            <input type="email" placeholder="your@email.com" className="footer-newsletter-input" />
                            <button type="button" className="footer-newsletter-btn">→</button>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── Bottom bar ── */}
            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <p className="footer-copyright">© 2026 Kitabon Ki Dolat. All rights reserved.</p>
                    <div className="footer-bottom-badges">
                        <span className="footer-badge">🇵🇰 Made in Pakistan</span>
                        <span className="footer-badge">📦 Free Delivery on 2k+</span>
                        <span className="footer-badge">🔒 Secure Payments</span>
                    </div>
                    <p className="footer-credit">Designed with <span className="footer-heart">❤</span> by Dolat Khan Kakar</p>
                </div>
            </div>

        </footer>
    );
}
