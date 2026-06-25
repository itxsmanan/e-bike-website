import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
    const orderViaWhatsApp = () => {
        const phoneNumber = "923355495173";
        const message = encodeURIComponent("Assalam o Alaikum! I want to order from Kitabon Ki Dolat.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="whatsapp-float">
            <button 
                className="whatsapp-btn" 
                type="button" 
                onClick={orderViaWhatsApp} 
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp size={32} color="#FFF" />
            </button>
        </div>
    );
}
