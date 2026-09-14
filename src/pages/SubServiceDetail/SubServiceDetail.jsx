import React, { useEffect, useState } from 'react';
import './SubServiceDetail.css';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Link, useParams, useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import { CITY_LOCATIONS, getCityPagePath, US_CITY_LOCATIONS } from '../../data/cities';
import { SPECIALIZED_SERVICES, CUSTOM_SERVICE_CONTENT, getFallbackServiceContent, getCityNameFromSlug, getSubServicePagePath, isValidCityForCountry } from '../../data/services';
import { applySeoMetadata, applyJsonLdSchema, removeJsonLdSchema, generateFaqSchema, generateReviewSchema } from '../../utils/seo';
import SubServiceBannerForm from './SubServiceBannerForm';

// Specialized Icons
import spDigital from '../../assets/specialized-icons/digital-marketing.png';
import spSeo from '../../assets/specialized-icons/seo.png';
import spWordpress from '../../assets/specialized-icons/wordpress.png';
import spPpc from '../../assets/specialized-icons/ppc.png';
import spWebDesign from '../../assets/specialized-icons/web-design.png';
import linkedinIcon from '../../assets/specialized-icons/linkdin.png';
import SocialMediaIcon from '../../assets/specialized-icons/Social Media.png';
import mobileAppIcon from '../../assets/specialized-icons/mobile-app.png';
import affiliateIcon from '../../assets/specialized-icons/affiliate.png';
import emailIcon from '../../assets/specialized-icons/email.png';
import leadGenIcon from '../../assets/specialized-icons/lead-gen.png';
import googleAdsIcon from '../../assets/specialized-icons/google-ads.png';
import youtubeIcon from '../../assets/specialized-icons/youtube.png';
import ecommerceIcon from '../../assets/specialized-icons/ecommerce.png';
import facebookIcon from '../../assets/specialized-icons/facebook.png';
import localBusinessIcon from '../../assets/specialized-icons/local-business.png';
import googleAnalyticsIcon from '../../assets/specialized-icons/google-analytics.png';
import bloggingIcon from '../../assets/specialized-icons/blogging.png';
import instagramIcon from '../../assets/specialized-icons/instagram.png';

const serviceIconsMap = {
    "digital-marketing-services": spDigital,
    "search-engine-optimization-services": spSeo,
    "linkedin-marketing-services": linkedinIcon,
    "wordpress-website-design-services": spWordpress,
    "pay-per-click-services": spPpc,
    "website-designing-services": spWebDesign,
    "social-media-marketing-services": SocialMediaIcon,
    "google-adsense-services": spPpc,
    "affiliate-marketing-services": affiliateIcon,
    "mobile-app-marketing-services": mobileAppIcon,
    "email-marketing-services": emailIcon,
    "lead-generation-services": leadGenIcon,
    "google-ads-services": googleAdsIcon,
    "youtube-marketing-services": youtubeIcon,
    "ecommerce-marketing-services": ecommerceIcon,
    "facebook-marketing-services": facebookIcon,
    "local-business-listing-services": localBusinessIcon,
    "google-analytics-services": googleAnalyticsIcon,
    "blogging-services": bloggingIcon,
    "instagram-marketing-services": instagramIcon
};

const specializedServicesData = SPECIALIZED_SERVICES.map(s => ({
    title: s.title,
    icon: <img src={serviceIconsMap[s.slug] || spDigital} alt={s.title} />,
    slug: s.slug
}));

const getSubServiceFaqs = (serviceTitle, cityName) => [
    {
        question: `Why should I choose ClickMecha for ${serviceTitle} in ${cityName}?`,
        answer: `ClickMecha is a result-driven performance marketing agency. We customize our ${serviceTitle} strategies specifically for businesses in ${cityName}, focusing on high ROI, measurable growth, and complete transparency.`
    },
    {
        question: `How long does it take to see results with ${serviceTitle}?`,
        answer: `Timelines depend on the service type. For paid campaigns like PPC and Social Ads, results can be seen within days. For organic channels like SEO, substantial growth is usually observed within 3 to 6 months.`
    },
    {
        question: `Do you offer customized packages for businesses in ${cityName}?`,
        answer: `Yes, we tailor every campaign based on your business size, budget, industry, and specific growth goals in ${cityName}.`
    },
    {
        question: `How do you report progress and performance?`,
        answer: `We provide transparent weekly and monthly reporting with in-depth dashboards covering traffic, conversions, lead quality, and return on ad spend (ROAS).`
    }
];

const SubServiceDetail = () => {
    const { serviceCitySlug } = useParams();
    const currentLoc = useLocation();
    const [activeFaq, setActiveFaq] = useState(null);

    // Determine country from URL prefix
    let currentCountry = 'in';
    if (currentLoc.pathname.startsWith('/us/')) {
        currentCountry = 'us';
    } else if (currentLoc.pathname.startsWith('/ae/')) {
        currentCountry = 'ae';
    } else if (!currentLoc.pathname.startsWith('/in/')) {
        return <NotFound />;
    }

    // Strict validation: Only lowercase letters, numbers, and hyphens with exactly one '-in-'
    if (!serviceCitySlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*-in-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(serviceCitySlug)) {
        return <NotFound />;
    }

    // Parse serviceCitySlug: service-slug-in-city-slug
    const parts = serviceCitySlug.split('-in-');
    if (parts.length !== 2) {
        return <NotFound />;
    }

    const [serviceSlug, citySlug] = parts;

    // Validate service slug against known specialized services
    const exactService = SPECIALIZED_SERVICES.find(s => s.slug === serviceSlug);
    const contentKey = `${serviceSlug}-in-${citySlug}`;
    const customContent = CUSTOM_SERVICE_CONTENT[contentKey];

    if (!exactService && !customContent) {
        return <NotFound />;
    }

    // Validate that the city slug belongs to the requested country
    if (!isValidCityForCountry(currentCountry, citySlug)) {
        return <NotFound />;
    }

    const cityName = getCityNameFromSlug(citySlug);
    if (!cityName) {
        return <NotFound />;
    }

    const serviceObj = exactService || SPECIALIZED_SERVICES[0];
    const serviceTitle = serviceObj.title;
    const subServiceFaqs = getSubServiceFaqs(serviceTitle, cityName);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    // Call CMS meta if available
    const pageSlug = currentLoc.pathname.replace(/^\/+|\/+$/g, '') || 'service-detail';
    usePageMeta(pageSlug);

    let pageContent = customContent;
    if (!pageContent) {
        const delhiKey = `${serviceSlug}-in-delhi`;
        const delhiContent = CUSTOM_SERVICE_CONTENT[delhiKey];
        if (delhiContent) {
            pageContent = JSON.parse(JSON.stringify(delhiContent));
            const replaceDelhi = (val) => {
                if (typeof val === 'string') {
                    return val.replace(/\bDelhi\b/g, cityName).replace(/\bdelhi\b/g, cityName.toLowerCase());
                } else if (Array.isArray(val)) {
                    return val.map(replaceDelhi);
                } else if (typeof val === 'object' && val !== null) {
                    const res = {};
                    for (let k in val) {
                        res[k] = replaceDelhi(val[k]);
                    }
                    return res;
                }
                return val;
            };
            pageContent = replaceDelhi(pageContent);
        } else {
            pageContent = getFallbackServiceContent(serviceTitle, cityName);
        }
    }

    // Dynamic SEO Fallback
    useEffect(() => {
        applySeoMetadata({
            title: `${pageContent.title || `${serviceTitle} in ${cityName}`} | ClickMecha`,
            description: pageContent.intro ? pageContent.intro.slice(0, 160) + '...' : `Looking for the best ${serviceTitle} in ${cityName}? ClickMecha is a performance-driven agency. Contact us for a free call.`,
            canonicalUrl: window.location.href,
            ogTitle: pageContent.title || `${serviceTitle} in ${cityName}`,
            ogDescription: pageContent.intro || `Professional ${serviceTitle} in ${cityName} by ClickMecha.`,
            ogUrl: window.location.href,
        });
    }, [serviceCitySlug, serviceTitle, cityName, pageContent]);

    // Dynamic JSON-LD FAQ Schema injection in <head>
    useEffect(() => {
        const schema = generateFaqSchema(subServiceFaqs);
        applyJsonLdSchema(schema, 'subservice-faq-schema');

        return () => {
            removeJsonLdSchema('subservice-faq-schema');
        };
    }, [serviceTitle, cityName]);

    // Dynamic JSON-LD Review & Rating Schema injection in <head>
    useEffect(() => {
        const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://clickmecha.com${currentLoc.pathname}`;

        const reviewSchema = generateReviewSchema({
            name: `Click Mecha - ${serviceTitle} in ${cityName}`,
            description: pageContent?.intro || `Top-rated ${serviceTitle} in ${cityName} by Click Mecha. Rated 4.9 on Google with verified client reviews.`,
            url: pageUrl,
            ratingValue: '4.9',
            ratingCount: 50,
            reviews: [
                {
                    name: "Mohit Sharma",
                    rating: 5,
                    content: `Best agency for ${serviceTitle} in ${cityName}! Click Mecha helped us scale our ROI effectively.`
                },
                {
                    name: "Priya Malhotra",
                    rating: 5,
                    content: `Outstanding experience with Click Mecha's ${serviceTitle} team in ${cityName}. Highly recommended!`
                },
                {
                    name: "Rahul Verma",
                    rating: 5,
                    content: `Excellent results and transparent communication for our ${serviceTitle} campaign in ${cityName}.`
                }
            ],
            locationName: cityName
        });

        applyJsonLdSchema(reviewSchema, 'subservice-review-schema');

        return () => {
            removeJsonLdSchema('subservice-review-schema');
        };
    }, [serviceTitle, cityName, currentLoc.pathname, pageContent]);

    const renderTextWithLinks = (text) => {
        if (typeof text !== 'string') return text;

        const getDynamicLinkPath = (sSlug) => {
            let prefix = 'in';
            if (currentLoc.pathname.startsWith('/us/')) {
                prefix = 'us';
            } else if (currentLoc.pathname.startsWith('/ae/')) {
                prefix = 'ae';
            }
            return `/${prefix}/${sSlug}-in-${citySlug}`;
        };

        const linkMappings = {
            '{LINK_DELHI}': { slug: 'digital-marketing-services', label: `digital marketing services in ${cityName}` },
            '{LINK_DELHI_P2}': { slug: 'digital-marketing-services', label: `digital marketing services ${cityName.toLowerCase()}` },
            '{LINK_SEO_DELHI}': { slug: 'search-engine-optimization-services', label: `SEO services in ${cityName}` },
            '{LINK_LINKEDIN_DELHI}': { slug: 'linkedin-marketing-services', label: `LinkedIn marketing services in ${cityName}` },
            '{LINK_WP_DELHI}': { slug: 'wordpress-website-design-services', label: `WordPress website design services in ${cityName}` },
            '{LINK_PPC_DELHI}': { slug: 'pay-per-click-services', label: `PPC services in ${cityName}` },
            '{LINK_SMO_DELHI}': { slug: 'social-media-marketing-services', label: `SMO service providers in ${cityName}` },
            '{LINK_ADSENSE_DELHI}': { slug: 'google-adsense-services', label: `Google AdSense services in ${cityName}` },
            '{LINK_MOBILE_DELHI}': { slug: 'mobile-app-marketing-services', label: `mobile app marketing services in ${cityName}` },
            '{LINK_EMAIL_DELHI}': { slug: 'email-marketing-services', label: `email marketing services in ${cityName}` },
            '{LINK_LEAD_DELHI}': { slug: 'lead-generation-services', label: `lead generation services in ${cityName}` },
            '{LINK_YOUTUBE_DELHI}': { slug: 'youtube-marketing-services', label: `YouTube marketing services in ${cityName}` },
            '{LINK_ECOMMERCE_DELHI}': { slug: 'ecommerce-marketing-services', label: `E-commerce marketing services in ${cityName}` },
            '{LINK_FACEBOOK_DELHI}': { slug: 'facebook-marketing-services', label: `Facebook marketing services in ${cityName}` },
            '{LINK_LOCAL_DELHI}': { slug: 'local-business-listing-services', label: `local business listing services in ${cityName}` },
            '{LINK_ANALYTICS_DELHI}': { slug: 'google-analytics-services', label: `Google Analytics services in ${cityName}` },
            '{LINK_BLOGGING_DELHI}': { slug: 'blogging-services', label: `Blogging marketing services in ${cityName}` },
            '{LINK_INSTAGRAM_DELHI}': { slug: 'instagram-marketing-services', label: `Instagram marketing services in ${cityName}` },
            '{LINK_WEBDESIGN_DELHI}': { slug: 'website-designing-services', label: `website designing services in ${cityName}` },
            '{LINK_ADWORDS_DELHI}': { slug: 'google-ads-services', label: `Google AdWord services in ${cityName}` },
            '{LINK_AFFILIATE_DELHI}': { slug: 'affiliate-marketing-services', label: `affiliate marketing services in ${cityName}` }
        };

        for (const [placeholder, config] of Object.entries(linkMappings)) {
            if (text.includes(placeholder)) {
                const parts = text.split(placeholder);
                return (
                    <>
                        {parts[0]}
                        <Link to={getDynamicLinkPath(config.slug)} className="sub-sd-content-link">
                            {config.label}
                        </Link>
                        {parts[1]}
                    </>
                );
            }
        }

        return text;
    };

    return (
        <div className="sub-sd-page-wrapper">
            <div className="container sub-sd-main-container">
                {/* Centered Heading */}
                <h1 className="sub-sd-content-title">{pageContent.title}</h1>
                <div className="sub-sd-title-underline"></div>

                {/* Content Body */}
                <div className="sub-sd-content-body">
                    {Array.isArray(pageContent.intro) ? (
                        pageContent.intro.map((para, idx) => (
                            <p key={idx} className="sub-sd-body-paragraph">{renderTextWithLinks(para)}</p>
                        ))
                    ) : (
                        <p className="sub-sd-body-paragraph">{renderTextWithLinks(pageContent.intro)}</p>
                    )}

                    {pageContent.suggestionsHeading && (
                        <p className="sub-sd-body-paragraph">{renderTextWithLinks(pageContent.suggestionsHeading)}</p>
                    )}

                    {pageContent.suggestions && pageContent.suggestions.length > 0 && (
                        <ol className="sub-sd-suggestions-list">
                            {pageContent.suggestions.map((sugg, idx) => (
                                <li key={idx} className="sub-sd-list-item">
                                    {sugg.title && <strong>{sugg.title}</strong>}
                                    {sugg.title && sugg.desc && ': '}
                                    {sugg.desc && sugg.desc}
                                </li>
                            ))}
                        </ol>
                    )}

                    {pageContent.midText && (
                        <p className="sub-sd-body-paragraph">{renderTextWithLinks(pageContent.midText)}</p>
                    )}

                    {pageContent.tipsHeading && (
                        <p className="sub-sd-body-paragraph">{renderTextWithLinks(pageContent.tipsHeading)}</p>
                    )}

                    {pageContent.tips && pageContent.tips.length > 0 && (
                        <ol className="sub-sd-suggestions-list">
                            {pageContent.tips.map((tip, idx) => (
                                <li key={idx} className="sub-sd-list-item">
                                    {tip}
                                </li>
                            ))}
                        </ol>
                    )}

                    {pageContent.ctaText && (
                        Array.isArray(pageContent.ctaText) ? (
                            pageContent.ctaText.map((paragraph, idx) => (
                                <p key={idx} className="sub-sd-cta-paragraph">{renderTextWithLinks(paragraph)}</p>
                            ))
                        ) : (
                            <p className="sub-sd-cta-paragraph">{renderTextWithLinks(pageContent.ctaText)}</p>
                        )
                    )}

                    {/* FAQ Section */}
                    <div className="sub-sd-faq-section mt-5">
                        <h2 className="sub-sd-faq-title">Frequently Asked Questions</h2>
                        <div className="sub-sd-faq-underline"></div>
                        <div className="accordion mb-4" id="subServiceFaqAccordion">
                            {subServiceFaqs.map((faq, index) => (
                                <div key={index} className="accordion-item mb-3 border bg-white rounded">
                                    <h4 className="accordion-header m-0">
                                        <button
                                            className={`accordion-button fw-bold text-dark ${activeFaq !== index ? 'collapsed' : ''}`}
                                            style={{ boxShadow: 'none', backgroundColor: 'transparent', color: 'inherit' }}
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                        >
                                            {faq.question}
                                        </button>
                                    </h4>
                                    <div className={`accordion-collapse collapse ${activeFaq === index ? 'show' : ''}`}>
                                        <div className="accordion-body text-muted">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Specialized Services Section */}
            <div className="sub-sd-specialized-section">
                <div className="container">
                    <h2 className="sub-sd-specialized-title">Our Specialized Services</h2>
                    <div className="sub-sd-underline"></div>

                    <div className="sub-sd-specialized-grid">
                        {specializedServicesData.map((service, index) => (
                            <Link to={getSubServicePagePath(service.title, cityName)} key={index} className="sub-sd-specialized-card-link">
                                <div className="sub-sd-specialized-card">
                                    <div className="sub-sd-specialized-icon">
                                        {service.icon}
                                    </div>
                                    <h3 className="sub-sd-specialized-name">{service.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Banner Form */}
            <SubServiceBannerForm />
        </div>
    );
};

export default SubServiceDetail;
