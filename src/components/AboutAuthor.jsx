export default function AboutAuthor() {
    return (
        <section className="section" id="about" style={{ background: 'var(--slate)', margin: '0', maxWidth: '100%' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '0 2rem' }}>
                <div className="section-label">The Author</div>
                <h2 className="section-title">Dolat Khan Kakar</h2>
                <p style={{ fontSize: '1.3rem', lineHeight: '1.9', color: 'var(--text-dim)', margin: '2rem 0' }}>
                    Dolat Khan Kakar is a celebrated Pakistani author, publisher, and advocate for literacy. His name, meaning "wealth" in Urdu, perfectly embodies his philosophy: <em style={{ color: 'var(--gold)' }}>true richness comes not from material possessions, but from the knowledge and wisdom found in books.</em>
                </p>
                <p style={{ fontSize: '1.3rem', lineHeight: '1.9', color: 'var(--text-dim)', margin: '2rem 0' }}>
                    With over 100 published works spanning fiction, non-fiction, poetry, and self-help, Dolat has touched the lives of 50,000+ readers across Pakistan and beyond. His mission is simple: make quality literature accessible to every Pakistani household.
                </p>
            </div>
        </section>
    );
}
