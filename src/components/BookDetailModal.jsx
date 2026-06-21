import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../data/booksData';

export default function BookDetailModal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = books[id];

    useEffect(() => {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        return () => {
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        };
    }, []);

    if (!book) {
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

    const handlePurchase = (type, price) => {
        navigate(`/payment/${encodeURIComponent(book.title + ` (${type})`)}/${price}`);
    };

    return (
        <div className="book-detail-modal active" onClick={handleOutsideClick}>
            <div className="book-detail-container">
                <span className="close-modal" onClick={handleClose}>&times;</span>
                <div className="book-detail-content">
                    <div className="book-detail-cover">
                        {book.cover && (book.cover.startsWith('data:') || book.cover.startsWith('http') || book.cover.length > 5) ? (
                            <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : (
                            book.cover
                        )}
                    </div>
                    <div className="book-detail-info">
                        <h2>{book.title}</h2>
                        <p className="book-detail-author">by {book.author}</p>
                        <div className="book-rating">
                            <span className="stars">{'\u2605\u2605\u2605\u2605\u2605'}</span>
                            <span className="rating-count">{book.rating} ({book.reviews} reviews)</span>
                        </div>
                        <p className="book-description">{book.description}</p>

                        <div className="book-specs">
                            <div className="spec-item">
                                <span className="spec-label">Pages</span>
                                <span className="spec-value">{book.pages}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Language</span>
                                <span className="spec-value">{book.language}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">ISBN</span>
                                <span className="spec-value">{book.isbn}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Published</span>
                                <span className="spec-value">{book.published}</span>
                            </div>
                        </div>

                        <div className="purchase-options">
                            <div className="purchase-card">
                                <div className="purchase-type">E-Book</div>
                                <div className="purchase-icon">{'\ud83d\udcf1'}</div>
                                <div className="purchase-price">Rs. {book.ebookPrice}</div>
                                <ul className="purchase-features">
                                    <li>Instant download</li>
                                    <li>Read on any device</li>
                                    <li>Searchable text</li>
                                    <li>Lifetime access</li>
                                </ul>
                                <button className="btn-purchase btn-ebook" onClick={() => handlePurchase('E-Book', book.ebookPrice)}>Buy E-Book</button>
                            </div>

                            <div className="purchase-card">
                                <div className="purchase-type">Print Book</div>
                                <div className="purchase-icon">{'\ud83d\udcda'}</div>
                                <div className="purchase-price">Rs. {book.printPrice}</div>
                                <ul className="purchase-features">
                                    <li>Premium quality paper</li>
                                    <li>Beautiful binding</li>
                                    <li>5-7 days delivery</li>
                                    <li>Free bookmark</li>
                                </ul>
                                <button className="btn-purchase btn-print" onClick={() => handlePurchase('Print', book.printPrice)}>Order Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
