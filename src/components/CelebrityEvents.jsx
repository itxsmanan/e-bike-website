import { useNavigate } from 'react-router-dom';
import { events } from '../data/eventsData';

export default function CelebrityEvents() {
    const navigate = useNavigate();

    return (
        <section className="events-section" id="events">
            <div className="section">
                <div className="section-header reveal">
                    <div className="section-label">Literary Events</div>
                    <h2 className="section-title">Celebrity Book Launches</h2>
                    <p className="section-subtitle">
                        Presenting books to Pakistan's most influential personalities
                    </p>
                </div>

                <div className="events-grid">
                    {Object.values(events).map((event, idx) => {
                        const hasGallery = event.gallery && event.gallery.length > 0;
                        const coverImg = hasGallery ? event.gallery[0] : null;

                        return (
                            <div
                                key={event.id}
                                className="event-card reveal"
                                style={{ transitionDelay: `${idx * 0.1}s` }}
                                onClick={() => navigate(`/event/${event.id}`)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && navigate(`/event/${event.id}`)}
                                aria-label={`View ${event.title} event`}
                            >
                                <div className="event-image">
                                    {coverImg ? (
                                        <img src={coverImg} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '4.5rem' }}>{event.imageIcon}</span>
                                    )}
                                    <div className="event-image-overlay" />
                                    <span className="event-date-badge">{event.badgeDate}</span>
                                </div>

                                <div className="event-info">
                                    <h3 className="event-title">{event.title}</h3>

                                    <div className="event-celebrity">
                                        <div className="celebrity-avatar">{event.celebrity.avatar}</div>
                                        <div className="celebrity-info">
                                            <h4>{event.celebrity.name}</h4>
                                            <p className="celebrity-title">{event.celebrity.title}</p>
                                        </div>
                                    </div>

                                    <p className="event-quote">"{event.quote}"</p>

                                    {/* Gallery strip */}
                                    {hasGallery && event.gallery.length > 1 && (
                                        <div className="event-gallery-strip">
                                            {event.gallery.slice(0, 3).map((img, i) => (
                                                <img key={i} src={img} alt="" className="event-gallery-thumb" />
                                            ))}
                                            {event.gallery.length > 3 && (
                                                <div className="event-gallery-more">
                                                    +{event.gallery.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        className="view-event-details"
                                        onClick={(e) => { e.stopPropagation(); navigate(`/event/${event.id}`); }}
                                    >
                                        View Full Event →
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
