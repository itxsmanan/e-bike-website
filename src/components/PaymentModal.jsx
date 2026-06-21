import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PaymentModal() {
    const { itemName, price } = useParams();
    const navigate = useNavigate();
    const decodedItemName = itemName ? decodeURIComponent(itemName) : '';

    useEffect(() => {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        return () => {
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        };
    }, []);

    const handleClose = () => {
        navigate('/');
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const confirmOrderViaWhatsApp = () => {
        const phoneNumber = "923XXXXXXXXX"; // REPLACE WITH YOUR NUMBER
        const message = encodeURIComponent(`Assalam o Alaikum!\n\nI want to order:\n${decodedItemName}\nPrice: Rs. ${price}\n\nPlease confirm my order.`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="payment-modal active" onClick={handleOutsideClick}>
            <div className="payment-container">
                <span className="close-modal" onClick={handleClose}>&times;</span>
                <div className="payment-header">
                    <h2 className="payment-title">Complete Your Purchase</h2>
                    <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                        {decodedItemName} - Rs. {parseFloat(price).toLocaleString()}
                    </p>
                </div>

                <div className="payment-methods">
                    <div className="payment-method">
                        <h3>{'\ud83d\udcb3'} EasyPaisa</h3>
                        <div className="payment-details">
                            <p>Send payment to:</p>
                            <strong>03XX-XXXXXXX</strong>
                            <strong>Name: Dolat Khan Kakar</strong>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>After payment, send screenshot via WhatsApp</p>
                        </div>
                    </div>

                    <div className="payment-method">
                        <h3>{'\ud83c\udfe6'} Bank Transfer</h3>
                        <div className="payment-details">
                            <p>Transfer to:</p>
                            <strong>Bank Alfalah</strong>
                            <strong>Account: XXXXXXXXXXXX</strong>
                            <strong>Title: Dolat Khan Kakar</strong>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Send payment slip via WhatsApp</p>
                        </div>
                    </div>

                    <div className="payment-method">
                        <h3>{'\ud83d\udcb5'} Cash on Delivery</h3>
                        <div className="payment-details">
                            <p>Available in major cities:</p>
                            <strong>Lahore &bull; Karachi &bull; Islamabad</strong>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Pay when you receive your order</p>
                        </div>
                    </div>
                </div>

                <button className="btn-whatsapp" onClick={confirmOrderViaWhatsApp}>
                    {'\ud83d\udcac'} Confirm Order via WhatsApp
                </button>
            </div>
        </div>
    );
}
