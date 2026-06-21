import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/eventsData';

export default function EventDetailModal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = events[id];

    useEffect(() => {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        return () => {
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        };
    }, []);

    if (!event) {
        return null;
    }

    const handleClose = () => {
        navigate('/');
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className="event-detail-modal active" onClick={handleOutsideClick}>
            <div className="event-detail-container">
                <span className="close-modal" onClick={handleClose}>&times;</span>
                <div className="event-detail-header">
                    <h2 className="event-detail-title">{event.title}</h2>
                    <p className="event-detail-date">{event.date} &bull; {event.location}</p>
                </div>

                <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'center', marginBottom: '3rem' }}>
                    {event.description}
                </p>

                <h3 style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Event Gallery</h3>
                <div className="event-gallery">
                    {event.gallery && event.gallery.length > 0 ? (
                        event.gallery.map((img, idx) => (
                            <div key={idx} className="gallery-item" style={{ padding: 0, overflow: 'hidden' }}>
                                <img src={img} alt={`Launch ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="gallery-item">{'\ud83d\udcf8'}</div>
                            <div className="gallery-item">{'\ud83d\udcf7'}</div>
                            <div className="gallery-item">{'\ud83d\uddbc\ufe0f'}</div>
                            <div className="gallery-item">{'\ud83c\udfaf'}</div>
                            <div className="gallery-item">{'\ud83c\udf1f'}</div>
                            <div className="gallery-item">{'\ud83d\udcda'}</div>
                        </>
                    )}
                </div>

                <h3 style={{ color: 'var(--gold)', fontSize: '2rem', margin: '3rem 0 2rem', textAlign: 'center' }}>What They Said</h3>
                <div className="event-testimonials">
                    {event.testimonials.map((t, idx) => (
                        <div key={idx} className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">{t.avatar}</div>
                                <div>
                                    <div className="testimonial-name">{t.name}</div>
                                    <div className="testimonial-role">{t.role}</div>
                                </div>
                            </div>
                            <p className="testimonial-quote">"{t.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
