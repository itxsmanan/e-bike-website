import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaRegStar, FaBookOpen, FaBoxOpen, FaTruck, FaLock, FaCheckCircle } from 'react-icons/fa';
import { books } from '../data/booksData';

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = Object.values(books).find((item) => String(item?.id) === String(id));

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
    }, [id]);

    if (!book) {
        return (
            <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <h2>Book not found</h2>
                <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }

    const handleBuyHardCopy = () => {
        // Route as 'book' for Cash on Delivery / Bank / EasyPaisa
        navigate(`/payment/book/${encodeURIComponent(book.title + ' (Hard Copy)')}/${book.printPrice}`);
    };

    const handleSubscribeToRead = () => {
        // Navigate to home and scroll to subscriptions
        navigate('/', { state: { scrollTo: 'subscriptions' } });
    };

    // Render stars helper
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(book.rating)) {
                stars.push(<FaStar key={i} color="#FFA41C" />);
            } else {
                stars.push(<FaRegStar key={i} color="#FFA41C" />);
            }
        }
        return stars;
    };

    return (
        <div className="book-detail-page">
            <div className="book-detail-container">
                {/* Top Nav */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back to Library
                </button>

                <div className="book-detail-layout">
                    
                    {/* Left Column: Image */}
                    <div className="book-image-col">
                        <div className="book-image-wrapper">
                            {book.cover && (book.cover.startsWith('data:') || book.cover.startsWith('http') || book.cover.length > 5) ? (
                                <img src={book.cover} alt={book.title} className="book-cover-img" />
                            ) : (
                                <div className="placeholder-cover">{book.cover}</div>
                            )}
                        </div>
                    </div>

                    {/* Center Column: Details */}
                    <div className="book-info-col">
                        <h1 className="book-title">{book.title}</h1>
                        <p className="book-author">by <span className="author-name">{book.author}</span></p>
                        
                        <div className="book-rating-row">
                            <div className="stars-container">{renderStars()}</div>
                            <span className="rating-score">{book.rating}</span>
                            <span className="rating-count">({book.reviews} ratings)</span>
                        </div>

                        <div className="book-price-row">
                            <span className="price-label">Hard Copy Price:</span>
                            <span className="price-amount">Rs. {book.printPrice}</span>
                        </div>

                        <div className="book-description">
                            <h3>Overview</h3>
                            <p>{book.description}</p>
                        </div>

                        <div className="book-meta-grid">
                            <div className="meta-box">
                                <span className="meta-label">Print Length</span>
                                <span className="meta-value">{book.pages} pages</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-label">Language</span>
                                <span className="meta-value">{book.language}</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-label">Publisher</span>
                                <span className="meta-value">Dolat Khan Kakar</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-label">Publication Date</span>
                                <span className="meta-value">{book.published}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Amazon-style Buy Box */}
                    <div className="book-buy-col">
                        <div className="buy-box">
                            <div className="buy-box-header">
                                <h3>Read it your way</h3>
                            </div>
                            
                            <div className="buy-box-body">
                                
                                {/* Option 1: Buy Hard Copy */}
                                <div className="purchase-option">
                                    <div className="option-header">
                                        <FaBoxOpen className="option-icon" />
                                        <div className="option-title-wrap">
                                            <strong>Buy Hard Copy</strong>
                                            <span className="option-price">Rs. {book.printPrice}</span>
                                        </div>
                                    </div>
                                    <ul className="option-perks">
                                        <li><FaTruck /> Fast delivery nationwide</li>
                                        <li><FaCheckCircle color="#25D366" /> Cash on delivery available</li>
                                        <li><FaLock /> Secure payment</li>
                                    </ul>
                                    <button className="btn-buy-now" onClick={handleBuyHardCopy}>
                                        Buy Hard Copy
                                    </button>
                                </div>

                                <div className="buy-divider"><span>OR</span></div>

                                {/* Option 2: Subscribe to Read */}
                                <div className="purchase-option subscription-option">
                                    <div className="option-header">
                                        <FaBookOpen className="option-icon gold" />
                                        <div className="option-title-wrap">
                                            <strong>Subscribe to Read</strong>
                                            <span className="option-subtitle">Read this and thousands more</span>
                                        </div>
                                    </div>
                                    <ul className="option-perks">
                                        <li><FaCheckCircle color="#C9A962" /> Unlimited digital access</li>
                                        <li><FaCheckCircle color="#C9A962" /> Read on any device</li>
                                        <li><FaCheckCircle color="#C9A962" /> Cancel anytime</li>
                                    </ul>
                                    <button className="btn-subscribe-now" onClick={handleSubscribeToRead}>
                                        View Subscription Plans
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
