import { useNavigate } from 'react-router-dom';
import { books } from '../data/booksData';
import BookActionButtons from './library/BookActionButtons';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function FeaturedBooks() {
    const navigate = useNavigate();

    return (
        <section className="section" id="books">
            {/* Header row: text left, arrows right */}
            <div className="section-header-with-nav reveal">
                <div className="shwn-text">
                    <div className="section-label">Featured Collection</div>
                    <h2 className="section-title">Books by Dolat Khan Kakar</h2>
                    <p className="section-subtitle">
                        Discover stories, wisdom, and knowledge from one of Pakistan's finest authors
                    </p>
                </div>
                <div className="modern-slider-nav">
                    <button className="nav-btn books-prev" aria-label="Previous books">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="nav-btn books-next" aria-label="Next books">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    prevEl: '.books-prev',
                    nextEl: '.books-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 3 }
                }}
                className="books-swiper"
                style={{ padding: '2rem 1rem 4rem 1rem' }}
            >
                {Object.values(books).map((book, idx) => (
                    <SwiperSlide key={book.id}>
                        <div
                            className="book-card reveal"
                            style={{ transitionDelay: `${idx * 0.1}s` }}
                            onClick={() => navigate(`/book/${book.id}`)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && navigate(`/book/${book.id}`)}
                            aria-label={`View details for ${book.title}`}
                        >
                            <div className="book-cover">
                                {book.id === 1 && <span className="book-badge">Bestseller</span>}
                                {book.id === 2 && <span className="book-badge">New Release</span>}

                                {book.cover && (book.cover.startsWith('data:') || book.cover.startsWith('http') || book.cover.length > 5) ? (
                                    <img src={book.cover} alt={book.title} />
                                ) : (
                                    <span style={{ fontSize: '5rem', lineHeight: 1 }}>{book.cover}</span>
                                )}

                                {/* Hover overlay */}
                                <div className="book-cover-overlay">
                                    {/* Bookmark icon — top right */}
                                    <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
                                        <BookActionButtons book={book} variant="card" />
                                    </div>
                                    <button
                                        className="book-quick-view"
                                        onClick={(e) => { e.stopPropagation(); navigate(`/book/${book.id}`); }}
                                    >
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            <div className="book-info">
                                <div className="book-category">{book.category}</div>
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">by {book.author}</p>

                                <div className="book-rating">
                                    <span className="book-stars">{'★'.repeat(Math.round(book.rating || 5))}</span>
                                    <span className="book-reviews">({book.reviews?.toLocaleString() || '0'})</span>
                                </div>

                                <div className="book-price">
                                    <span className="price">Rs. {book.printPrice.toLocaleString()}</span>
                                    <button
                                        className="view-details"
                                        onClick={(e) => { e.stopPropagation(); navigate(`/book/${book.id}`); }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
