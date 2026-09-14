import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import Slider from 'react-slick';
import serviceDetailBg from '../../assets/service-images/service-detail-bg.png';
import beerCafeBefore from '../../assets/before-after-image/2_Beercafe 1.jpg';
import beerCafeAfter from '../../assets/before-after-image/2_Beercafe 2.jpg';
import flexxoBefore from '../../assets/before-after-image/2_Flexxo 1.jpg';
import flexxoAfter from '../../assets/before-after-image/2_Flexxo 2.jpg';
import madhusudanBefore from '../../assets/before-after-image/2_Madhusudhan 1.jpg';
import madhusudanAfter from '../../assets/before-after-image/2_Madhusudhan 2.jpg';
import omBefore from '../../assets/before-after-image/2_Om 1.jpg';
import omAfter from '../../assets/before-after-image/2_Om 2.jpg';
import cmAward from '../../assets/CM-Award.jpg.webp';
import aboutTeam from '../../assets/about-image/about-team.jpg';
import proofFbSales from '../../assets/proof-images/proof-facebook-sales.jpg';
import proofShopifyConv from '../../assets/proof-images/proof-shopify-conversion.jpg';
import proofFbRoas from '../../assets/proof-images/proof-facebook-roas.jpg';
import proofShopifySales1 from '../../assets/proof-images/proof-shopify-sales-1.jpg';
import proofShopifySales2 from '../../assets/proof-images/proof-shopify-sales-2.jpg';
import reelVideo1 from '../../assets/landing-page-video/video1.mp4';
import reelVideo2 from '../../assets/landing-page-video/video2.mp4';
import reelVideo3 from '../../assets/landing-page-video/video3.mp4';
import reelVideo4 from '../../assets/landing-page-video/video4.mp4';
import reelVideo5 from '../../assets/landing-page-video/video5.mp4';
import testimonialVideo from '../../assets/landing-page-video/testmoninal-video.mp4';
import {
    FaCheckCircle,
    FaRegHandshake,
    FaUserTie,
    FaChartBar,
    FaLightbulb,
    FaFilter,
    FaBolt,
    FaUsers,
    FaHeart,
    FaChartLine,
    FaAward,
    FaPlay,
    FaPause,
    FaTimes,
    FaQuoteLeft,
    FaStar,
    FaArrowLeft,
    FaArrowRight,
    FaLinkedin,
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from 'react-icons/fa';
import { useContactModal } from '../../context/ContactModalContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { submitContactForm } from '../../utils/api';
import Work from '../../components/Work/Work';

import processStrategy from '../../assets/process-icons/process-strategy.png';
import processPlanning from '../../assets/process-icons/process-planning.png';
import processBranding from '../../assets/process-icons/process-branding.png';
import processResult from '../../assets/process-icons/process-result.png';

import iconSocial from '../../assets/service-icons/social-media.png';
import iconWeb from '../../assets/service-icons/web-dev.png';
import iconUiUx from '../../assets/service-icons/ui-ux.png';
import iconPush from '../../assets/service-icons/push-notification.png';
import iconEcommerce from '../../assets/service-icons/ecommerce.png';
import iconApp from '../../assets/service-icons/app-dev.png';

const LandingPage = () => {
    usePageMeta('growthlanding');
    const { openModal } = useContactModal();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formResponse, setFormResponse] = useState({ type: '', text: '' });
    const [clients, setClients] = useState([]);
    const [workShowcase, setWorkShowcase] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeProofId, setActiveProofId] = useState(1);
    const trustIndexRef = useRef(null);
    const sliderRef = useRef(null);
    const [activeFaq, setActiveFaq] = useState(null);
    const [reelsSlidesToShow, setReelsSlidesToShow] = useState(4);
    const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

    useEffect(() => {
        const localStorageKey = 'clickmecha_ugc_timer_end';
        let endTime = localStorage.getItem(localStorageKey);
        const now = Date.now();

        if (!endTime || parseInt(endTime) < now) {
            endTime = now + 2 * 60 * 60 * 1000;
            localStorage.setItem(localStorageKey, endTime.toString());
        } else {
            endTime = parseInt(endTime);
        }

        const calculateTimeLeft = () => {
            const difference = endTime - Date.now();
            if (difference <= 0) {
                const newEndTime = Date.now() + 2 * 60 * 60 * 1000;
                localStorage.setItem(localStorageKey, newEndTime.toString());
                return 7200;
            }
            return Math.floor(difference / 1000);
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setReelsSlidesToShow(1);
            } else if (width < 992) {
                setReelsSlidesToShow(2);
            } else {
                setReelsSlidesToShow(4);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "What services does ClickMecha offer?",
            answer: "ClickMecha is a full-service digital marketing agency specializing in high-quality lead generation, Search Engine Optimization (SEO), PPC advertising (Google Ads, Meta Ads), social media growth, website design, and B2B growth roadmaps."
        },
        {
            question: "How does the 'No Satisfaction Money back Guarantee' work?",
            answer: "We are committed to delivering measurable results. If we don’t meet the mutually agreed-upon milestones or deliverables during the initial period of our campaign, we offer a hassle-free money-back guarantee."
        },
        {
            question: "How long does it take to see results?",
            answer: "Paid advertising campaigns (like Google Ads and Social Media Ads) can start generating qualified leads within the first 7 to 14 days. Organic SEO and content strategies typically take 3 to 6 months to show compounding growth."
        },
        {
            question: "Will I have a dedicated point of contact?",
            answer: "Yes, absolutely. You will be assigned a dedicated Account Manager who acts as your primary contact, coordinating directly with our team of search and copy specialists and scheduling weekly alignment syncs."
        },
        {
            question: "How do you report and measure campaign performance?",
            answer: "We prioritize absolute transparency. You will receive weekly brief reports and a comprehensive monthly review call highlighting key metrics like cost-per-lead, conversion rates, and total return on ad spend (ROAS)."
        }
    ];

    const services = [
        {
            title: "Social Media Marketing",
            desc: "Amplify Your Brand's Voice: ClickMecha's social media marketing strategies are tailored for impact.",
            icon: iconSocial
        },
        {
            title: "Website Development",
            desc: "We build fast, SEO-friendly, and high-performing websites that help your business rank better and convert visitors into customers.",
            icon: iconWeb
        },
        {
            title: "Mobile App Development",
            desc: "Create powerful iOS and Android apps with seamless performance and user-focused design to enhance your digital presence.",
            icon: iconApp
        },
        {
            title: "UI/UX & Branding Design",
            desc: "Our creative team designs modern, user-friendly interfaces and impactful branding assets to make your business stand out.",
            icon: iconUiUx
        },
        {
            title: "Push Notifications",
            desc: "Engage your audience with personalized push notifications, driving immediate traffic and repeating conversions.",
            icon: iconPush
        },
        {
            title: "E-Commerce Solutions",
            desc: "We develop conversion-focused eCommerce stores with secure payment integration and smooth checkout experiences.",
            icon: iconEcommerce
        }
    ];

    const [dynamicServices, setDynamicServices] = useState(services);

    const clientReels = [
        { id: 1, src: reelVideo1, clientName: "Roshan Di Kulfi", views: "150K+ Views" },
        { id: 2, src: reelVideo2, clientName: "Neelgagan", views: "320K+ Views" },
        { id: 3, src: reelVideo3, clientName: "Desi Naturals", views: "210K+ Views" },
        { id: 4, src: reelVideo4, clientName: "Click Mecha ", views: "180K+ Views" },
        { id: 5, src: reelVideo5, clientName: "Mello", views: "290K+ Views" }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: reelsSlidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    };

    const resultsSliderSettings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('https://cms.clickmecha.com/api/clients');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (result.status && Array.isArray(result.data)) {
                    setClients(result.data);
                }
            } catch (err) {
                console.error("Error fetching clients for landing page:", err);
            }
        };

        const fetchWorkShowcase = async () => {
            try {
                const response = await fetch('https://cms.clickmecha.com/api/home');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (result.status && result.data) {
                    if (Array.isArray(result.data.work_showcase)) {
                        setWorkShowcase(result.data.work_showcase);
                    }
                    if (Array.isArray(result.data.services) && result.data.services.length > 0) {
                        setDynamicServices(result.data.services);
                    }
                }
            } catch (err) {
                console.error("Error fetching work showcase and services for landing page:", err);
            }
        };

        fetchClients();
        fetchWorkShowcase();
    }, []);

    useEffect(() => {
        if (trustIndexRef.current) {
            trustIndexRef.current.setAttribute('src', 'https://cdn.trustindex.io/loader.js?09a231a7345d81006e667a27c5b');
        }
    }, []);

    const keyPoints = [
        "Not Satisfied? We Pay You ₹1,00,000",
        "Dedicated Manager",
        "Monthly Analytics Report",
        "Weekly Brain Storming Meeting",
        "Qualified Lead Generation",
        "Worked with brands like Neelgagan, Yatra, Tata & ITC"
    ];

    const whyUsPoints = [
        {
            title: "Dedicated Manager",
            desc: "You get a single, expert point of contact who coordinates your campaigns and provides clear updates.",
            icon: <FaUserTie className="lp-why-icon" />
        },
        {
            title: "Expert Team of Professionals",
            desc: "Work with certified search specialists, copywriters, and developers committed to digital excellence.",
            icon: <FaUsers className="lp-why-icon" />
        },
        {
            title: "Custom Growth Roadmaps",
            desc: "No templates or generic plans. We design custom marketing and development strategies built for your industry.",
            icon: <FaLightbulb className="lp-why-icon" />
        },
        {
            title: "Results-Driven Approach",
            desc: "We focus on key outcomes that grow your business: qualified leads, high conversions, and real ROI.",
            icon: <FaChartLine className="lp-why-icon" />
        },
        {
            title: "Risk-Free Guarantee",
            desc: "Get results or get paid ₹1,00,000 on top of your retainer. Zero risk, pure performance.",
            icon: <FaRegHandshake className="lp-why-icon" />
        }
    ];

    const caseStudies = [
        {
            clientName: "The Beer Café",
            description: "India's largest alco-beverage chain. We optimized their profile and activity, resulting in visual growth in community size and posts count.",
            beforeImg: beerCafeBefore,
            afterImg: beerCafeAfter,
            beforeLabel: "Before ClickMecha",
            afterLabel: "After ClickMecha",
            stats: [
                { label: "Followers", before: "10K", after: "24K", change: "+140%" },
                { label: "Total Posts", before: "1,008", after: "2,408", change: "+138%" }
            ],
            achievement: "140% Increase in followers & massive content expansion."
        },
        {
            clientName: "Flexxo",
            description: "A premium wellness and fitness apparel brand. We revamped their visual layout and targeted ad creatives to scale conversion rates.",
            beforeImg: flexxoBefore,
            afterImg: flexxoAfter,
            beforeLabel: "Before ClickMecha",
            afterLabel: "After ClickMecha",
            stats: [
                { label: "Monthly Reach", before: "45K", after: "150K", change: "+233%" },
                { label: "Ad ROAS", before: "1.8x", after: "4.2x", change: "+133%" }
            ],
            achievement: "Scaled social engagement and generated high-converting leads through visual storytelling."
        },
        {
            clientName: "Madhusudan",
            description: "A leading dairy and food brand. We designed comprehensive digital campaigns to promote key product launches and boost offline sales queries.",
            beforeImg: madhusudanBefore,
            afterImg: madhusudanAfter,
            beforeLabel: "Before ClickMecha",
            afterLabel: "After ClickMecha",
            stats: [
                { label: "Followers Growth", before: "15K", after: "38K", change: "+153%" },
                { label: "Daily Queries", before: "25", after: "120", change: "+380%" }
            ],
            achievement: "Established local digital presence and drove massive retail customer inquiries."
        },
        {
            clientName: "Om",
            description: "A traditional lifestyle and apparel retail brand. We ran highly targeted local awareness campaigns, expanding brand search volume.",
            beforeImg: omBefore,
            afterImg: omAfter,
            beforeLabel: "Before ClickMecha",
            afterLabel: "After ClickMecha",
            stats: [
                { label: "Impression Volume", before: "80K", after: "280K", change: "+250%" },
                { label: "Store Visits", before: "120/mo", after: "450/mo", change: "+275%" }
            ],
            achievement: "Boosted foot traffic and digital brand searches through local campaign optimization."
        }
    ];

    const performanceProofs = [
        {
            id: 1,
            platform: "FACEBOOK ADS",
            image: proofFbSales,
            highlight: "₹96.42 Lakhs Purchase Value",
            desc: "Generated over ₹96.4 Lakhs in conversion value from our campaigns, scaling sales and brand presence."
        },
        {
            id: 2,
            platform: "SHOPIFY ANALYTICS",
            image: proofShopifyConv,
            highlight: "4.4% Conversion Rate (+45%)",
            desc: "Increased store conversion rate to 4.4% through refined shopping experience and UX funnel setup."
        },
        {
            id: 3,
            platform: "FACEBOOK ADS",
            image: proofFbRoas,
            highlight: "11.0x Average ROAS",
            desc: "Delivered an exceptional 11.0 Return on Ad Spend, maximizing direct customer acquisition margins."
        },
        {
            id: 4,
            platform: "SHOPIFY ANALYTICS",
            image: proofShopifySales1,
            highlight: "₹41.3 Lakhs Total Sales (+35%)",
            desc: "Generated ₹41.3 Lakhs in sales revenue over a 2-month phase using targeted digital funnels."
        },
        {
            id: 5,
            platform: "SHOPIFY ANALYTICS",
            image: proofShopifySales2,
            highlight: "₹1.08 Lakhs Sales (+154%)",
            desc: "Drove a 154% rise in month-to-date sales during the launch phase of a targeted product line."
        }
    ];

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormResponse({ type: '', text: '' });

        const form = e.currentTarget;
        const formData = new FormData(form);
        const allowedFields = ['name', 'email', 'phone', 'company_name', 'budget'];
        const payload = { message: 'No message provided' };

        allowedFields.forEach((field) => {
            const value = formData.get(field);
            if (typeof value === 'string') {
                const trimmedValue = value.trim();
                if (trimmedValue) {
                    payload[field] = trimmedValue;
                }
            }
        });

        const countryCode = (formData.get('country_code') || '').split('-')[0];
        if (payload.phone) {
            payload.phone = `${countryCode} ${payload.phone}`.trim();
        }

        if (!payload.name || !payload.email || !payload.phone || !payload.company_name || !payload.budget) {
            setFormResponse({
                type: 'error',
                text: 'Please fill in all required fields (Name, Email, Phone, Company Name, and Budget)'
            });
            return;
        }

        const hasConsentCheckbox = formData.has('agree');
        if (hasConsentCheckbox) {
            if (formData.get('agree') !== 'yes') {
                setFormResponse({
                    type: 'error',
                    text: 'Please agree to be contacted about your project'
                });
                return;
            }
            payload.agree = 'yes';
        }

        const currentPageUrl = typeof window !== 'undefined' ? window.location.href : '';
        payload.page_url = currentPageUrl;
        payload.url = currentPageUrl;

        setIsSubmitting(true);

        try {
            const data = await submitContactForm(payload);

            if (data.status) {
                setFormResponse({
                    type: 'success',
                    text: data.message || 'Thank you! Your query has been submitted successfully.'
                });
                form.reset();
            } else {
                setFormResponse({
                    type: 'error',
                    text: data.message || 'Unable to submit your query right now.'
                });
            }
        } catch (error) {
            setFormResponse({
                type: 'error',
                text: `Error: ${error.message}`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const row1 = clients.filter((_, idx) => idx % 3 === 0);
    const row2 = clients.filter((_, idx) => idx % 3 === 1);
    const row3 = clients.filter((_, idx) => idx % 3 === 2);

    const renderMarqueeRow = (rowClients, directionClass) => {
        if (!rowClients || rowClients.length === 0) return null;
        const duplicated = [...rowClients, ...rowClients, ...rowClients, ...rowClients];
        return (
            <div className="lp-marquee-wrapper">
                <div className={`lp-marquee-track ${directionClass}`}>
                    {duplicated.map((client, idx) => (
                        <div key={idx} className="lp-marquee-logo-card">
                            <img src={client.logo_url} alt={client.name} className="lp-marquee-logo-img" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="lp-page-wrapper">
            {/* Hero Section */}
            <div className="lp-hero-section position-relative">
                {/* Decorative background shapes */}
                <div className="lp-decor-dots dots-top-right"></div>
                <div className="lp-decor-dots dots-center"></div>
                <div className="lp-decor-dots dots-bottom-left"></div>

                {/* Corner curve SVGs */}
                <svg className="lp-decor-curve curve-top-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-50 150 C 20 120, 80 50, 150 -50" stroke="rgba(247, 148, 30, 0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M-30 180 C 50 150, 110 80, 180 -20" stroke="rgba(247, 148, 30, 0.12)" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M-10 210 C 80 180, 140 110, 210 10" stroke="rgba(247, 148, 30, 0.07)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                <svg className="lp-decor-curve curve-bottom-right" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 250 C 120 180, 180 150, 250 80" stroke="rgba(247, 148, 30, 0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M80 280 C 150 210, 210 180, 280 110" stroke="rgba(247, 148, 30, 0.12)" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M110 310 C 180 240, 240 210, 310 140" stroke="rgba(247, 148, 30, 0.07)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>

                <div className="container">
                    <div className="lp-card-container">
                        <div className="row align-items-center">

                            {/* Left Content Column */}
                            <div className="col-lg-7 lp-content-col position-relative">
                                <h1 className="lp-hero-title">
                                    We Have Generated <span className="lp-highlight-text">1,000+ Qualified Leads</span> & Minimum of 7% of ROI for Our Clients!
                                </h1>
                                <p className="lp-hero-desc">
                                    If you are not satisfied with our results, we will pay you an additional <strong>₹1,00,000</strong> on top of your retainer fee.
                                </p>

                                <ul className="lp-features-list">
                                    {keyPoints.map((point, index) => (
                                        <li key={index}>
                                            <FaCheckCircle className="lp-check-icon" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* <div className="d-flex align-items-center gap-4 flex-wrap mt-4">
                                    <button className="lp-book-btn" onClick={openModal}>
                                        BOOK A FREE CALL
                                        <span className="lp-btn-arrow-icon">
                                            <FaArrowRight />
                                        </span>
                                    </button>
                                </div> */}

                                {/* Desktop Dashboard Mockup */}
                                <div className="lp-hero-dashboard-graphic d-none d-lg-block">
                                    <div className="lp-dashboard-backdrops">
                                        <div className="lp-backdrop-circle circle-1"></div>
                                        <div className="lp-backdrop-circle circle-2"></div>
                                        <div className="lp-backdrop-dashed-circle"></div>
                                    </div>
                                    <div className="lp-dashboard-card">
                                        <div className="lp-dashboard-icon-badge">
                                            <FaUsers />
                                        </div>
                                        {/* Top Row: Bar Chart and Text Leads Counter */}
                                        <div className="lp-dashboard-top-row">
                                            <div className="lp-dashboard-bar-chart">
                                                <div className="lp-bar" style={{ height: '14px' }}></div>
                                                <div className="lp-bar" style={{ height: '24px' }}></div>
                                                <div className="lp-bar" style={{ height: '32px' }}></div>
                                                <div className="lp-bar" style={{ height: '18px' }}></div>
                                            </div>
                                            <div className="lp-dashboard-counter-box">
                                                <span className="lp-counter-num">1,000+</span>
                                                <span className="lp-counter-label">Leads Generated</span>
                                            </div>
                                        </div>
                                        {/* Bottom Row: Line Chart SVG */}
                                        <div className="lp-dashboard-line-chart">
                                            <svg viewBox="0 0 160 80" className="lp-chart-svg">
                                                <line x1="5" y1="60" x2="155" y2="60" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3,3" />
                                                <line x1="5" y1="30" x2="155" y2="30" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3,3" />
                                                <path
                                                    d="M5 55 L35 40 L65 48 L95 28 L125 35 L155 12"
                                                    fill="none"
                                                    stroke="#F7941E"
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M5 55 L35 40 L65 48 L95 28 L125 35 L155 12 L155 80 L5 80 Z"
                                                    fill="url(#chartGradHero)"
                                                    opacity="0.12"
                                                />
                                                <defs>
                                                    <linearGradient id="chartGradHero" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#F7941E" />
                                                        <stop offset="100%" stopColor="#F7941E" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Form Column */}
                            <div className="col-lg-5 lp-form-col">
                                <div className="lp-form-box">
                                    <div className="lp-offer-header">
                                        <div className="lp-offer-badge-container">
                                            <span className="lp-offer-badge">Limited Time Offer</span>
                                        </div>
                                        <h3 className="lp-offer-title">Get Free UGC Video</h3>
                                        <div className="lp-timer-box">
                                            <div className="lp-timer-segment">
                                                <span className="lp-timer-num">{Math.floor(timeLeft / 3600).toString().padStart(2, '0')}</span>
                                                <span className="lp-timer-label">hrs</span>
                                            </div>
                                            <span className="lp-timer-colon">:</span>
                                            <div className="lp-timer-segment">
                                                <span className="lp-timer-num">{Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}</span>
                                                <span className="lp-timer-label">mins</span>
                                            </div>
                                            <span className="lp-timer-colon">:</span>
                                            <div className="lp-timer-segment">
                                                <span className="lp-timer-num">{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                                <span className="lp-timer-label">secs</span>
                                            </div>
                                        </div>
                                    </div>
                                    {formResponse.text && (
                                        <div className={`alert ${formResponse.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                                            {formResponse.text}
                                        </div>
                                    )}
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-3">
                                            <input type="text" name="name" className="lp-input-field" placeholder="Full Name" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" name="email" className="lp-input-field" placeholder="Email Address" required />
                                        </div>
                                        <div className="mb-3">
                                            <PhoneInput
                                                phoneName="phone"
                                                countryCodeName="country_code"
                                                required={true}
                                                className="lp-style"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="company_name" className="lp-input-field" placeholder="Company Name" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="budget" className="lp-input-field" placeholder="Marketing Budget" required />
                                        </div>


                                        <div className="lp-checkbox-group mb-4">
                                            <input type="checkbox" id="lpProjectCheck" name="agree" value="yes" className="lp-checkbox" required />
                                            <label htmlFor="lpProjectCheck" className="lp-checkbox-label">
                                                I agree to be contacted about my project.
                                            </label>
                                        </div>

                                        <button type="submit" className="lp-submit-btn" disabled={isSubmitting}>
                                            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT QUERY'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="lp-about-section">
                <div className="container">
                    <div className="row align-items-center">

                        {/* Left Column: Visual/Stats Card */}
                        <div className="col-lg-6 lp-about-img-col">
                            <div className="lp-about-visual-wrapper">
                                <img src={aboutTeam} alt="ClickMecha Team" className="lp-about-team-img" />
                                <div className="lp-about-visual-card">
                                    <div className="lp-about-glow"></div>
                                    <div className="lp-about-stat">
                                        <span className="lp-stat-number">10+</span>
                                        <span className="lp-stat-label">Years of Empowering Brands</span>
                                    </div>
                                    <div className="lp-about-tagline">
                                        "Turning your digital obstacles into measurable opportunities."
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: About Content */}
                        <div className="col-lg-6 lp-about-content-col">
                            <span className="lp-about-badge">ABOUT US</span>
                            <h2 className="lp-about-title">
                                We Are Committed to Being More Than Just a Service Provider—<span className="lp-highlight-text">We Become Your Growth Partner</span>
                            </h2>
                            <p className="lp-about-desc">
                                At our company, we understand how frustrating it can be to invest time, money, and trust into services that fail to deliver real results. Businesses often struggle with low visibility, poor leads, and stagnant growth despite their hard work.
                            </p>
                            <p className="lp-about-desc">
                                That's why we are committed to being more than just a service provider—we become your growth partner. Our mission is to help businesses overcome challenges, build a strong presence, and achieve measurable success. With a customer-first approach, innovative strategies, and unwavering dedication, we turn obstacles into opportunities, helping brands grow with confidence and create a lasting impact in their industry.
                            </p>
                        </div>

                    </div>
                </div>
            </div>



            {/* Why Us Section */}
            <div className="lp-why-section">
                <div className="container">
                    <div className="lp-why-header text-center">
                        <span className="lp-why-badge">WHY CHOOSE US</span>
                        <h2 className="lp-why-title-main">
                            What Makes ClickMecha <span className="lp-highlight-text">Your Perfect Match</span>
                        </h2>
                        <p className="lp-why-subtitle-main mx-auto">
                            We bridge the gap between effort and actual business revenue. Here is how we ensure your ongoing success.
                        </p>
                    </div>

                    {/* Grid Layout for the 5 points */}
                    <div className="row justify-content-center g-4 lp-why-grid">
                        {whyUsPoints.map((point, index) => (
                            <div key={index} className="col-lg-4 col-md-6 lp-why-col">
                                <div className="lp-why-card">
                                    <div className="lp-why-card-icon-wrapper">
                                        {point.icon}
                                    </div>
                                    <h3 className="lp-why-card-title">{point.title}</h3>
                                    <p className="lp-why-card-desc">{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* CTA Section */}
            <div className="lp-cta-section">
                <div className="container">
                    <div className="lp-cta-card" style={{ backgroundImage: `url(${serviceDetailBg})` }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8 mb-4 mb-lg-0 text-start">
                                <h2 className="lp-cta-title">Your Audience Is Online.</h2>
                                <p className="lp-cta-desc">
                                    Every single day, your potential customers are searching for your services. Don't let your competitors capture them. Stand out and drive growth now.
                                </p>
                            </div>
                            <div className="col-lg-4 text-lg-end text-center">
                                <button className="lp-cta-btn" onClick={openModal}>
                                    Are You Visible?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Founder Message Section */}
            <div className="lp-founder-section">
                <div className="container">
                    <div className="row align-items-center">

                        {/* Left Column: Standalone Founder Award Image */}
                        <div className="col-lg-4 lp-founder-left-col">
                            <div className="lp-founder-img-wrapper">
                                <img src={cmAward} alt="Kavya Kapoor - Founder & CEO" className="lp-founder-img" />
                            </div>
                        </div>

                        {/* Right Column: Founder's Message Text */}
                        <div className="col-lg-8 lp-founder-content-col">
                            <span className="lp-founder-badge">FOUNDER'S MESSAGE</span>

                            <div className="lp-founder-info-header">
                                <h3 className="lp-founder-header-name">Kavya Kapoor</h3>
                                <p className="lp-founder-header-title">Founder & CEO, ClickMecha</p>
                            </div>

                            <h2 className="lp-founder-heading">Solving Real Problems, <span className="lp-highlight-text">Creating Meaningful Impact</span></h2>

                            <div className="lp-founder-message-body">
                                <p>
                                    When we started this journey, it wasn't just about building a company—it was about solving real problems and creating meaningful impact. We saw businesses struggling to grow, connect with their audience, and achieve the results they deserved. That challenge became our purpose.
                                </p>
                                <p>
                                    Every client who trusts us with their dreams becomes a part of our story. We understand the hard work, passion, and sacrifices behind every business, because we have lived that journey ourselves.
                                </p>
                                <p>
                                    Our commitment goes beyond delivering services. We strive to build lasting relationships, create opportunities, and help businesses turn their vision into reality. Your success inspires us every day, and we remain dedicated to growing together, overcoming challenges, and celebrating achievements as one team.
                                </p>
                                <p className="lp-founder-closing">
                                    Thank you for being a part of our journey. The best is yet to come.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="lp-results-section">
                <div className="container">

                    {/* Section Header */}
                    <div className="lp-results-header text-center">
                        <span className="lp-results-badge">CLIENT RESULTS</span>
                        <h2 className="lp-results-title-main">
                            Visual Proof of <span className="lp-highlight-text">Real Brand Growth</span>
                        </h2>
                        <p className="lp-results-subtitle-main mx-auto">
                            See how we scale our clients' social footprint, posts engagement, and business reach.
                        </p>
                    </div>

                    {/* Extensible Slider of Cases */}
                    <div className="lp-results-slider-container">
                        <Slider ref={sliderRef} {...resultsSliderSettings}>
                            {caseStudies.map((study, index) => (
                                <div key={index} className="lp-case-slide">
                                    <div className="lp-case-item">

                                        {/* Client Info Header */}
                                        <div className="lp-case-info text-center">
                                            <p className="lp-case-client-desc mx-auto">{study.description}</p>

                                            {/* Stats Badges */}
                                            <div className="d-flex justify-content-center gap-3 flex-wrap mt-3 mb-5">
                                                {study.stats.map((stat, statIdx) => (
                                                    <div key={statIdx} className="lp-case-stat-badge">
                                                        <span className="lp-badge-label">{stat.label}:</span>
                                                        <span className="lp-badge-value">{stat.before} ➜ {stat.after}</span>
                                                        <span className="lp-badge-change">{stat.change}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Side-by-Side Before/After Screenshot Comparison */}
                                        <div className="row justify-content-center align-items-stretch lp-case-images-row">

                                            {/* Before Column */}
                                            <div className="col-md-5 col-6 lp-case-img-col text-center">
                                                <div className="lp-comparison-label before">BEFORE CLICKMECHA</div>
                                                <div className="lp-case-screenshot-wrapper">
                                                    <img src={study.beforeImg} alt={`${study.clientName} Before`} className="lp-case-screenshot" />
                                                </div>
                                            </div>

                                            {/* Arrow column on desktop */}
                                            <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center lp-case-arrow-col">
                                                <div className="lp-comparison-arrow">➔</div>
                                            </div>

                                            {/* After Column */}
                                            <div className="col-md-5 col-6 lp-case-img-col text-center">
                                                <div className="lp-comparison-label after">AFTER CLICKMECHA</div>
                                                <div className="lp-case-screenshot-wrapper after-active">
                                                    <img src={study.afterImg} alt={`${study.clientName} After`} className="lp-case-screenshot" />
                                                </div>
                                            </div>

                                        </div>

                                        {/* Custom Bottom Message / Achievement */}
                                        <div className="lp-case-achievement text-center mt-5">
                                            <p className="lp-achievement-text"><strong>Outcome:</strong> {study.achievement}</p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </Slider>

                        {/* Custom Bottom Slider Controls */}
                        <div className="lp-results-slider-controls d-flex justify-content-center align-items-center gap-3 mt-4">
                            <button className="lp-results-control-btn prev" onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous Slide">
                                <FaArrowLeft />
                            </button>
                            <button className="lp-results-control-btn next" onClick={() => sliderRef.current?.slickNext()} aria-label="Next Slide">
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Performance Proof / Interactive Showcase Section */}
            <div className="lp-proof-section py-5">
                <div className="container">

                    {/* Section Header */}
                    <div className="lp-proof-header text-center mb-5">
                        <span className="lp-proof-badge">PERFORMANCE PROOF</span>
                        <h2 className="lp-proof-title-main">
                            Real Dashboards. <span className="lp-highlight-text">Real Results.</span>
                        </h2>
                        <p className="lp-proof-subtitle mx-auto" style={{ maxWidth: '750px' }}>
                            A transparent, uncropped look at the actual sales, conversions, and Return on Ad Spend (ROAS) dashboards we manage for our partners. Click on the mockup to zoom.
                        </p>
                    </div>

                    <div className="row align-items-stretch g-4">

                        {/* Left Side: Browser Mockup displaying active screenshot */}
                        <div className="col-lg-7">
                            <div className="lp-proof-mockup-window">

                                {/* Browser Toolbar */}
                                <div className="lp-mockup-header d-flex align-items-center px-3 py-2">
                                    <div className="d-flex align-items-center gap-1">
                                        <span className="lp-dot-red"></span>
                                        <span className="lp-dot-yellow"></span>
                                        <span className="lp-dot-green"></span>
                                    </div>
                                    <div className="lp-mockup-address-bar text-center ms-3">
                                        https://analytics.clickmecha.com/dashboard-proof-{activeProofId}
                                    </div>
                                </div>

                                {/* Screenshot Display Wrapper */}
                                <div className="lp-mockup-body" onClick={() => setSelectedImage(performanceProofs.find(p => p.id === activeProofId)?.image)}>
                                    <img
                                        src={performanceProofs.find(p => p.id === activeProofId)?.image}
                                        alt="Dashboard Proof"
                                        className="lp-mockup-img"
                                    />
                                    <div className="lp-mockup-hover-overlay">
                                        <span className="lp-zoom-icon">🔍 Click to View Full Image</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Right Side: Interactive Tabs */}
                        <div className="col-lg-5 d-flex flex-column justify-content-between gap-3">
                            {performanceProofs.map((proof) => {
                                const isActive = activeProofId === proof.id;
                                return (
                                    <div
                                        key={proof.id}
                                        className={`lp-proof-tab-card ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveProofId(proof.id)}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="lp-proof-tab-platform">{proof.platform}</span>
                                            {isActive ? (
                                                <span className="lp-proof-active-dot">● Active View</span>
                                            ) : (
                                                <span className="lp-proof-click-prompt">Tap to view ↗</span>
                                            )}
                                        </div>
                                        <h3 className="lp-proof-tab-highlight">{proof.highlight}</h3>
                                        <p className="lp-proof-tab-desc mb-0">{proof.desc}</p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
            </div>

            {/* Client Logos Section */}
            <div className="lp-logos-section">
                <div className="container-fluid px-0">
                    <div className="lp-logos-header text-center">
                        <span className="lp-logos-badge">OUR CLIENTELE</span>
                        <h2 className="lp-logos-title">Trusted by Over 400+ Brands</h2>
                    </div>
                    <div className="lp-marquee-container">
                        {row1.length > 0 && renderMarqueeRow(row1, 'scroll-right')}
                        {row2.length > 0 && renderMarqueeRow(row2, 'scroll-left')}
                        {row3.length > 0 && renderMarqueeRow(row3, 'scroll-right')}
                    </div>
                </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="lp-cta-section lp-bottom-cta-container">
                <div className="container">
                    <div className="lp-cta-card" style={{ backgroundImage: `url(${serviceDetailBg})` }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8 mb-4 mb-lg-0 text-start">
                                <h2 className="lp-cta-title">Ready to Transform Your Digital Presence & Sales?</h2>
                                <p className="lp-cta-desc">
                                    Stop losing high-value leads to your competitors. Let's build a systematic growth engine for your business and unlock predictable revenue.
                                </p>
                            </div>
                            <div className="col-lg-4 text-lg-end text-center">
                                <button className="lp-cta-btn" onClick={openModal}>
                                    Claim Your Free Strategy Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Client Reels/Videos Section */}
            <div className="lp-reels-section">
                <div className="container">
                    <div className="lp-reels-header text-center">
                        <span className="lp-reels-badge">CREATIVE SHOWCASE</span>
                        <h2 className="lp-reels-title">Our Best Performing Client Reels</h2>
                        <p className="lp-reels-subtitle mx-auto">
                            See how we combine high-impact storytelling, hooks, and aesthetics to drive viral reach and conversions. Click any reel to play with audio.
                        </p>
                    </div>

                    <div className="lp-reels-slider-container">
                        <Slider {...sliderSettings}>
                            {clientReels.map((reel) => (
                                <div key={reel.id} className="lp-reel-slide">
                                    <div className="lp-reel-card" onClick={() => setSelectedVideo(reel.src)}>
                                        <video src={reel.src} className="lp-reel-video" muted autoPlay loop playsInline preload="auto" />
                                        <div className="lp-reel-overlay">
                                            <div className="lp-reel-play-btn">
                                                <FaPlay />
                                            </div>
                                            <h4 className="lp-reel-client">{reel.clientName}</h4>
                                            <span className="lp-reel-views">{reel.views}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            {/* Client Results Section */}`

            {/* Video Testimonial Section */}
            <div className="lp-testimonial-section">
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* Left: Video (portrait format) */}
                        <div className="col-lg-4 col-md-5 mx-auto mx-lg-0">
                            <div className="lp-testimonial-video-wrapper" onClick={() => setSelectedVideo(testimonialVideo)}>
                                <video
                                    src={testimonialVideo}
                                    className="lp-testimonial-video"
                                    playsInline
                                    preload="auto"
                                    muted
                                    autoPlay
                                    loop
                                />
                                <div className="lp-testimonial-play-overlay">
                                    <div className="lp-testimonial-play-btn">
                                        <FaPlay />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Review Text */}
                        <div className="col-lg-8 col-md-7">
                            <div className="lp-testimonial-content">
                                <span className="lp-testimonial-badge">CLIENT SPEAKS</span>
                                <h2 className="lp-testimonial-heading">
                                    Real Results, <span className="lp-highlight-text">Real Words</span>
                                </h2>

                                <div className="lp-testimonial-quote-card">
                                    <FaQuoteLeft className="lp-quote-icon" />
                                    <p className="lp-testimonial-quote-text">
                                        "ClickMecha gave our brand a completely new identity. In just 3 months, our social media reach grew 4x and leads actually started converting. They delivered exactly what they promised — and that's what matters the most."
                                    </p>
                                    <div className="lp-testimonial-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="lp-star-icon" />
                                        ))}
                                    </div>
                                    <div className="lp-testimonial-author">
                                        <div className="lp-author-details">
                                            <p className="lp-author-role">— Happy Client ⭐</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lp-testimonial-highlights">
                                    <div className="lp-highlight-pill">
                                        <span className="lp-pill-number">4x</span>
                                        <span className="lp-pill-label">Reach Growth</span>
                                    </div>
                                    <div className="lp-highlight-pill">
                                        <span className="lp-pill-number">3x</span>
                                        <span className="lp-pill-label">Lead Conversion</span>
                                    </div>
                                    <div className="lp-highlight-pill">
                                        <span className="lp-pill-number">1yr</span>
                                        <span className="lp-pill-label">Time to Results</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Google Reviews Section */}
            <div className="lp-google-reviews-section">
                <div className="container">
                    <div className="lp-google-reviews-header text-center">
                        <span className="lp-google-reviews-badge">GOOGLE REVIEWS</span>
                        <h2 className="lp-google-reviews-title">
                            What Our Clients Say <span className="lp-highlight-text">On Google</span>
                        </h2>
                        <p className="lp-google-reviews-subtitle mx-auto">
                            Real reviews from real businesses we've helped grow.
                        </p>
                    </div>
                    <div className="lp-trustindex-widget">
                        <div ref={trustIndexRef}></div>
                    </div>
                </div>
            </div>

            {/* Work Showcase Section */}
            <Work workShowcase={workShowcase} />

            {/* Final CTA Section */}
            <div className="lp-cta-section">
                <div className="container">
                    <div className="lp-cta-card" style={{ backgroundImage: `url(${serviceDetailBg})` }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8 mb-4 mb-lg-0 text-start">
                                <h2 className="lp-cta-title">Ready to Transform Your Digital Presence?</h2>
                                <p className="lp-cta-desc">
                                    Don't let your competitors steal the spotlight. Partner with ClickMecha today and let's build a growth engine that scales your business to new heights.
                                </p>
                            </div>
                            <div className="col-lg-4 text-lg-end text-center">
                                <button className="lp-cta-btn" onClick={openModal}>
                                    Let's Grow Together
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Process Section */}
            <div className="lp-new-process-section py-5 mb-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="lp-new-process-heading mb-3">How Onboarding Works</h2>
                        <p className="lp-new-process-subheading mx-auto" style={{ maxWidth: '800px' }}>
                            A streamlined onboarding process designed to align with your business goals, set up tracking, and get your lead-generation campaigns live in no time.
                        </p>
                    </div>
                    <div className="row position-relative lp-process-row">
                        {/* Step 1 */}
                        <div className="col-lg-3 col-md-6 mb-5 lp-process-step-col">
                            <div className="lp-step-icon-wrapper">
                                <div className="lp-step-icon-box">
                                    <img src={processStrategy} alt="Research" />
                                </div>
                                <div className="lp-step-badge">1</div>
                                <div className="lp-step-arrow d-none d-lg-block"><FaArrowRight /></div>
                            </div>
                            <h4 className="lp-step-title text-center mt-4 mb-2">Discovery & Strategy Audit</h4>
                            <p className="lp-step-body text-center">
                                We kick off with a detailed discovery session to understand your business goals, target audience, and audit your existing advertising & SEO accounts.
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="col-lg-3 col-md-6 mb-5 lp-process-step-col">
                            <div className="lp-step-icon-wrapper">
                                <div className="lp-step-icon-box">
                                    <img src={processPlanning} alt="Strategy" />
                                </div>
                                <div className="lp-step-badge">2</div>
                                <div className="lp-step-arrow d-none d-lg-block"><FaArrowRight /></div>
                            </div>
                            <h4 className="lp-step-title text-center mt-4 mb-2">Technical Setup & Tracking</h4>
                            <p className="lp-step-body text-center">
                                We configure landing pages, set up precise conversion tracking, and integrate lead routing into your CRM so every action is tracked from day one.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="col-lg-3 col-md-6 mb-5 lp-process-step-col">
                            <div className="lp-step-icon-wrapper">
                                <div className="lp-step-icon-box">
                                    <img src={processBranding} alt="Execution" />
                                </div>
                                <div className="lp-step-badge">3</div>
                                <div className="lp-step-arrow d-none d-lg-block"><FaArrowRight /></div>
                            </div>
                            <h4 className="lp-step-title text-center mt-4 mb-2">Campaign Launch & Testing</h4>
                            <p className="lp-step-body text-center">
                                Your campaigns go live! We closely monitor daily performance, launch A/B tests on creatives/copies, and optimize targeting to ensure high-quality lead generation.
                            </p>
                        </div>
                        {/* Step 4 */}
                        <div className="col-lg-3 col-md-6 mb-5 lp-process-step-col">
                            <div className="lp-step-icon-wrapper">
                                <div className="lp-step-icon-box">
                                    <img src={processResult} alt="Optimization" />
                                </div>
                                <div className="lp-step-badge">4</div>
                            </div>
                            <h4 className="lp-step-title text-center mt-4 mb-2">Weekly Optimization & Scaling</h4>
                            <p className="lp-step-body text-center">
                                We host weekly syncs to align on progress, adjust bids and keywords dynamically, and scale winning strategies for predictable B2B sales pipelines.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="lp-faq-section py-5">
                <div className="container">
                    <div className="lp-faq-header text-center mb-5">
                        <span className="lp-faq-badge">QUESTIONS?</span>
                        <h2 className="lp-faq-title-main">Frequently Asked <span className="lp-highlight-text">Questions</span></h2>
                        <p className="lp-faq-subtitle mx-auto" style={{ maxWidth: '600px' }}>
                            Have questions about our lead generation process, pricing, or guarantee? Find answers to the most common queries below.
                        </p>
                    </div>

                    <div className="lp-faq-list mx-auto" style={{ maxWidth: '800px' }}>
                        {faqs.map((faq, index) => {
                            const isOpen = activeFaq === index;
                            return (
                                <div key={index} className={`lp-faq-item ${isOpen ? 'active' : ''}`}>
                                    <div className="lp-faq-question-box" onClick={() => toggleFaq(index)}>
                                        <h3 className="lp-faq-question">{faq.question}</h3>
                                        <span className="lp-faq-icon">{isOpen ? '−' : '+'}</span>
                                    </div>
                                    <div className="lp-faq-answer-box">
                                        <p className="lp-faq-answer">{faq.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Our Services Section */}
            <div className="lp-services-section py-5">
                <div className="container">
                    <div className="lp-services-header text-center mb-5">
                        <span className="lp-services-badge">WHAT WE DO</span>
                        <h2 className="lp-services-title-main">Our Core <span className="lp-highlight-text">Services</span></h2>
                        <p className="lp-services-subtitle mx-auto" style={{ maxWidth: '600px' }}>
                            We provide comprehensive digital marketing solutions tailored to scale your brand and drive measurable conversions.
                        </p>
                    </div>

                    <div className="row justify-content-center g-4">
                        {dynamicServices.map((service, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="lp-service-card">
                                    <h3 className="lp-service-title">{service.title}</h3>
                                    <div className="lp-service-icon-wrapper">
                                        <img src={service.icon} alt={service.title} className="lp-service-icon" />
                                    </div>
                                    <p className="lp-service-desc">{service.description || service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Simple Landing Footer */}
            <div className="lp-simple-footer py-5 text-center">
                <div className="container">
                    <div className="lp-footer-info">
                        <div className="lp-footer-info-item">
                            <FaMapMarkerAlt className="lp-footer-info-icon" />
                            <span>34, N W Ave Rd, North Ave, West Punjabi Bagh, Delhi, 110026</span>
                        </div>
                        <div className="lp-footer-info-item">
                            <FaPhoneAlt className="lp-footer-info-icon" />
                            <a href="tel:+919999008998">+91 99990 08998</a>
                        </div>
                        <div className="lp-footer-info-item">
                            <FaEnvelope className="lp-footer-info-icon" />
                            <a href="mailto:kavya@clickmecha.com">kavya@clickmecha.com</a>
                        </div>
                    </div>

                    <div className="lp-footer-social d-flex justify-content-center gap-4 mb-3">
                        <a href="https://www.linkedin.com/company/clickmecha" target="_blank" rel="noopener noreferrer" className="lp-footer-social-icon"><FaLinkedin /></a>
                        <a href="https://www.facebook.com/theclickmechaa" target="_blank" rel="noopener noreferrer" className="lp-footer-social-icon"><FaFacebook /></a>
                        <a href="https://www.instagram.com/theclickmechaa" target="_blank" rel="noopener noreferrer" className="lp-footer-social-icon"><FaInstagram /></a>
                    </div>
                    <p className="lp-footer-copyright mb-0">
                        Copyright © kavya kapoor. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Video Lightbox Modal Popup */}
            {selectedVideo && (
                <div className="lp-video-modal-overlay" onClick={() => setSelectedVideo(null)}>
                    <div className="lp-video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lp-video-modal-close" onClick={() => setSelectedVideo(null)}>
                            <FaTimes />
                        </button>
                        <video src={selectedVideo} controls autoPlay loop playsInline className="lp-video-modal-player" />
                    </div>
                </div>
            )}

            {/* Image Lightbox Modal Popup */}
            {selectedImage && (
                <div className="lp-video-modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="lp-image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lp-video-modal-close" onClick={() => setSelectedImage(null)}>
                            <FaTimes />
                        </button>
                        <img src={selectedImage} alt="Dashboard Proof Detail" className="lp-image-modal-view" />
                    </div>
                </div>
            )}

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/919999008998?text=Hi!%20I'm%20interested%20in%20your%20lead%20generation%20and%20marketing%20services."
                className="lp-whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp className="lp-whatsapp-icon" />
            </a>
        </div>
    );
};

export default LandingPage;
