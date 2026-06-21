const achievements = [
    { number: '100+', label: 'Published Works' },
    { number: '50K+', label: 'Lives Touched' },
    { number: '10+',  label: 'Years Writing' },
    { number: '4+',   label: 'Literary Awards' },
];

export default function AboutAuthor() {
    return (
        <section className="section about-section" id="about">
            <div className="about-author-content reveal">

                <div className="about-author-avatar-ring">
                    <div className="about-author-avatar-ring-inner">✍️</div>
                </div>

                <div className="section-label" style={{ margin: '0 auto 1rem' }}>The Author</div>
                <h2 className="section-title">Dolat Khan Kakar</h2>

                <div className="about-quote">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--gold)" opacity="0.3" aria-hidden="true">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                </div>

                <p>
                    Dolat Khan Kakar is a celebrated Pakistani author, publisher, and advocate for literacy.
                    His name, meaning <em>"wealth"</em> in Urdu, perfectly embodies his philosophy:
                    true richness comes not from material possessions, but from the knowledge and wisdom
                    found in books.
                </p>
                <p>
                    With over 100 published works spanning fiction, non-fiction, poetry, and self-help,
                    Dolat has touched the lives of 50,000+ readers across Pakistan and beyond. His mission
                    is simple: make quality literature accessible to every Pakistani household.
                </p>

                <div className="about-achievements">
                    {achievements.map((a, i) => (
                        <div key={i} className="achievement-item">
                            <span className="achievement-number">{a.number}</span>
                            <span className="achievement-label">{a.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
