import { useNavigate } from 'react-router-dom';
import { books } from '../data/booksData';

export default function FeaturedBooks() {
    const navigate = useNavigate();

    return (
        <section className="section" id="books">
            <div className="section-header">
                <div className="section-label">Featured Collection</div>
                <h2 className="section-title">Books by Dolat Khan Kakar</h2>
                <p className="section-subtitle">Discover stories, wisdom, and knowledge from one of Pakistan's finest authors</p>
            </div>

            <div className="books-grid">
                {Object.values(books).map((book) => (
                    <div 
                        key={book.id} 
                        className="book-card" 
                        onClick={() => navigate(`/book/${book.id}`)}
                    >
                        <div className="book-cover">
                            {book.id === 1 && <span className="book-badge">Bestseller</span>}
                            {book.id === 2 && <span className="book-badge">New Release</span>}
                            {book.cover && (book.cover.startsWith('data:') || book.cover.startsWith('http') || book.cover.length > 5) ? (
                                <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                            ) : (
                                book.cover
                            )}
                        </div>
                        <div className="book-info">
                            <div className="book-category">{book.category}</div>
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                            <div className="book-price">
                                <span className="price">Rs. {book.printPrice.toLocaleString()}</span>
                                <button className="view-details" onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/book/${book.id}`);
                                }}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
