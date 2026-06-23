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
                    <img src="/logo-emblem.png" alt="Logo" className="splash-book-icon" />
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
