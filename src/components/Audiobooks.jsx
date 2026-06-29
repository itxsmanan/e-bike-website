import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeadphones, FaMicrophone } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const audiobooksList = [
    {
        id: 1,
        title: 'The Silent Echo',
        narrator: 'Ahmed Ali',
        duration: '8 hrs 32 min',
        genre: 'Fiction • Thriller',
        price: 899,
        coverIcon: <FaHeadphones />,
        waveColor: '#C9A962',
    },
    {
        id: 2,
        title: 'Mindful Leadership',
        narrator: 'Sara Khan',
        duration: '6 hrs 15 min',
        genre: 'Self-Help • Business',
        price: 1199,
        coverIcon: <FaMicrophone />,
        waveColor: '#D4664A',
    },
];

function WaveAnimation({ active, color }) {
    return (
        <div className={`audio-wave ${active ? 'audio-wave-playing' : ''}`} aria-hidden="true">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="audio-wave-bar" style={{ '--bar-color': color, '--delay': `${i * 0.12}s` }} />
            ))}
        </div>
    );
}

export default function Audiobooks() {
    const navigate = useNavigate();
    const { isLoggedIn, isSubscribed, openAuthModal } = useAuth();
    const [playingId, setPlayingId] = useState(null);
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const goToSixMonthSubscription = () => {
        navigate(`/payment/sub/${encodeURIComponent('Half-Yearly Subscription')}/2399`);
    };

    const togglePlay = (item) => {
        if (!isLoggedIn) {
            openAuthModal();
            return;
        }

        if (!isSubscribed) {
            goToSixMonthSubscription();
            return;
        }

        setPlayingId(prev => prev === item.id ? null : item.id);
    };

    const handleSixMonthPlan = () => {
        if (!isLoggedIn) {
            openAuthModal();
            return;
        }

        goToSixMonthSubscription();
    };

    return (
        <section ref={sectionRef} className="section audiobooks-section" id="audiobooks">
            <div className={`section-header reveal ${inView ? 'in-view' : ''}`}>
                <div className="section-label">Listen Anywhere</div>
                <h2 className="section-title">Audiobook Collection</h2>
                <p className="section-subtitle">
                    Professional narrations of your favorite books. Perfect for multitasking.
                </p>
            </div>

            <div className="audiobooks-list">
                {audiobooksList.map((item, idx) => {
                    const isPlaying = playingId === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`audiobook-player reveal ${inView ? 'in-view' : ''} ${isPlaying ? 'audiobook-playing' : ''}`}
                            style={{ transitionDelay: `${idx * 0.15}s` }}
                        >
                            {/* Cover */}
                            <div className="audiobook-cover" style={{ '--cover-accent': item.waveColor }}>
                                <span>{item.coverIcon}</span>
                                {isPlaying && <div className="audiobook-cover-ring" />}
                            </div>

                            {/* Info */}
                            <div className="audiobook-info">
                                <div className="audiobook-genre">{item.genre}</div>
                                <h3 className="audiobook-title">{item.title}</h3>
                                <p className="audiobook-narrator">Narrated by <strong>{item.narrator}</strong> • {item.duration}</p>

                                <div className="audiobook-controls">
                                    <button
                                        className={`btn-play ${isPlaying ? 'btn-play-active' : ''}`}
                                        type="button"
                                        onClick={() => togglePlay(item)}
                                        aria-label={isPlaying ? `Pause ${item.title}` : `Play ${item.title}`}
                                    >
                                        {isPlaying ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                                            </svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="5 3 19 12 5 21 5 3"/>
                                            </svg>
                                        )}
                                    </button>

                                    <WaveAnimation active={isPlaying} color={item.waveColor} />

                                    <span className="audiobook-duration">
                                        {isPlaying ? 'Playing sample...' : 'Sample available'}
                                    </span>
                                </div>
                            </div>

                            {/* Purchase */}
                            <div className="audiobook-purchase">
                                <span className="price">6-Month Plan</span>
                                <span className="audiobook-plan-note">Included with subscription</span>
                                <button
                                    className="btn-primary"
                                    style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                                    type="button"
                                    onClick={handleSixMonthPlan}
                                >
                                    Get Access
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
