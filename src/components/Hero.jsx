import heroImage from '../assets/hero.png';

const brandUrdu = '\u06a9\u062a\u0627\u0628\u0648\u06ba \u06a9\u06cc \u062f\u0648\u0644\u062a';
const heroUrdu = '\u0627\u0635\u0644 \u062f\u0648\u0644\u062a \u06a9\u062a\u0627\u0628\u0648\u06ba \u0645\u06cc\u06ba \u06c1\u06d2';

export default function Hero() {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-bg-grid" aria-hidden="true"></div>
            <div className="hero-content">
                <div className="hero-copy">
                    <div className="hero-eyebrow">Pakistan's Modern Digital Library</div>
                    <div className="hero-brandline" lang="ur" dir="rtl">{brandUrdu}</div>
                    <h1>Kitabon Ki Dolat</h1>
                    <p className="hero-urdu" lang="ur" dir="rtl">{heroUrdu}</p>
                    <p className="hero-tagline">Where books become knowledge, wisdom, and true wealth.</p>
                    <p className="hero-subtitle">
                        Welcome to Pakistan's premier digital publishing platform by Dolat Khan Kakar. Discover,
                        read, and own books that transform lives. Your journey into knowledge, wisdom, and fortune
                        starts here.
                    </p>
                    <div className="hero-buttons">
                        <a href="#books" className="btn-primary" onClick={(e) => handleScroll(e, 'books')}>Explore Collection</a>
                        <a href="#audiobooks" className="btn-secondary" onClick={(e) => handleScroll(e, 'audiobooks')} aria-label="Listen to Audiobooks">
                            <span aria-hidden="true">{'\ud83c\udfa7'}</span>
                            Listen to Audiobooks
                        </a>
                    </div>
                </div>

                <div className="hero-visual" aria-hidden="true">
                    <div className="hero-book-stack">
                        <img src={heroImage} alt="" />
                    </div>
                    <div className="hero-stat hero-stat-top">
                        <strong>500+</strong>
                        <span>Curated Reads</span>
                    </div>
                    <div className="hero-stat hero-stat-bottom">
                        <strong>24/7</strong>
                        <span>Digital Library</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
