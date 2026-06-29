import { FaBookOpen, FaBriefcase, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaQuoteLeft, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import authorPhoto from '../assets/Dolat khan.jpeg';

const mediaLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', color: '#1877F2', href: 'https://www.facebook.com/share/18vdJmDF1i/' },
    { icon: <FaInstagram />, label: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/kitabonkidolat?igsh=cTV5amZrcmV4ZjNy' },
    { icon: <FaTiktok />, label: 'TikTok', color: '#000000', href: 'https://www.tiktok.com/@kitabon.ki.dolat?_r=1&_t=ZS-96fIBOm3b3V' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', color: '#25D366', href: 'https://wa.me/923410889909' },
];

const authorBooks = [
    {
        title: 'The Power of Minor Shift',
        text: 'A confession, a recovery, and a guide for anyone standing at a crossroads they did not choose.',
    },
    {
        title: 'The Surviving Age',
        text: 'A raw portrait of the invisible middle-class war: being seen, surviving, and still trying to breathe.',
    },
    {
        title: 'Before I Learned to Live',
        text: 'A novel about Arlo, broken by love, rebuilt by life, and brave enough to open his heart again.',
    },
    {
        title: 'Two Bags, No Plan',
        text: 'A joyful travel memoir about chaos, accidental wisdom, and the freedom of letting life happen.',
    },
];

const bioSections = [
    {
        eyebrow: 'The Beginning',
        text: 'There are writers who choose writing. And then there are those whom life chooses - who arrive at the page not because they planned to, but because they had no other honest option left. Dolat Khan Kakar belongs to the second kind.',
    },
    {
        eyebrow: 'Quetta, Balochistan',
        text: 'Born and raised in Quetta, Balochistan - a city of quiet resilience, ancient culture, and unspoken struggles - Dolat grew up watching capable people fall short of their own potential. Not because they lacked intelligence or ambition, but because life had pulled them away from themselves. Distracted. Unfocused. Lost somewhere between survival and the dream of something better.',
    },
    {
        eyebrow: 'The Turning Point',
        text: 'In his mid-twenties, while completing his final year of law school, Dolat experienced a deeply personal and transformative moment that changed the direction of his life. He does not speak about it in interviews. He wrote it into a book. The Power of Minor Shift was born from the realization that life changes through small, deliberate shifts made consistently, even when everything around you is falling apart.',
    },
    {
        eyebrow: 'A Human Philosophy',
        text: 'Four books. Four different worlds. But one unwavering belief runs through all of them: every human being, regardless of where they come from or what they have been through, is capable of far more than they are currently living. The problem is never ability. The problem is always distraction.',
    },
    {
        eyebrow: 'Writing For The World',
        text: 'Dolat writes in English by deliberate choice. The struggles he writes about - middle-class pressure, a broken heart, the hunger to grow, and the joy of an unplanned adventure - are not only Pakistani problems. They are human problems. They exist in Quetta and Karachi, but also in London, Nairobi, Toronto, and Jakarta.',
    },
    {
        eyebrow: 'Kitabon Ki Dolat',
        text: 'Through Kitabon Ki Dolat, Dolat has built more than a platform. He has built a philosophy: reading is not a luxury or a hobby, but the single most powerful act of self-investment a person can make. In a world of endless scrolling and shrinking attention spans, he stands firmly on the side of the page.',
    },
];

export default function AboutAuthor() {
    return (
        <section className="section about-section about-author-modern" id="about">
            <div className="about-modern-shell reveal">
                <div className="about-modern-visual">
                    <div className="about-photo-card">
                        <img src={authorPhoto} alt="Dolat Khan Kakar" className="about-author-photo" />
                    </div>

                    <div className="about-identity-card">
                        <span className="section-label">The Author</span>
                        <h2>Dolat Khan Kakar</h2>
                        <div className="about-meta-list">
                            <span><FaBookOpen /> Author</span>
                            <span><FaBriefcase /> Lawyer</span>
                            <span><FaMapMarkerAlt /> Quetta, Balochistan</span>
                        </div>
                        <div className="about-media-links" aria-label="Author media links">
                            {mediaLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    aria-label={link.label}
                                    title={link.label}
                                    style={{ '--media-color': link.color }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="about-modern-copy">
                    <div className="about-quote-card">
                        <FaQuoteLeft className="about-quote-icon" />
                        <p>"Everyone is capable. The only thing standing between them and their potential is distraction."</p>
                    </div>

                    <div className="about-intro-copy">
                        {bioSections.map((section) => (
                            <article className="about-bio-block" key={section.eyebrow}>
                                <span>{section.eyebrow}</span>
                                <p>{section.text}</p>
                            </article>
                        ))}
                    </div>

                    <div className="about-book-grid">
                        {authorBooks.map((book) => (
                            <article className="about-book-note" key={book.title}>
                                <h3>{book.title}</h3>
                                <p>{book.text}</p>
                            </article>
                        ))}
                    </div>

                    <div className="about-closing-quote">
                        "When you read, you think. When you think, you grow. When you grow - nothing can stop you."
                    </div>
                </div>
            </div>
        </section>
    );
}
