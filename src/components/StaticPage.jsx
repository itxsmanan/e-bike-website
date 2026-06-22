import { useEffect } from 'react';
import { FaHeadset, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown, FaPaperPlane, FaTruck, FaUndo, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import Footer from './Footer';

const pageData = {
    'Help Center': {
        icon: <FaHeadset />,
        subtitle: "How can we help you today?",
        content: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-deep/20 rounded-2xl border border-border-custom/50 hover:border-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:-translate-y-1">
                    <h3 className="text-gold group-hover:text-gold-bright text-lg font-bold mb-2 transition-colors duration-200">Track Order</h3>
                    <p className="text-text-dim text-sm leading-relaxed">Check the status of your recent book deliveries and tracking updates.</p>
                </div>
                <div className="p-6 bg-deep/20 rounded-2xl border border-border-custom/50 hover:border-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:-translate-y-1">
                    <h3 className="text-gold group-hover:text-gold-bright text-lg font-bold mb-2 transition-colors duration-200">Manage Subscription</h3>
                    <p className="text-text-dim text-sm leading-relaxed">Upgrade, update billing, or cancel your digital reading access.</p>
                </div>
                <div className="p-6 bg-deep/20 rounded-2xl border border-border-custom/50 hover:border-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:-translate-y-1">
                    <h3 className="text-gold group-hover:text-gold-bright text-lg font-bold mb-2 transition-colors duration-200">Account Settings</h3>
                    <p className="text-text-dim text-sm leading-relaxed">Update your email, password, profile information, and preferences.</p>
                </div>
                <div className="p-6 bg-deep/20 rounded-2xl border border-border-custom/50 hover:border-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:-translate-y-1">
                    <h3 className="text-gold group-hover:text-gold-bright text-lg font-bold mb-2 transition-colors duration-200">Payment Issues</h3>
                    <p className="text-text-dim text-sm leading-relaxed">Resolve failed transactions, invoice downloads, and billing questions.</p>
                </div>
            </div>
        )
    },
    'Frequently Asked Questions': {
        icon: <FaChevronDown />,
        subtitle: "Quick answers to common questions",
        content: () => (
            <div className="flex flex-col gap-6">
                <div className="border-b border-border-custom/50 pb-5 last:border-none last:pb-0 group">
                    <h4 className="text-text-body group-hover:text-gold font-bold text-lg mb-2 transition-colors duration-200">How long does delivery take?</h4>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Standard delivery within Pakistan takes 2-4 business days. Remote areas may take up to 7 days.</p>
                </div>
                <div className="border-b border-border-custom/50 pb-5 last:border-none last:pb-0 group">
                    <h4 className="text-text-body group-hover:text-gold font-bold text-lg mb-2 transition-colors duration-200">How does the digital subscription work?</h4>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Once you subscribe via JazzCash, you get instant access to our entire e-book library on any device.</p>
                </div>
                <div className="border-b border-border-custom/50 pb-5 last:border-none last:pb-0 group">
                    <h4 className="text-text-body group-hover:text-gold font-bold text-lg mb-2 transition-colors duration-200">Do you offer Cash on Delivery (COD)?</h4>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Yes, we offer Cash on Delivery for all physical book orders nationwide.</p>
                </div>
                <div className="border-b border-border-custom/50 pb-5 last:border-none last:pb-0 group">
                    <h4 className="text-text-body group-hover:text-gold font-bold text-lg mb-2 transition-colors duration-200">Can I return a damaged book?</h4>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Absolutely. If you receive a damaged copy, please contact us within 7 days for a free replacement.</p>
                </div>
            </div>
        )
    },
    'Contact Us': {
        icon: <FaEnvelope />,
        subtitle: "We'd love to hear from you",
        content: () => (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                {/* Info Block */}
                <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-gold text-lg flex-shrink-0">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h4 className="text-text-body font-bold text-base mb-1">Address</h4>
                            <p className="text-text-dim text-sm leading-relaxed">Dolat Khan Kakar Publishing<br />Islamabad, Pakistan</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-gold text-lg flex-shrink-0">
                            <FaPhone />
                        </div>
                        <div>
                            <h4 className="text-text-body font-bold text-base mb-1">Phone</h4>
                            <p className="text-text-dim text-sm leading-relaxed">+92 300 0000000</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-gold text-lg flex-shrink-0">
                            <FaEnvelope />
                        </div>
                        <div>
                            <h4 className="text-text-body font-bold text-base mb-1">Email</h4>
                            <p className="text-text-dim text-sm leading-relaxed">support@kitabonkidolat.pk</p>
                        </div>
                    </div>
                </div>

                {/* Form Block */}
                <form className="md:col-span-7 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-midnight/35 border border-border-custom/80 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl text-text-body placeholder:text-text-muted transition-all outline-none text-sm" 
                            placeholder="Your Name" 
                            required 
                        />
                    </div>
                    <div>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 bg-midnight/35 border border-border-custom/80 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl text-text-body placeholder:text-text-muted transition-all outline-none text-sm" 
                            placeholder="Your Email" 
                            required 
                        />
                    </div>
                    <div>
                        <textarea 
                            className="w-full px-4 py-3 bg-midnight/35 border border-border-custom/80 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl text-text-body placeholder:text-text-muted transition-all outline-none text-sm" 
                            rows={5} 
                            placeholder="Your Message" 
                            required 
                            style={{ resize: 'none' }}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3.5 bg-gold hover:bg-gold-bright active:translate-y-0.5 text-midnight font-bold rounded-xl shadow-lg shadow-gold/10 hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider"
                    >
                        <FaPaperPlane className="text-xs" /> Send Message
                    </button>
                </form>
            </div>
        )
    },
    'Shipping Information': {
        icon: <FaTruck />,
        subtitle: "Everything you need to know about our delivery process",
        content: () => (
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Delivery Timeframes</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">We process all orders within 24 hours. Standard shipping takes 2-4 business days for major cities (Karachi, Lahore, Islamabad, Rawalpindi) and 4-7 business days for other regions.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Shipping Charges</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">A flat rate of Rs. 150 applies to all orders under Rs. 2000. Orders above Rs. 2000 qualify for free nationwide shipping.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Order Tracking</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Once your order is dispatched, you will receive an SMS and email with your tracking number and a link to trace your parcel.</p>
                </div>
            </div>
        )
    },
    'Return Policy': {
        icon: <FaUndo />,
        subtitle: "Our 7-day hassle-free return policy",
        content: () => (
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Eligibility for Returns</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">You may return physical books within 7 days of delivery if they are defective, damaged, or incorrect. Books must be in their original, unread condition with all packaging intact.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Non-Returnable Items</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Digital subscriptions and audiobooks are non-refundable once accessed or downloaded.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">How to Initiate a Return</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Please email support@kitabonkidolat.pk with your order number and photos of the issue. We will arrange a pickup or provide an address for return shipping.</p>
                </div>
            </div>
        )
    },
    'Privacy Policy': {
        icon: <FaShieldAlt />,
        subtitle: "How we protect your data",
        content: () => (
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Information We Collect</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">We collect information you provide directly to us when you create an account, make a purchase, or contact support. This includes your name, email, phone number, and shipping address.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">How We Use Your Information</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Your data is used strictly to process your orders, manage your digital subscriptions, and communicate with you about updates or promotional offers (if you opt-in).</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Payment Security</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">We do not store your credit card or JazzCash MPIN details. All transactions are securely processed through encrypted payment gateways.</p>
                </div>
            </div>
        )
    },
    'Terms of Service': {
        icon: <FaFileContract />,
        subtitle: "Rules and guidelines for using our platform",
        content: () => (
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Acceptance of Terms</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">By accessing Kitabon Ki Dolat, you agree to be bound by these Terms of Service. If you disagree with any part, you may not use our services.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Digital Content License</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">Subscribing grants you a limited, non-exclusive, non-transferable license to access our digital library for personal, non-commercial use only. You may not distribute or copy the content.</p>
                </div>
                <div>
                    <h3 className="text-text-body font-bold text-xl mb-3 border-l-4 border-gold pl-3">Modifications</h3>
                    <p className="text-text-dim text-sm md:text-base leading-relaxed">We reserve the right to modify these terms or subscription pricing at any time. Continued use of the platform constitutes acceptance of the new terms.</p>
                </div>
            </div>
        )
    }
};

export default function StaticPage({ title }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [title]);

    const page = pageData[title];

    return (
        <div className="min-h-screen flex flex-col bg-midnight text-text-body transition-colors duration-300 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none"></div>
            
            {/* Hero Banner */}
            <div className="relative pt-32 pb-16 px-6 text-center border-b border-border-custom/30 bg-gradient-to-b from-midnight via-midnight/95 to-midnight/90">
                <div className="inline-block text-5xl text-gold mb-6 animate-[pulse_3s_ease-in-out_infinite]">
                    {page?.icon || <FaFileContract />}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-text-body via-gold-bright to-gold bg-clip-text text-transparent mb-4">
                    {title}
                </h1>
                <p className="text-base md:text-lg text-text-muted font-medium max-w-xl mx-auto leading-relaxed">
                    {page?.subtitle || "Information and policies"}
                </p>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 py-12 md:py-16 px-4 md:px-8 max-w-5xl w-full mx-auto relative z-10">
                <div className="bg-deep/45 backdrop-blur-md border border-border-custom rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
                    {page?.content() || (
                        <p className="text-center text-text-dim text-base">
                            This page is currently under construction. Please check back later for full details.
                        </p>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
