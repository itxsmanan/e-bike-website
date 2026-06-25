import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaLock, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const EasypaisaLogo = ({ size = 44 }) => (
    <img
        src="/Easypaisa-logo.png"
        alt="EasyPaisa"
        className="ck-brand-logo ck-brand-logo--easypaisa"
        style={{ width: size, height: size }}
    />
);

const JazzCashLogo = ({ height = 32 }) => (
    <img
        src="/Jazzcash-new-logo.svg"
        alt="JazzCash"
        className="ck-brand-logo ck-brand-logo--jazzcash"
        style={{ height, width: 'auto' }}
    />
);

const ChevronDown = () => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BookThumb = () => (
    <div className="ck-book-thumb">
        <div className="ck-book-thumb-spine"/>
        <div className="ck-book-thumb-cover">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#C9A962" strokeWidth="1.5"/>
            </svg>
        </div>
    </div>
);

export default function CheckoutPage() {
    const { type, itemName, price } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, openAuthModal, subscribe } = useAuth();

    const decodedItemName = itemName ? decodeURIComponent(itemName) : 'Kitabon Ki Dolat';
    const parsedPrice = parseFloat(price) || 4500;
    const isSubscription = type === 'sub' || decodedItemName.toLowerCase().includes('subscription');
    const isAudio = type === 'audio' || decodedItemName.toLowerCase().includes('audiobook');
    const isDigitalProduct = isSubscription || isAudio;
    const shipping = isDigitalProduct ? 0 : 499;
    const total = parsedPrice + shipping;

    const [step, setStep] = useState('checkout');
    const [method, setMethod] = useState('easypaisa');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [countdown, setCountdown] = useState(45);
    const [isVerifying, setIsVerifying] = useState(false);
    const otpRefs = useRef([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if ((type === 'sub' || type === 'audio') && !isLoggedIn) {
            openAuthModal();
            navigate('/', { replace: true });
        }
    }, [type, isLoggedIn, openAuthModal, navigate]);

    useEffect(() => {
        if (step !== 'otp') return undefined;

        setCountdown(45);
        const id = setInterval(() => setCountdown((current) => {
            if (current <= 1) {
                clearInterval(id);
                return 0;
            }
            return current - 1;
        }), 1000);

        return () => clearInterval(id);
    }, [step]);

    const handlePhone = (event) => {
        const raw = event.target.value.replace(/\D/g, '').slice(0, 10);
        setPhone(raw);
    };

    const handleOtpChange = (index, value) => {
        const digit = value.replace(/\D/, '').slice(-1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);
        if (digit && index < 4) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKey = (index, event) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (event) => {
        const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
        const next = [...otp];
        pasted.split('').forEach((char, index) => {
            next[index] = char;
        });
        setOtp(next);
        otpRefs.current[Math.min(pasted.length, 4)]?.focus();
        event.preventDefault();
    };

    const handleCheckoutSubmit = (event) => {
        event.preventDefault();
        setStep('otp');
    };

    const handleVerify = async (event) => {
        event.preventDefault();
        setIsVerifying(true);

        setTimeout(async () => {
            if (type === 'sub') {
                try {
                    await subscribe();
                } catch (_) {}
            }
            setIsVerifying(false);
            setStep('success');
            setTimeout(() => navigate(type === 'sub' ? '/library' : '/'), 4000);
        }, 1800);
    };

    const isJazz = method === 'jazzcash';
    const methodColor = isJazz ? '#D8232A' : '#00A859';
    const selectedMethodName = isJazz ? 'JazzCash' : 'EasyPaisa';

    if (step === 'success') {
        return (
            <div className="ck-root">
                <div className="ck-success-card">
                    <div className="ck-sc-ring-wrap">
                        <svg className="ck-sc-svg" viewBox="0 0 110 110">
                            <circle className="ck-sc-circle" cx="55" cy="55" r="50" stroke="#22c55e" strokeWidth="5" fill="none"/>
                            <polyline
                                className="ck-sc-tick"
                                points="33,57 49,73 77,37"
                                stroke="#22c55e"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </div>
                    <h2 className="ck-sc-title">Payment Successful</h2>
                    <p className="ck-sc-msg">
                        Your payment of <strong style={{ color: 'var(--gold)' }}>PKR {total.toLocaleString()}</strong> has been completed successfully.
                    </p>
                    <button className="ck-btn-gold" onClick={() => navigate(type === 'sub' ? '/library' : '/')}>
                        View order
                    </button>
                    <p className="ck-sc-redir">You will be redirected automatically</p>
                </div>
            </div>
        );
    }

    if (step === 'otp') {
        return (
            <div className="ck-root">
                <div className="ck-otp-card">
                    <button className="ck-back" onClick={() => setStep('checkout')} aria-label="Back to checkout">
                        <FaArrowLeft size={13}/>
                    </button>

                    <div className="ck-otp-logo-wrap">
                        {isJazz ? <JazzCashLogo height={64}/> : <EasypaisaLogo size={82}/>}
                    </div>
                    <div className="ck-otp-brand-label" style={{ color: methodColor }}>
                        {selectedMethodName} verification
                    </div>
                    <p className="ck-otp-info-line">Enter the OTP sent to your mobile wallet number.</p>
                    <p className="ck-otp-phone-show">+92 {phone}</p>

                    <form onSubmit={handleVerify} className="ck-otp-form">
                        <div className="ck-otp-row" onPaste={handleOtpPaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(element) => { otpRefs.current[index] = element; }}
                                    className="ck-otp-box"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(event) => handleOtpChange(index, event.target.value)}
                                    onKeyDown={(event) => handleOtpKey(index, event)}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <p className="ck-otp-resend">
                            Resend OTP in <span style={{ color: methodColor }}>00:{String(countdown).padStart(2, '0')}</span>
                        </p>

                        <button type="submit" className="ck-btn-gold" disabled={isVerifying || otp.some((digit) => !digit)}>
                            <FaLock size={13}/>
                            {isVerifying ? 'Verifying...' : 'Verify and pay'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="ck-root">
            <div className="ck-page">
                <header className="ck-header">
                    <button type="button" className="ck-back-link" onClick={() => navigate(-1)}>
                        <FaArrowLeft size={12}/>
                        Back
                    </button>
                    <span className="ck-header-logo">
                        <span className="ck-logo-dot">
                            <FaLock size={12}/>
                        </span>
                        Secure Checkout
                    </span>
                </header>

                <main className="ck-content">
                    <section className="ck-summary-panel">
                        <div className="ck-summary-top">
                            <span className="ck-kicker">Payment</span>
                            <h1 className="ck-hero-title">Complete your order</h1>
                            <p className="ck-hero-sub">Fast mobile wallet checkout with encrypted OTP verification.</p>
                        </div>

                        <div className="ck-total-card">
                            <span>Total amount</span>
                            <strong>PKR {total.toLocaleString()}</strong>
                        </div>

                        <section className="ck-card">
                            <h3 className="ck-card-title">Order Summary</h3>
                            <div className="ck-item-row">
                                <BookThumb/>
                                <div className="ck-item-meta">
                                    <strong>{decodedItemName}</strong>
                                    <span>
                                        {isSubscription
                                            ? 'Digital membership plan'
                                            : isAudio
                                                ? 'Digital audiobook'
                                                : 'by Daiel Khan Kakar'}
                                    </span>
                                </div>
                            </div>

                            <div className="ck-sep"/>

                            <div className="ck-sum-row">
                                <span>{isSubscription ? 'Subscription' : isAudio ? 'Audiobook' : 'Subtotal'}</span>
                                <span>PKR {parsedPrice.toLocaleString()}</span>
                            </div>
                            {!isDigitalProduct && shipping > 0 && (
                                <div className="ck-sum-row">
                                    <span>Shipping</span>
                                    <span>PKR {shipping.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="ck-sum-row ck-sum-total">
                                <span>Total</span>
                                <span>PKR {total.toLocaleString()}</span>
                            </div>
                        </section>

                        <div className="ck-trust-row">
                            <span><FaShieldAlt size={12}/> Encrypted</span>
                            <span><FaLock size={12}/> OTP secured</span>
                        </div>
                    </section>

                    <form className="ck-payment-panel" onSubmit={handleCheckoutSubmit}>
                        <div className="ck-panel-head">
                            <span className="ck-step-pill">Step 1 of 2</span>
                            <h2>Select payment method</h2>
                            <p>Choose your wallet and enter the number linked with your account.</p>
                        </div>

                        <div className="ck-methods">
                            <label
                                className={`ck-method ${method === 'easypaisa' ? 'ck-method--active ep-active' : ''}`}
                                onClick={() => setMethod('easypaisa')}
                            >
                                <div className="ck-method-logo-box ep-box">
                                    <EasypaisaLogo size={72}/>
                                </div>
                                <div className="ck-method-text">
                                    <strong>EasyPaisa</strong>
                                    <span>Pay securely using your EasyPaisa wallet</span>
                                </div>
                                <div className={`ck-radio ${method === 'easypaisa' ? 'ck-radio--on ep-radio' : ''}`}>
                                    {method === 'easypaisa' && <div className="ck-radio-dot"/>}
                                </div>
                            </label>

                            <label
                                className={`ck-method ${method === 'jazzcash' ? 'ck-method--active jc-active' : ''}`}
                                onClick={() => setMethod('jazzcash')}
                            >
                                <div className="ck-method-logo-box jc-box">
                                    <JazzCashLogo height={62}/>
                                </div>
                                <div className="ck-method-text">
                                    <strong>JazzCash</strong>
                                    <span>Fast and secure mobile wallet payment</span>
                                </div>
                                <div className={`ck-radio ${method === 'jazzcash' ? 'ck-radio--on jc-radio' : ''}`}>
                                    {method === 'jazzcash' && <div className="ck-radio-dot"/>}
                                </div>
                            </label>
                        </div>

                        <section className="ck-phone-section">
                            <label className="ck-phone-label" htmlFor="ck-phone">Mobile wallet number</label>
                            <div className="ck-phone-wrap">
                                <div className="ck-phone-prefix">
                                    <span>+92</span>
                                    <ChevronDown/>
                                </div>
                                <input
                                    id="ck-phone"
                                    type="tel"
                                    className="ck-phone-input"
                                    placeholder="300 1234567"
                                    value={phone.replace(/(\d{3})(\d{0,7})/, (_, first, rest) => (rest ? `${first} ${rest}` : first))}
                                    onChange={handlePhone}
                                    required
                                />
                            </div>
                        </section>

                        <button type="submit" className="ck-pay-btn" id="ck-pay-now-btn">
                            Pay PKR {total.toLocaleString()}
                            <FaArrowRight size={14}/>
                        </button>

                        <p className="ck-secure-note">
                            <FaShieldAlt size={11}/>
                            Your payment information is protected.
                        </p>
                    </form>
                </main>
            </div>
        </div>
    );
}
