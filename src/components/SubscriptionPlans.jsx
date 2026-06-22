import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const defaultPlans = [
    {
        name: "Monthly",
        price: 499,
        period: "/month",
        saveText: "Perfect for trial",
        features: [
            "Full E-Library access",
            "Unlimited book downloads",
            "Audio book streaming",
            "Mobile & tablet apps",
            "Cancel anytime"
        ],
        btnText: "Start Free Trial",
        isGold: false,
        isPopular: false
    },
    {
        name: "Quarterly",
        price: 1299,
        period: "/3 months",
        saveText: "Save 13% \u2022 Rs. 433/month",
        features: [
            "Everything in Monthly",
            "Priority support",
            "Early book access",
            "Exclusive Q&As",
            "10% off print books"
        ],
        btnText: "Subscribe Now",
        isGold: false,
        isPopular: false
    },
    {
        name: "Half-Yearly",
        price: 2399,
        period: "/6 months",
        saveText: "Save 20% \u2022 Rs. 400/month",
        features: [
            "Everything in Quarterly",
            "1 signed paperback free",
            "Private community access",
            "Reading analytics",
            "20% off print books"
        ],
        btnText: "Best Value",
        isGold: true,
        isPopular: true,
        badge: "Most Popular"
    },
    {
        name: "9-Month Plan",
        price: 3299,
        period: "/9 months",
        saveText: "Save 26% \u2022 Rs. 367/month",
        features: [
            "Everything in Half-Yearly",
            "2 signed books included",
            "Virtual author meetups",
            "Gift 1 month to friend",
            "25% off print books"
        ],
        btnText: "Subscribe Now",
        isGold: false,
        isPopular: false
    },
    {
        name: "Annual",
        price: 3999,
        period: "/year",
        saveText: "Save 33% \u2022 Rs. 333/month",
        features: [
            "Everything in 9-Month",
            "3 signed books + merch",
            "Lifetime print discounts",
            "Name in acknowledgments",
            "Annual gala invite"
        ],
        btnText: "Join Now",
        isGold: true,
        isPopular: false,
        badge: "Best Deal"
    }
];

export default function SubscriptionPlans() {
    const navigate = useNavigate();

    let plans = defaultPlans;
    try {
        const local = localStorage.getItem('kitabon_plans');
        if (local) {
            plans = JSON.parse(local);
        } else {
            localStorage.setItem('kitabon_plans', JSON.stringify(defaultPlans));
        }
    } catch (e) {
        plans = defaultPlans;
    }

    const handleSubscribe = (name, price) => {
        navigate(`/payment/sub/${encodeURIComponent(name + ' Subscription')}/${price}`);
    };

    return (
        <section className="subscription-section" id="subscriptions">
            <div className="section-header section-header-with-nav">
                <div className="header-content">
                    <div className="section-label">Premium Access</div>
                    <h2 className="section-title">Unlimited Reading Plans</h2>
                    <p className="section-subtitle">Get access to everything above with our affordable membership plans</p>
                </div>
                <div className="modern-slider-nav">
                    <button className="nav-btn plans-prev">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="nav-btn plans-next">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                    prevEl: '.plans-prev',
                    nextEl: '.plans-next',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 3 }
                }}
                className="plans-swiper"
                style={{ padding: '2rem 1rem 4rem 1rem' }}
            >
                {plans.map((plan, idx) => (
                    <SwiperSlide key={idx} style={{ height: 'auto' }}>
                        <div
                            className={`plan-card ${plan.isPopular ? 'plan-popular' : ''}`}
                            style={{ height: '100%' }}
                        >
                            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                            <h3 className="plan-name">{plan.name}</h3>
                            <div className="plan-price">
                                <span className="price-amount">Rs. {plan.price.toLocaleString()}</span>
                                <span style={{ color: 'var(--text-dim)' }}>{plan.period}</span>
                            </div>
                            <p className="plan-save">{plan.saveText}</p>
                            <ul className="plan-features">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx}>{feature}</li>
                                ))}
                            </ul>
                            <button
                                className={`btn-plan ${plan.isGold ? 'btn-plan-gold' : 'btn-plan-accent'}`}
                                onClick={() => handleSubscribe(plan.name, plan.price)}
                            >
                                {plan.btnText}
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
