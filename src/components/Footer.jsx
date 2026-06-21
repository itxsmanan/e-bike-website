import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: targetId } });
        } else {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-about">
                    <h3>کتابوں کی دولت</h3>
                    <p>Founded by Dolat Khan Kakar, Pakistan's premier platform for quality literature. Our mission: make books accessible to every Pakistani household.</p>
                    <div className="social-links">
                        <a href="#">📘</a>
                        <a href="#">📸</a>
                        <a href="#">🐦</a>
                        <a href="#">💼</a>
                        <a href="#">📹</a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#books" onClick={(e) => handleScroll(e, 'books')}>All Books</a></li>
                        <li><a href="#audiobooks" onClick={(e) => handleScroll(e, 'audiobooks')}>Audiobooks</a></li>
                        <li><a href="#events" onClick={(e) => handleScroll(e, 'events')}>Celebrity Events</a></li>
                        <li><a href="#">New Releases</a></li>
                        <li><a href="#">Bestsellers</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping Info</a></li>
                        <li><a href="#">Returns Policy</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#about" onClick={(e) => handleScroll(e, 'about')}>About Dolat</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Kitabon Ki Dolat. All rights reserved. Designed with ❤️ by Dolat Khan Kakar for book lovers across Pakistan.</p>
            </div>
        </footer>
    );
}
