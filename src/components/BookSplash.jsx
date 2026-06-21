import { useState, useEffect } from 'react';

export default function BookSplash() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div id="bookSplash">
            <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            <div className="book-container-splash">
                <div className="book-3d">
                    <div className="book-spine"></div>

                    <div className="book-cover-splash">
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <h1 lang="ur" dir="rtl">کتابوں کی دولت</h1>
                        <p>KITABON KI DOLAT</p>
                    </div>

                    <div className="book-pages">
                        <p>"True wealth lies not in gold,<br />but in the pages of books..."</p>
                    </div>

                    <div className="page-turn"></div>
                </div>
            </div>

            <div className="splash-quote" lang="ur" dir="rtl">اصلی دولت کتابوں میں ہے</div>
            <div className="loading-text">Opening your library</div>
        </div>
    );
}
