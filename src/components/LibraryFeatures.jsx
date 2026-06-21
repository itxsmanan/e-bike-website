export default function LibraryFeatures() {
    const features = [
        {
            icon: "📱",
            title: "Multi-Device Sync",
            desc: "Read on phone, tablet, or computer. Your progress syncs automatically across all devices."
        },
        {
            icon: "🌙",
            title: "Night Mode",
            desc: "Eye-friendly dark mode with customizable fonts and spacing for comfortable reading anytime."
        },
        {
            icon: "✏️",
            title: "Smart Annotations",
            desc: "Highlight passages, make notes, and bookmark pages. Export your reading notes anytime."
        },
        {
            icon: "📊",
            title: "Reading Analytics",
            desc: "Track your reading habits, set goals, and earn achievements as you complete books."
        },
        {
            icon: "💬",
            title: "Reader Community",
            desc: "Join discussions, share reviews, and connect with fellow readers who love the same books."
        },
        {
            icon: "🎁",
            title: "Gift Books",
            desc: "Send books as gifts with personalized messages. Perfect for birthdays and special occasions."
        }
    ];

    return (
        <section className="section" id="library">
            <div className="section-header">
                <div className="section-label">Digital Library</div>
                <h2 className="section-title">Your Personal E-Library</h2>
                <p className="section-subtitle">Everything you need for the perfect reading experience</p>
            </div>

            <div className="features-grid">
                {features.map((item, idx) => (
                    <div key={idx} className="feature-card">
                        <div className="feature-icon">{item.icon}</div>
                        <h3 className="feature-title">{item.title}</h3>
                        <p className="feature-desc">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
