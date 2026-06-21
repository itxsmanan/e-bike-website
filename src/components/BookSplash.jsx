import { useState, useEffect } from 'react';

export default function BookSplash() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3500); // reduced from 6s to 3.5s for better UX

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div id="bookSplash" className="splash-screen">
            {/* Ambient background particles */}
            <div className="particles">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className={`particle p-${i + 1}`}></div>
                ))}
            </div>

            <div className="splash-content">
                <div className="splash-logo-container">
                    <div className="splash-glow"></div>
                    <svg className="splash-book-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        <path d="M12 6v6" className="splash-icon-anim delay-1" />
                        <path d="M9 9h6" className="splash-icon-anim delay-2" />
                    </svg>
                </div>

                <div className="splash-text-group">
                    <h1 className="splash-urdu" lang="ur" dir="rtl">کتابوں کی دولت</h1>
                    <h2 className="splash-english">KITABON KI DOLAT</h2>
                </div>

                <div className="splash-loader">
                    <div className="splash-loader-bar"></div>
                </div>
                
                <p className="splash-status">Opening your library...</p>
            </div>
        </div>
    );
}
