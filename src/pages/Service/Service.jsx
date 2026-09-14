import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Service.css';
import { fetchServicesData } from '../../utils/api';
import Contact from '../../components/Contact/Contact';

// Service Icons (fallback)
import iconSocial from '../../assets/service-icons/social-media.png';
import iconWeb from '../../assets/service-icons/web-dev.png';
import iconUiUx from '../../assets/service-icons/ui-ux.png';
import iconPush from '../../assets/service-icons/push-notification.png';
import iconEcommerce from '../../assets/service-icons/ecommerce.png';
import iconApp from '../../assets/service-icons/app-dev.png';

import { FaLaptopCode, FaChartLine, FaHome } from 'react-icons/fa';
import { usePageMeta } from '../../hooks/usePageMeta';

const Service = () => {
    usePageMeta('services');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [services, setServices] = useState([]);
    const [whyChooseUs, setWhyChooseUs] = useState([]);

    // Fallback data
    const fallbackServices = [
        {
            title: "Social Media Marketing",
            short_description: "Amplify Your Brand's Voice: ClickMecha's social media marketing strategies are tailored for impact.",
            icon: iconSocial,
            slug: "social-media-marketing"
        },
        {
            title: "Website Development",
            short_description: "Responsive, SEO-optimized websites built with performance in mind.",
            icon: iconWeb,
            slug: "website-development"
        },
        {
            title: "UI/UX & Branding Design",
            short_description: "Modern, user-friendly designs and branding that make your business unforgettable.",
            icon: iconUiUx,
            slug: "ui-ux-branding"
        },
        {
            title: "Push Notification",
            short_description: "Send timely updates and engage your audience with personalized notifications.",
            icon: iconPush,
            slug: "push-notification"
        },
        {
            title: "E-Commerce Solutions",
            short_description: "Conversion-focused online stores with secure payments and smooth shopping experiences.",
            icon: iconEcommerce,
            slug: "ecommerce-solutions"
        },
        {
            title: "Mobile App Development",
            short_description: "iOS and Android apps designed for seamless user experiences.",
            icon: iconApp,
            slug: "mobile-app-development"
        }
    ];

    const fallbackWhyChooseUs = [
        {
            title: "Cutting-Edge Stack",
            description: "We don't do legacy. Work with React, Node.js, AI Agents, and modern tools.",
            icon: "laptop"
        },
        {
            title: "Impact & Growth",
            description: "Meritocracy over seniority. Clear paths for promotion and leading projects.",
            icon: "chart"
        },
        {
            title: "Flexibility",
            description: "We value output over hours. Enjoy hybrid and remote options.",
            icon: "home"
        }
    ];

    useEffect(() => {
        const loadServicesData = async () => {
            try {
                setLoading(true);
                const data = await fetchServicesData();

                if (data.status) {
                    setPageContent(data.page_content);
                    setServices(data.services || fallbackServices);
                    setWhyChooseUs(data.why_choose_us || fallbackWhyChooseUs);
                } else {
                    // Use fallback data if API returns unsuccessful status
                    setServices(fallbackServices);
                    setWhyChooseUs(fallbackWhyChooseUs);
                }
            } catch (err) {
                console.error('Failed to load services data:', err);
                setError(err.message);
                // Use fallback data on error
                setServices(fallbackServices);
                setWhyChooseUs(fallbackWhyChooseUs);
            } finally {
                setLoading(false);
            }
        };

        loadServicesData();
    }, []);

    // Helper function to get icon component
    const getIconComponent = (iconName) => {
        const iconMap = {
            'laptop': FaLaptopCode,
            'chart': FaChartLine,
            'home': FaHome
        };
        return iconMap[iconName] || FaLaptopCode;
    };


    if (loading) {
        return (
            <div className="service-page-container">
                <div className="container text-center" style={{ padding: '100px 20px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p style={{ marginTop: '20px', color: '#666' }}>Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="service-page-container">
            <div className="container">
                <div className="service-header text-center">
                    <h1 className="service-main-title">
                        {pageContent?.hero_title || `We offer ${services.length} core services`}
                    </h1>
                    {pageContent?.hero_subtitle && (
                        <p className="service-subtitle">{pageContent.hero_subtitle}</p>
                    )}
                </div>

                <div className="row justify-content-center">
                    {services.map((service, index) => (
                        <div key={service.id || index} className="col-lg-4 col-md-6 mb-4">
                            <div className="new-service-card">
                                <h3 className="new-service-title">{service.title}</h3>
                                {/* <Link
                                    to={service.slug ? `/service/${service.slug}` : "/contact"}
                                    className="new-service-read-more"
                                >
                                    READ MORE
                                </Link> */}

                                <div className="new-service-icon-wrapper">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="new-service-icon"
                                    />
                                </div>

                                <p className="new-service-desc">
                                    {service.short_description || service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Work With Us Section */}
            <div className="why-work-section">
                <div className="container">
                    <div className="section-header-center">
                        <h2 className="why-work-title">
                            {pageContent?.why_work_title || "Why work with us?"}
                        </h2>
                        <p className="why-work-subtitle">
                            {pageContent?.why_work_subtitle || (
                                <>
                                    We build a culture where innovation meets execution. No<br />
                                    corporate fluff, just high-impact work.
                                </>
                            )}
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        {whyChooseUs.map((item, index) => {
                            const IconComponent = getIconComponent(item.icon);
                            const colorClasses = ['icon-blue', 'icon-purple', 'icon-pink'];
                            const colorClass = colorClasses[index % colorClasses.length];

                            return (
                                <div key={item.id || index} className="col-lg-4 col-md-6 mb-4">
                                    <div className="why-card">
                                        <div className={`why-icon-box ${colorClass}`}>
                                            {item.icon && item.icon.startsWith('http') ? (
                                                <img
                                                    src={item.icon}
                                                    alt={item.title}
                                                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                                />
                                            ) : (
                                                <IconComponent />
                                            )}
                                        </div>
                                        <h3 className="why-card-title">{item.title}</h3>
                                        <p className="why-card-desc">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

export default Service;
