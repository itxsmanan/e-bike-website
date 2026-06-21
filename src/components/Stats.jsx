import { useEffect, useRef, useState } from 'react';

const statsData = [
    { number: '100+', label: 'Published Books', icon: '📚' },
    { number: '50K+', label: 'Happy Readers',   icon: '❤️' },
    { number: '4',    label: 'E-Books Live',     icon: '📱' },
    { number: '24/7', label: 'Library Access',   icon: '🌙' },
];

export default function Stats() {
    const [counted, setCounted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setCounted(true); },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="stats" ref={ref}>
            <div className="stats-container">
                {statsData.map((item, i) => (
                    <div
                        key={i}
                        className="stat-item"
                        style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                        <div className="stat-icon">{item.icon}</div>
                        <span className={`stat-number ${counted ? 'stat-counted' : ''}`}>
                            {item.number}
                        </span>
                        <span className="stat-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
