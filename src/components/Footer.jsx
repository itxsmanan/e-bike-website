import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const footerUrdu = 'کتابوں کی دولت';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: targetId } });
        } else {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <footer className="relative mt-20 pt-20 overflow-hidden">
            {/* Glassmorphic Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-slate/30 backdrop-blur-[20px] border-t border-border" />
                {/* Subtle gradient glowing orbs for extra premium feel */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] translate-y-1/2" />
                
                {/* Top border highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-8 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <h3 className="font-[Noto_Nastaliq_Urdu] text-[2.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-bright leading-tight drop-shadow-sm" lang="ur" dir="rtl">
                            {footerUrdu}
                        </h3>
                        <p className="text-text-dim leading-relaxed text-[0.95rem] pr-4">
                            Founded by Dolat Khan Kakar, Pakistan's premier platform for quality literature. Our mission: make books accessible to every Pakistani household.
                        </p>
                        
                        {/* Glassmorphic Social Links */}
                        <div className="flex items-center gap-3 mt-2">
                            {[
                                { icon: <FaFacebookF size={18} />, label: "Facebook" },
                                { icon: <FaTwitter size={18} />, label: "Twitter" },
                                { icon: <FaInstagram size={18} />, label: "Instagram" },
                                { icon: <FaLinkedinIn size={18} />, label: "LinkedIn" },
                                { icon: <FaYoutube size={18} />, label: "YouTube" }
                            ].map((social, idx) => (
                                <a 
                                    key={idx} 
                                    href="#" 
                                    aria-label={social.label}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-deep/40 border border-border text-text-dim transition-all duration-300 hover:-translate-y-1 hover:bg-gold/10 hover:border-gold/30 hover:text-gold hover:shadow-[0_4px_16px_rgba(201,169,98,0.15)] group"
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-5">
                        <h4 className="text-[1.1rem] font-bold text-text mb-2 relative inline-block w-max">
                            Explore
                            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gold rounded-full" />
                        </h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#books" onClick={(e) => handleScroll(e, 'books')} className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> All Books</a></li>
                            <li><a href="#audiobooks" onClick={(e) => handleScroll(e, 'audiobooks')} className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Audiobooks</a></li>
                            <li><a href="#events" onClick={(e) => handleScroll(e, 'events')} className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Celebrity Events</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <h4 className="text-[1.1rem] font-bold text-text mb-2 relative inline-block w-max">
                            Support
                            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gold rounded-full" />
                        </h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/help" className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Help Center</Link></li>
                            <li><Link to="/faqs" className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> FAQs</Link></li>
                            <li><Link to="/contact" className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Contact Us</Link></li>
                            <li><Link to="/shipping" className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Shipping Info</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <h4 className="text-[1.1rem] font-bold text-text mb-2 relative inline-block w-max">
                            Company
                            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gold rounded-full" />
                        </h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> About Dolat</a></li>
                            <li><Link to="/privacy" className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-text-dim hover:text-gold transition-colors text-[0.95rem] flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" /> Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-sm text-center md:text-left">
                        &copy; 2026 Kitabon Ki Dolat. All rights reserved.
                    </p>
                    <p className="text-text-muted text-sm text-center md:text-right flex items-center gap-1.5">
                        Designed with <span className="text-rose animate-pulse">❤️</span> by Dolat Khan Kakar
                    </p>
                </div>
            </div>
        </footer>
    );
}
