const features = [
    {
        icon: '📱',
        title: 'Multi-Device Sync',
        desc: 'Read on phone, tablet, or computer. Your progress syncs automatically across all devices.',
        gradient: 'linear-gradient(135deg,rgba(201,169,98,0.15),rgba(201,169,98,0.05))',
    },
    {
        icon: '🌙',
        title: 'Night Mode',
        desc: 'Eye-friendly dark mode with customizable fonts and spacing for comfortable reading anytime.',
        gradient: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(99,102,241,0.05))',
    },
    {
        icon: '✏️',
        title: 'Smart Annotations',
        desc: 'Highlight passages, make notes, and bookmark pages. Export your reading notes anytime.',
        gradient: 'linear-gradient(135deg,rgba(212,102,74,0.15),rgba(212,102,74,0.05))',
    },
    {
        icon: '📊',
        title: 'Reading Analytics',
        desc: 'Track reading habits, set goals, and earn achievements as you complete books.',
        gradient: 'linear-gradient(135deg,rgba(34,211,238,0.12),rgba(34,211,238,0.04))',
    },
    {
        icon: '💬',
        title: 'Reader Community',
        desc: 'Join discussions, share reviews, and connect with fellow readers who love the same books.',
        gradient: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(168,85,247,0.05))',
    },
    {
        icon: '🎁',
        title: 'Gift Books',
        desc: 'Send books as gifts with personalized messages. Perfect for birthdays and special occasions.',
        gradient: 'linear-gradient(135deg,rgba(52,211,153,0.12),rgba(52,211,153,0.04))',
    },
];

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function LibraryFeatures() {
    return (
        <section className="section" id="library">
            <div className="section-header reveal section-header-with-nav">
                <div className="header-content">
                    <div className="section-label">Digital Library</div>
                    <h2 className="section-title">Your Personal E-Library</h2>
                    <p className="section-subtitle">
                        Everything you need for the perfect reading experience
                    </p>
                </div>
                <div className="modern-slider-nav">
                    <button className="nav-btn lib-prev">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="nav-btn lib-next">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    prevEl: '.lib-prev',
                    nextEl: '.lib-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 3 }
                }}
                className="features-swiper"
                style={{ padding: '2rem 1rem 4rem 1rem' }}
            >
                {features.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className="feature-card reveal"
                            style={{ transitionDelay: `${idx * 0.08}s` }}
                        >
                            <div
                                className="feature-icon"
                                style={{ background: item.gradient }}
                            >
                                {item.icon}
                            </div>
                            <h3 className="feature-title">{item.title}</h3>
                            <p className="feature-desc">{item.desc}</p>

                            {/* Arrow indicator */}
                            <div className="feature-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
