import { useNavigate } from 'react-router-dom';
import { events } from '../data/eventsData';

export default function CelebrityEvents() {
    const navigate = useNavigate();

    return (
        <section className="events-section" id="events">
            <div className="section">
                <div className="section-header">
                    <div className="section-label">Literary Events</div>
                    <h2 className="section-title">Celebrity Book Launches</h2>
                    <p className="section-subtitle">Presenting books to Pakistan's most influential personalities</p>
                </div>

                <div className="events-grid">
                    {Object.values(events).map((event) => (
                        <div 
                            key={event.id} 
                            className="event-card" 
                            onClick={() => navigate(`/event/${event.id}`)}
                        >
                            <div className="event-image">
                                <span className="event-date-badge">{event.badgeDate}</span>
                                {event.imageIcon}
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
                                <button className="view-event-details" onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/event/${event.id}`);
                                }}>View Full Event</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
