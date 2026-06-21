import { useNavigate } from 'react-router-dom';
import { books } from '../data/booksData';

export default function FeaturedBooks() {
    const navigate = useNavigate();

    return (
        <section className="section" id="books">
            <div className="section-header reveal">
                <div className="section-label">Featured Collection</div>
                <h2 className="section-title">Books by Dolat Khan Kakar</h2>
                <p className="section-subtitle">
                    Discover stories, wisdom, and knowledge from one of Pakistan's finest authors
                </p>
            </div>

            <div className="books-grid">
                {Object.values(books).map((book, idx) => (
                    <div
                        key={book.id}
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
                ))}
            </div>
        </section>
    );
}
