import { useEffect, useRef, useState } from 'react';
import { FaUserTie, FaUserGraduate, FaUserNinja, FaUserAstronaut, FaUserSecret } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TextType from './TextType';
import heroIllustration from '../assets/hero_illustration.jpg';

/* ── Helpers ───────────────────────────────────────────────── */
// Splits a string into animated <span> words
// Framer Motion word animation variant
const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        transition: { type: "spring", damping: 14, stiffness: 100 }
    }
};

function AnimatedText({ text, className, baseDelay = 0, step = 0.07 }) {
    const words = text.split(' ');
    
    return (
        <span style={{ display: 'inline-block', perspective: '600px' }}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: baseDelay + i * step }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    <span className={className}>{word}</span>{i < words.length - 1 ? ' ' : ''}
                </motion.span>
            ))}
        </span>
    );
}

/* ── Inline SVG Book Vector ────────────────────────────────── */
function BookVector() {
    return (
        <div className="hero-svg-wrap" aria-hidden="true">
            {/* Glow halo behind book */}
            <div className="hero-glow-halo" />

            {/* Main illustration image */}
            <div className="hero-illus-frame">
                <img
                    src={heroIllustration}
                    alt="Kitabon Ki Dolat — Digital Library"
                    className="hero-illus-img"
                />
                {/* Glassmorphic overlay at bottom */}
                <div className="hero-illus-glass" />
            </div>

            {/* Floating SVG book on top of illustration */}
            <div className="hero-float-book">
                <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" className="hero-book-svg">
                    <defs>
                        <linearGradient id="pageGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#E8C574"/>
                            <stop offset="100%" stopColor="#C9A962"/>
                        </linearGradient>
                        <linearGradient id="coverGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1C2355"/>
                            <stop offset="100%" stopColor="#0C1035"/>
                        </linearGradient>
                        <linearGradient id="spineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#9A7D3A"/>
                            <stop offset="100%" stopColor="#C9A962"/>
                        </linearGradient>
                        <filter id="bookGlow">
                            <feGaussianBlur stdDeviation="4" result="blur"/>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                        </filter>
                        <filter id="pageGlow">
                            <feGaussianBlur stdDeviation="2" result="blur"/>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                        </filter>
                    </defs>

                    {/* Book spine */}
                    <rect x="0" y="10" width="22" height="240" rx="3" fill="url(#spineGrad)" filter="url(#bookGlow)"/>
                    <rect x="2" y="15" width="3" height="230" rx="1" fill="rgba(255,255,255,0.15)"/>

                    {/* Back cover */}
                    <rect x="18" y="10" width="175" height="240" rx="4" fill="#0A0E27" filter="url(#bookGlow)"/>

                    {/* Pages stack (right side subtle shadow) */}
                    {[3,2,1].map(i => (
                        <rect key={i} x={18 + i} y={10 + i} width={173 - i} height={238 - i} rx="3"
                            fill={`rgba(232,197,116,${0.04 * i})`} />
                    ))}

                    {/* Front cover */}
                    <rect x="18" y="10" width="175" height="240" rx="4" fill="url(#coverGrad)" stroke="rgba(201,169,98,0.3)" strokeWidth="1"/>

                    {/* Cover decorative border */}
                    <rect x="26" y="18" width="159" height="224" rx="2" fill="none" stroke="rgba(201,169,98,0.2)" strokeWidth="1"/>
                    <rect x="30" y="22" width="151" height="216" rx="2" fill="none" stroke="rgba(201,169,98,0.1)" strokeWidth="0.5"/>

                    {/* Cover glow orb */}
                    <circle cx="105" cy="115" r="55" fill="radial-gradient(circle,rgba(201,169,98,0.15),transparent)" opacity="0.3"/>
                    <ellipse cx="105" cy="110" rx="42" ry="42" fill="rgba(201,169,98,0.05)" />

                    {/* Urdu title on cover */}
                    <text x="105" y="95" textAnchor="middle" fontFamily="'Noto Nastaliq Urdu', serif"
                        fontSize="20" fill="url(#pageGrad)" filter="url(#pageGlow)">کتابوں</text>
                    <text x="105" y="125" textAnchor="middle" fontFamily="'Noto Nastaliq Urdu', serif"
                        fontSize="20" fill="url(#pageGrad)" filter="url(#pageGlow)">کی دولت</text>

                    {/* Divider line */}
                    <line x1="50" y1="145" x2="160" y2="145" stroke="rgba(201,169,98,0.4)" strokeWidth="0.8"/>

                    {/* English subtitle */}
                    <text x="105" y="165" textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontSize="9" fill="rgba(201,169,98,0.7)" letterSpacing="3">KITABON KI DOLAT</text>

                    {/* Bottom decoration */}
                    <text x="105" y="230" textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontSize="7.5" fill="rgba(201,169,98,0.5)" letterSpacing="2">by Dolat Khan Kakar</text>

                    {/* Corner ornaments */}
                    {[
                        [34, 28], [168, 28], [34, 222], [168, 222]
                    ].map(([cx, cy], i) => (
                        <g key={i}>
                            <circle cx={cx} cy={cy} r="4" fill="none" stroke="rgba(201,169,98,0.3)" strokeWidth="0.8"/>
                            <circle cx={cx} cy={cy} r="1.5" fill="rgba(201,169,98,0.4)"/>
                        </g>
                    ))}

                    {/* Sparkle stars around book */}
                    {[
                        { cx: 10, cy: 5, r: 2 },
                        { cx: 185, cy: 20, r: 1.5 },
                        { cx: 195, cy: 80, r: 2 },
                        { cx: 5, cy: 180, r: 1.5 },
                        { cx: 190, cy: 200, r: 2 },
                    ].map(({ cx, cy, r }, i) => (
                        <circle key={i} cx={cx} cy={cy} r={r}
                            fill="rgba(232,197,116,0.8)"
                            className={`hero-sparkle hero-sparkle-${i + 1}`}/>
                    ))}
                </svg>

                {/* Animated page flutter on top of SVG */}
                <div className="hero-page-flutter hero-page-1"/>
                <div className="hero-page-flutter hero-page-2"/>
            </div>

            {/* Orbiting ring */}
            <div className="hero-orbit-ring">
                <div className="hero-orbit-dot"/>
            </div>

            {/* Floating stat chips */}
            <div className="hero-stat hero-stat-tl">
                <span className="hero-stat-icon">📚</span>
                <div>
                    <strong>500+</strong>
                    <span>Curated Books</span>
                </div>
            </div>

            <div className="hero-stat hero-stat-br">
                <span className="hero-stat-icon">⭐</span>
                <div>
                    <strong>4.9</strong>
                    <span>Avg Rating</span>
                </div>
            </div>

            <div className="hero-stat hero-stat-tr">
                <span className="hero-stat-icon">🌍</span>
                <div>
                    <strong>50K+</strong>
                    <span>Readers</span>
                </div>
            </div>
        </div>
    );
}

/* ── Main Hero ─────────────────────────────────────────────── */
const brandUrdu = 'کتابوں کی دولت';

export default function Hero() {
    const [visible, setVisible] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        // Small delay so fonts load before animation starts
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className={`hero hero-v2 ${visible ? 'hero-visible' : ''}`} id="home" ref={heroRef}>

            {/* Background layers */}
            <div className="hero-bg-grid" aria-hidden="true"/>
            <div className="hero-bg-orb hero-orb-1" aria-hidden="true"/>
            <div className="hero-bg-orb hero-orb-2" aria-hidden="true"/>
            <div className="hero-bg-orb hero-orb-3" aria-hidden="true"/>

            {/* Floating ambient particles */}
            <div className="hero-particles" aria-hidden="true">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className={`hero-particle hp-${i + 1}`}/>
                ))}
            </div>

            <div className="hero-content">
                {/* ── LEFT: Copy ─────────────────────────────── */}
                <div className="hero-copy">

                    {/* Eyebrow pill */}
                    <div className="hero-eyebrow hero-anim" style={{ '--i': 0 }}>
                        <span className="hero-eyebrow-dot"/>
                        Pakistan's Premier Digital Library
                    </div>

                    {/* Urdu brand name */}
                    <div className="hero-brandline hero-anim" style={{ '--i': 1 }} lang="ur" dir="rtl">
                        {brandUrdu}
                    </div>

                    {/* Main headline — word by word */}
                    <h1 className="hero-headline">
                        <AnimatedText
                            text="Kitabon"
                            className="hero-word-gold"
                            baseDelay={0.3}
                        />
                        {' '}
                        <AnimatedText
                            text="Ki"
                            className="hero-word-white"
                            baseDelay={0.45}
                        />
                        {' '}
                        <AnimatedText
                            text="Dolat"
                            className="hero-word-gradient"
                            baseDelay={0.55}
                        />
                    </h1>

                    {/* Animated tagline — word by word */}
                    <p className="hero-tagline-v2">
                        <AnimatedText
                            text="Where books become knowledge, wisdom,"
                            baseDelay={0.8}
                            step={0.06}
                        />
                        <br/>
                        <AnimatedText
                            text="and your greatest wealth."
                            baseDelay={1.5}
                            step={0.08}
                        />
                    </p>

                    {/* Subtitle */}
                    <div className="hero-subtitle hero-anim" style={{ '--i': 6, minHeight: '3.6rem' }}>
                        <TextType 
                            text={[
                                "Pakistan's premier digital publishing platform by Dolat Khan Kakar.",
                                "Discover, read, and own books that transform lives.",
                                "Empowering the nation through knowledge and wisdom."
                            ]}
                            typingSpeed={40}
                            deletingSpeed={20}
                            pauseDuration={2500}
                            showCursor={true}
                            cursorCharacter="|"
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-buttons hero-anim" style={{ '--i': 7 }}>
                        <a href="#books" className="hero-btn-primary" onClick={e => handleScroll(e, 'books')}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            Explore Collection
                            <span className="hero-btn-shimmer"/>
                        </a>
                        <a href="#audiobooks" className="hero-btn-secondary" onClick={e => handleScroll(e, 'audiobooks')}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                            Listen Free
                        </a>
                    </div>

                    {/* Trust strip */}
                    <div className="hero-trust hero-anim" style={{ '--i': 8 }}>
                        <div className="hero-trust-avatars">
                            <span className="hero-avatar-chip"><FaUserTie /></span>
                            <span className="hero-avatar-chip"><FaUserGraduate /></span>
                            <span className="hero-avatar-chip"><FaUserNinja /></span>
                            <span className="hero-avatar-chip"><FaUserAstronaut /></span>
                            <span className="hero-avatar-chip"><FaUserSecret /></span>
                        </div>
                        <div className="hero-trust-info">
                            <div className="hero-trust-stars">{'★★★★★'}</div>
                            <div className="hero-trust-text">
                                <strong>50,000+</strong> happy readers across Pakistan
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Book Visual ──────────────────────── */}
                <div className="hero-visual hero-anim" style={{ '--i': 2 }}>
                    <BookVector/>
                </div>
            </div>

            {/* Scroll indicator */}
            <a href="#books" className="hero-scroll-indicator" onClick={e => handleScroll(e, 'books')} aria-label="Scroll to books">
                <span className="hero-scroll-dot"/>
            </a>
        </section>
    );
}
