export default function WhatsAppFloat() {
    const orderViaWhatsApp = () => {
        const phoneNumber = "923XXXXXXXXX"; // REPLACE WITH YOUR NUMBER
        const message = encodeURIComponent("السلام علیکم! I want to order from Kitabon Ki Dolat.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="whatsapp-float" onClick={orderViaWhatsApp}>
            💬
        </div>
    );
}
