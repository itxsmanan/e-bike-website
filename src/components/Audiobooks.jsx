import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Audiobooks() {
    const navigate = useNavigate();
    const [playingId, setPlayingId] = useState(null);

    const audiobooksList = [
        {
            id: 1,
            title: "The Silent Echo",
            narrator: "Ahmed Ali",
            duration: "8 hours 32 minutes",
            price: 899,
            coverIcon: "🎧"
        },
        {
            id: 2,
            title: "Mindful Leadership",
            narrator: "Sara Khan",
            duration: "6 hours 15 minutes",
            price: 1199,
            coverIcon: "🎙️"
        }
    ];

    const togglePlay = (id) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };

    return (
        <section className="section" id="audiobooks" style={{ background: 'var(--slate)', margin: '0', maxWidth: '100%' }}>
            <div className="section-header">
                <div className="section-label">Listen Anywhere</div>
                <h2 className="section-title">Audiobook Collection</h2>
                <p className="section-subtitle">Professional narrations of your favorite books. Perfect for multitasking.</p>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {audiobooksList.map((item) => (
                    <div key={item.id} className="audiobook-player">
                        <div className="audiobook-cover">{item.coverIcon}</div>
                        <div className="audiobook-info">
                            <h3 className="audiobook-title">{item.title}</h3>
                            <p className="audiobook-narrator">Narrated by {item.narrator} • {item.duration}</p>
                            <div className="audiobook-controls">
                                <button className="btn-play" onClick={() => togglePlay(item.id)}>
                                    {playingId === item.id ? '⏸' : '▶'}
                                </button>
                                <span className="audiobook-duration">
                                    {playingId === item.id ? 'Playing...' : 'Sample available'}
                                </span>
                            </div>
                        </div>
                        <div className="book-price">
                            <span className="price">Rs. {item.price.toLocaleString()}</span>
                            <button 
                                className="view-details" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/payment/${encodeURIComponent(item.title + ' Audiobook')}/${item.price}`);
                                }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
