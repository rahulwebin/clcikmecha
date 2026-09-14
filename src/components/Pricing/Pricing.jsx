import React from 'react';
import './Pricing.css';
import { useContactModal } from '../../context/ContactModalContext';

const Pricing = () => {
    const { openModal } = useContactModal();

    const plans = [
        {
            id: 1,
            price: "₹21,999",
            originalPrice: "₹40,000",
            discount: "SAVE 30%",
            description: "If your mobile conversions lag, UI/UX can ensure your site works smoothly all devices.",
            features: [
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co"
            ],
            highlight: false
        },
        {
            id: 2,
            price: "₹25,999",
            originalPrice: "₹40,000",
            discount: "SAVE 30%",
            description: "If your mobile conversions lag, UI/UX can ensure your site works smoothly all devices.",
            features: [
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co"
            ],
            highlight: true
        },
        {
            id: 3,
            price: "₹29,999",
            originalPrice: "₹40,000",
            discount: "SAVE 30%",
            description: "If your mobile conversions lag, UI/UX can ensure your site works smoothly all devices.",
            features: [
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co",
                "Lorem ipsum dolor sit amet, co"
            ],
            highlight: false
        }
    ];

    return (
        <section className="pricing-section">
            <div className="container">
                <h2 className="pricing-title text-center">Our plans to get started</h2>

                <div className="row g-4 justify-content-center align-items-center">
                    {plans.map((plan) => (
                        <div key={plan.id} className="col-lg-4 col-md-6">
                            <div className={`pricing-card ${plan.highlight ? 'highlight-card' : ''}`}>

                                <div className="discount-badge">{plan.discount}</div>

                                <div className="price-header">
                                    <h3 className="price">{plan.price}</h3>
                                    <span className="original-price">{plan.originalPrice}</span>
                                </div>

                                <p className="plan-description">{plan.description}</p>

                                <ul className="feature-list">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>
                                            {plan.highlight ? (
                                                <CheckIconDark />
                                            ) : (
                                                <CheckIconOrange />
                                            )}
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn-book-pricing" onClick={openModal}>BOOK A FREE CALL</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CheckIconOrange = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-icon">
        <circle cx="12" cy="12" r="10" fill="#F7941E" />
        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckIconDark = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-icon">
        <circle cx="12" cy="12" r="10" fill="#0E1D28" />
        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Pricing;
