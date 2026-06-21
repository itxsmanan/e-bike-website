import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaMobileAlt, FaCheckCircle, FaLock, FaShieldAlt, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa';

export default function PaymentModal() {
    const { type, itemName, price } = useParams();
    const navigate = useNavigate();
    const decodedItemName = itemName ? decodeURIComponent(itemName) : '';
    
    const [selectedMethod, setSelectedMethod] = useState(type === 'sub' ? 'jazzcash' : 'cod');
    
    // Form states
    const [jazzcashNumber, setJazzcashNumber] = useState('');
    const [jazzcashCnic, setJazzcashCnic] = useState('');
    const [codName, setCodName] = useState('');
    const [codPhone, setCodPhone] = useState('');
    const [codAddress, setCodAddress] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        return () => {
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        };
    }, []);

    const handleClose = () => navigate(-1);
    const handleOutsideClick = (e) => { if (e.target.classList.contains('modal-overlay')) handleClose(); };

    const paymentMethods = {
        jazzcash: {
            id: 'jazzcash', name: 'JazzCash', icon: <FaMobileAlt size={28} />, color: '#D8232A',
            details: (
                <div className="payment-details-glass">
                    <div className="payment-details-info">
                        <p style={{ marginBottom: '1rem', color: 'var(--text)' }}><strong>Direct Payment Gateway</strong></p>
                        <form id="checkout-form" onSubmit={(e) => {
                            e.preventDefault();
                            setIsProcessing(true);
                            setTimeout(() => {
                                setIsProcessing(false);
                                setPaymentSuccess(true);
                                setTimeout(() => navigate('/'), 3000);
                            }, 2000);
                        }} className="gateway-form">
                            <div className="form-group">
                                <label>JazzCash Mobile Number</label>
                                <input 
                                    type="text" 
                                    placeholder="03XX-XXXXXXX" 
                                    required 
                                    value={jazzcashNumber}
                                    onChange={(e) => setJazzcashNumber(e.target.value)}
                                    className="gateway-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Last 6 Digits of CNIC</label>
                                <input 
                                    type="text" 
                                    placeholder="XXXXXX" 
                                    maxLength="6"
                                    required 
                                    value={jazzcashCnic}
                                    onChange={(e) => setJazzcashCnic(e.target.value)}
                                    className="gateway-input"
                                />
                            </div>
                        </form>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            You will receive an MPIN prompt on your mobile phone to authorize the payment.
                        </p>
                    </div>
                </div>
            )
        },
        cod: {
            id: 'cod', name: 'Cash on Delivery', icon: <FaMoneyBillWave size={28} />, color: '#E8C574',
            details: (
                <div className="payment-details-glass">
                    <div className="payment-details-info">
                        <p style={{ marginBottom: '1rem', color: 'var(--text)' }}><strong>Delivery Details</strong></p>
                        <form id="checkout-form" onSubmit={(e) => {
                            e.preventDefault();
                            setIsProcessing(true);
                            setTimeout(() => {
                                setIsProcessing(false);
                                setPaymentSuccess(true);
                                setTimeout(() => navigate('/'), 3000);
                            }, 2000);
                        }} className="gateway-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    required 
                                    value={codName}
                                    onChange={(e) => setCodName(e.target.value)}
                                    className="gateway-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    placeholder="03XX-XXXXXXX" 
                                    required 
                                    value={codPhone}
                                    onChange={(e) => setCodPhone(e.target.value)}
                                    className="gateway-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Complete Shipping Address</label>
                                <textarea 
                                    placeholder="House No, Street, Area, City" 
                                    required 
                                    rows={3}
                                    value={codAddress}
                                    onChange={(e) => setCodAddress(e.target.value)}
                                    className="gateway-input"
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </form>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Delivery charges apply depending on the destination city.
                        </p>
                    </div>
                </div>
            ),
            onlyFor: ['book']
        }
    };

    const filteredMethods = Object.values(paymentMethods).filter(m => !m.onlyFor || m.onlyFor.includes(type));

    if (paymentSuccess) {
        return (
            <div className="modal-overlay" onClick={handleOutsideClick}>
                <div className="modal-content checkout-modal-content success-modal">
                    <div className="success-content">
                        <FaCheckCircle color="#25D366" size={80} style={{ marginBottom: '1rem' }} />
                        <h2 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Order Placed Successfully!</h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
                            {selectedMethod === 'jazzcash' ? 'Your subscription has been activated.' : 'We will dispatch your book shortly.'}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Redirecting to home...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal-content checkout-modal-content">
                <button className="checkout-close-btn" onClick={handleClose}>&times;</button>

                {/* Left Side: Order Details Banner */}
                <div className="checkout-sidebar">
                    <div className="checkout-brand">
                        <FaShieldAlt size={24} color="#C9A962" /> Secure Checkout
                    </div>
                    <div className="checkout-item-info">
                        <h3 className="checkout-item-title">{decodedItemName}</h3>
                        <div className="checkout-price-wrap">
                            <span className="checkout-currency">Rs.</span>
                            <span className="checkout-amount">{parseFloat(price).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="checkout-perks">
                        <div className="checkout-perk"><FaCheckCircle color="#C9A962"/> Instant Order Processing</div>
                        {selectedMethod === 'jazzcash' ? (
                            <div className="checkout-perk"><FaCheckCircle color="#C9A962"/> 100% Safe & Secure</div>
                        ) : (
                            <div className="checkout-perk"><FaCheckCircle color="#C9A962"/> Quality Guaranteed</div>
                        )}
                        <div className="checkout-perk"><FaCheckCircle color="#C9A962"/> 24/7 Premium Support</div>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="checkout-main">
                    <div className="checkout-steps">
                        <div className="checkout-step active">
                            <span className="step-num">1</span>
                            <span className="step-text">Details</span>
                        </div>
                        <div className="checkout-step">
                            <span className="step-num">2</span>
                            <span className="step-text">Confirmation</span>
                        </div>
                    </div>

                    <div className="checkout-methods-grid">
                        {filteredMethods.map((method) => (
                            <div 
                                key={method.id}
                                className={`checkout-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                                onClick={() => setSelectedMethod(method.id)}
                                style={{ '--theme-color': method.color }}
                            >
                                <div className="checkout-method-icon" style={{ color: selectedMethod === method.id ? '#fff' : method.color }}>
                                    {method.icon}
                                </div>
                                <span className="checkout-method-name">{method.name}</span>
                                {selectedMethod === method.id && <div className="checkout-method-check"><FaCheckCircle /></div>}
                            </div>
                        ))}
                    </div>

                    <div className="checkout-active-details">
                        {paymentMethods[selectedMethod].details}
                    </div>

                    <div className="checkout-action-area">
                        {selectedMethod === 'jazzcash' ? (
                            <>
                                <p className="checkout-instruction-note">
                                    By clicking pay, you authorize the charge to your JazzCash account.
                                </p>
                                <button 
                                    className="btn-jazzcash-checkout" 
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <><FaSpinner className="spin" /> Processing...</> : `Pay Rs. ${parseFloat(price).toLocaleString()}`}
                                </button>
                                <p className="checkout-secure-footer">
                                    <FaLock /> SSL Secured Gateway
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="checkout-instruction-note">
                                    Please ensure your delivery details are correct. You will pay cash to the rider.
                                </p>
                                <button 
                                    className="btn-cod-checkout" 
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <><FaSpinner className="spin" /> Processing...</> : `Confirm Order for Rs. ${parseFloat(price).toLocaleString()}`}
                                </button>
                                <p className="checkout-secure-footer">
                                    <FaMapMarkerAlt /> Deliver anywhere in Pakistan
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
