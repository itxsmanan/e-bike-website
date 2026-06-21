import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { events } from '../data/eventsData';

const fallbackImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", // Event audience
    "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop", // Signing book
    "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop", // Stage talk
];

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = Object.values(events).find((item) => String(item?.id) === String(id));
    
    const [currentSlide, setCurrentSlide] = useState(0);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!event) {
        return (
            <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <h2>Event not found</h2>
                <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }

    const images = event.gallery && event.gallery.length > 0 ? event.gallery : fallbackImages;

    const nextSlide = () => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    return (
        <div className="event-detail-page">
            <div className="event-detail-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back to Events
                </button>

                <div className="event-hero-section">
                    <div className="event-carousel-wrap">
                        {images.map((img, idx) => (
                            <img 
                                key={idx}
                                src={img} 
                                alt={`${event.title} slider ${idx + 1}`} 
                                className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}
                            />
                        ))}
                        
                        {/* Carousel Controls */}
                        {images.length > 1 && (
                            <>
                                <button className="carousel-btn prev" onClick={prevSlide}><FaChevronLeft /></button>
                                <button className="carousel-btn next" onClick={nextSlide}><FaChevronRight /></button>
                                
                                <div className="carousel-dots">
                                    {images.map((_, idx) => (
                                        <button 
                                            key={idx} 
                                            className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                                            onClick={() => setCurrentSlide(idx)}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="event-content-grid">
                    
                    {/* Left Col: Main Details */}
                    <div className="event-main-col">
                        <div className="section-label">Exclusive Event</div>
                        <h1 className="event-page-title">{event.title}</h1>
                        
                        <div className="event-meta-cards">
                            <div className="meta-card">
                                <FaCalendarAlt className="meta-icon" />
                                <div>
                                    <span className="meta-label">Date</span>
                                    <span className="meta-value">{event.date}</span>
                                </div>
                            </div>
                            <div className="meta-card">
                                <FaMapMarkerAlt className="meta-icon" />
                                <div>
                                    <span className="meta-label">Location</span>
                                    <span className="meta-value">{event.location}</span>
                                </div>
                            </div>
                            <div className="meta-card">
                                <FaUserTie className="meta-icon" />
                                <div>
                                    <span className="meta-label">Chief Guest</span>
                                    <span className="meta-value">{event.celebrity?.name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="event-description-block">
                            <h3>About the Event</h3>
                            <p>{event.description}</p>
                            <p>This event marked a significant milestone in bringing contemporary literature to the forefront of intellectual discourse. The author shared personal insights, signed copies for attendees, and engaged in a profound Q&A session.</p>
                        </div>
                    </div>

                    {/* Right Col: Testimonials & Quote */}
                    <div className="event-sidebar-col">
                        {event.quote && (
                            <div className="event-quote-highlight">
                                "{event.quote}"
                            </div>
                        )}

                        <div className="event-testimonials">
                            <h3>What They Said</h3>
                            <div className="testimonials-list">
                                {event.testimonials?.map((testimonial, idx) => (
                                    <div key={idx} className="testimonial-card">
                                        <div className="testimonial-card-head">
                                            <div className="testimonial-avatar">{testimonial.avatar}</div>
                                            <div>
                                                <div className="testimonial-name">{testimonial.name}</div>
                                                <div className="testimonial-role">{testimonial.role}</div>
                                            </div>
                                        </div>
                                        <p className="testimonial-text">"{testimonial.quote}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
