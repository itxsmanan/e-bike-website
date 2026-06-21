import heroImage from '../assets/hero.png';

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
                    <div className="hero-eyebrow">Pakistan's Digital Reading House</div>
                    <div className="hero-urdu" lang="ur" dir="rtl">اصلی دولت کتابوں میں ہے</div>
                    <h1>Kitabon Ki Dolat</h1>
                    <p className="hero-tagline">"Where Books Are True Wealth"</p>
                    <p className="hero-subtitle">
                        Welcome to Pakistan's premier digital publishing platform by Dolat Khan Kakar. Discover,
                        read, and own books that transform lives. Your journey into knowledge, wisdom, and fortune
                        starts here.
                    </p>
                    <div className="hero-buttons">
                        <a href="#books" className="btn-primary" onClick={(e) => handleScroll(e, 'books')}>Explore Collection</a>
                        <a href="#audiobooks" className="btn-secondary" onClick={(e) => handleScroll(e, 'audiobooks')} aria-label="Listen to Audiobooks">
                            <span aria-hidden="true">🎧</span>
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
