import React, { useEffect, useState, useRef } from 'react';
import './ServiceDetail.css';
import '../LandingPage/LandingPage.css';
import serviceDetailBg from '../../assets/service-images/service-detail-bg.png';
import helpSticker from '../../assets/service-images/help-sticker.png';
import rocketIcon from '../../assets/home-images/rocket.png';
import { FaCheckCircle, FaEnvelope, FaHandPointRight, FaMapMarkerAlt, FaPhoneAlt, FaArrowRight, FaArrowLeft, FaTimes, FaWhatsapp, FaExternalLinkAlt, FaBuilding, FaUsers, FaGlobe, FaPlay, FaUser, FaCommentDots, FaShieldAlt, FaBolt } from 'react-icons/fa';
import Slider from 'react-slick';
import cmAward from '../../assets/CM-Award.jpg.webp';
import beerCafeBefore from '../../assets/before-after-image/2_Beercafe 1.jpg';
import flexxoBefore from '../../assets/before-after-image/2_Flexxo 1.jpg';
import madhusudanBefore from '../../assets/before-after-image/2_Madhusudhan 1.jpg';
import omBefore from '../../assets/before-after-image/2_Om 1.jpg';
import beerCafeAfter from '../../assets/before-after-image/2_Beercafe 2.jpg';
import flexxoAfter from '../../assets/before-after-image/2_Flexxo 2.jpg';
import madhusudanAfter from '../../assets/before-after-image/2_Madhusudhan 2.jpg';
import omAfter from '../../assets/before-after-image/2_Om 2.jpg';
import proofFbSales from '../../assets/proof-images/proof-facebook-sales.jpg';
import proofShopifyConv from '../../assets/proof-images/proof-shopify-conversion.jpg';
import proofFbRoas from '../../assets/proof-images/proof-facebook-roas.jpg';
import proofShopifySales1 from '../../assets/proof-images/proof-shopify-sales-1.jpg';
import proofShopifySales2 from '../../assets/proof-images/proof-shopify-sales-2.jpg';
import Contact from '../../components/Contact/Contact';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useContactModal } from '../../context/ContactModalContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Link, useParams, useLocation } from 'react-router-dom';
import { CITY_LOCATIONS, getCityPagePath, US_CITY_LOCATIONS } from '../../data/cities';
import { submitContactForm } from '../../utils/api';
import { getSubServicePagePath } from '../../data/services';
import { applyJsonLdSchema, removeJsonLdSchema, generateFaqSchema, generateReviewSchema } from '../../utils/seo';


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
import googleAdsIcon from '../../assets/specialized-icons/google-ads.png';
import leadGenIcon from '../../assets/specialized-icons/lead-gen.png';
import youtubeIcon from '../../assets/specialized-icons/youtube.png';
import ecommerceIcon from '../../assets/specialized-icons/ecommerce.png';
import facebookIcon from '../../assets/specialized-icons/facebook.png';
import localBusinessIcon from '../../assets/specialized-icons/local-business.png';
import googleAnalyticsIcon from '../../assets/specialized-icons/google-analytics.png';
import bloggingIcon from '../../assets/specialized-icons/blogging.png';
import instagramIcon from '../../assets/specialized-icons/instagram.png';

import logo1 from '../../assets/home-images/imgi_10_nww_c9.png';
import logo2 from '../../assets/home-images/imgi_35_cl5.png';
import logo3 from '../../assets/home-images/imgi_36_cl6.png';
import logo4 from '../../assets/home-images/imgi_49_cl20.png';
import logo5 from '../../assets/home-images/imgi_50_cl23.png';
import logo6 from '../../assets/home-images/imgi_51_cl24.png';

const homeClientLogos = [
    { logo: logo1 },
    { logo: logo2 },
    { logo: logo3 },
    { logo: logo4 },
    { logo: logo5 },
    { logo: logo6 }
];

import performanceChart1 from '../../assets/service-images/performance-chart-1.png';
import performanceChart2 from '../../assets/service-images/performance-chart-2.png';
import performanceChart3 from '../../assets/service-images/performance-chart-3.png';
import performanceChart4 from '../../assets/service-images/performance-chart-4.png';
import performanceChart5 from '../../assets/service-images/performance-chart-5.png';
import change1 from '../../assets/service-images/change1png.png';
import change2 from '../../assets/service-images/change2png.png';
import change3 from '../../assets/service-images/change3png.png';
import change4 from '../../assets/service-images/change4png.png';
import change5 from '../../assets/service-images/change5png.png';
import change6 from '../../assets/service-images/change6png.png';
import digitalMarketingInfographic from '../../assets/service-images/digital-marketing-infographic.png';
import featured2 from '../../assets/featured-in/featured-2.png';
import featured3 from '../../assets/featured-in/featured-3.png';
import featured4 from '../../assets/featured-in/featured-4.png';
import featured5 from '../../assets/featured-in/featured-5.png';
import news1 from '../../assets/newsimage/1.png';
import news2 from '../../assets/newsimage/2.png';
import news3 from '../../assets/newsimage/3.png';
import news4 from '../../assets/newsimage/4.png';
import news5 from '../../assets/newsimage/5.png';
import news6 from '../../assets/newsimage/6.png';
import news7 from '../../assets/newsimage/7.png';
import news8 from '../../assets/newsimage/8.png';
import news9 from '../../assets/newsimage/9.png';
import news10 from '../../assets/newsimage/10.png';
import news11 from '../../assets/newsimage/11.png';
import news12 from '../../assets/newsimage/12.png';

const defaultTestimonials = [
    {
        name: "Roshan Di Kulfi",
        position: "Marketing Head",
        content: "ClickMecha completely revamped our digital strategy. Our online presence grew multifold and we saw a significant surge in direct customer inquiries."
    },
    {
        name: "Neelgagan",
        position: "Brand Director",
        content: "Outstanding performance marketing team! They delivered top Google search rankings for our key products in less than 3 months."
    },
    {
        name: "Mello Store",
        position: "Founder & CEO",
        content: "Their lead generation and SEO work has been game-changing for our brand. Truly a reliable growth partner that delivers measurable results."
    },
    {
        name: "The Beer Café",
        position: "Operations Lead",
        content: "Collaborating with ClickMecha brought high conversion rates and massive engagement across our social media platforms."
    }
];

const mediaPartnersList = [
    {
        id: 1,
        name: "India Headline",
        img: news1,
        link: "https://indiaheadline.in/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
    {
        id: 2,
        name: "Prime News TV",
        img: news2,
        link: "https://primenewstv.com/index.php/2026/04/28/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
    {
        id: 3,
        name: "Asia News",
        img: news3,
        link: "https://assianews.com/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/50481/"
    },
    {
        id: 4,
        name: "News Radian",
        img: news4,
        link: "https://newsradian.com/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
    {
        id: 5,
        name: "Republic News Today",
        img: news5,
        link: "https://republicnewstoday.com/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
    {
        id: 6,
        name: "up18 news",
        img: news6,
        link: "https://up18news.com/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
    {
        id: 7,
        name: "English Loktej",
        img: news7,
        link: "https://english.loktej.com/article/26083/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi#google_vignette"
    },
    {
        id: 8,
        name: "First India",
        img: news8,
        link: "https://firstindia.co.in/news/press-releases/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi-1777379889"
    },
    {
        id: 9,
        name: "Ahmedabad Mirror",
        img: news9,
        link: "https://www.ahmedabadmirror.com/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/81912406.html"
    },
    {
        id: 10,
        name: "My Nation",
        img: news10,
        link: "https://www.mynation.com/business/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi-articleshow-285uuyu"
    },
    {
        id: 11,
        name: "News 21",
        img: news11,
        link: "https://news21.co.in/index.php/2026/04/28/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
    {
        id: 12,
        name: "The Startup Story",
        img: news12,
        link: "https://thestartupstory.co.in/why-click-mecha-is-becoming-the-trusted-digital-marketing-agency-in-delhi/"
    },
];

const specializedServices = [
    { title: "Digital Marketing Services", icon: <img src={spDigital} alt="Digital Marketing" /> },
    { title: "Search Engine Optimization Services", icon: <img src={spSeo} alt="SEO" /> },
    { title: "LinkedIn Marketing Services", icon: <img src={linkedinIcon} alt="LinkedIn" /> },
    { title: "WordPress Website Design Services", icon: <img src={spWordpress} alt="WordPress" /> },
    { title: "Pay Per Click Services", icon: <img src={spPpc} alt="PPC" /> },
    { title: "Website Designing Services", icon: <img src={spWebDesign} alt="Web Design" /> },
    { title: "Social Media Marketing Services", icon: <img src={SocialMediaIcon} alt="Social Media" /> },
    { title: "Google Adsense Services", icon: <img src={spPpc} alt="AdSense" /> },
    { title: "Affiliate Marketing Services", icon: <img src={affiliateIcon} alt="Affiliate" /> },
    { title: "Mobile App Marketing Services", icon: <img src={mobileAppIcon} alt="App Marketing" /> },
    { title: "Email Marketing Services", icon: <img src={emailIcon} alt="Email Marketing" /> },
    { title: "Lead Generation Services", icon: <img src={leadGenIcon} alt="Lead Gen" /> },
    { title: "Google AdWords Services", icon: <img src={googleAdsIcon} alt="Google Ads" /> },
    { title: "Youtube Marketing Services", icon: <img src={youtubeIcon} alt="Youtube" /> },
    { title: "E-commerce Marketing Services", icon: <img src={ecommerceIcon} alt="Ecommerce" /> },
    { title: "Facebook Marketing Services", icon: <img src={facebookIcon} alt="Facebook" /> },
    { title: "Local Business Listing Services", icon: <img src={localBusinessIcon} alt="Local Listing" /> },
    { title: "Google Analytics Services", icon: <img src={googleAnalyticsIcon} alt="Analytics" /> },
    { title: "Blogging Services", icon: <img src={bloggingIcon} alt="Blogging" /> },
    { title: "Instagram Marketing Services", icon: <img src={instagramIcon} alt="Instagram" /> }
];





const GoogleColorIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="sd-google-icon-svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
);

const delhiGoogleReviews = [
    {
        id: 1,
        name: "Mohit Sharma",
        badge: "Local Guide • 14 reviews",
        avatarBg: "#EA4335",
        initials: "MS",
        time: "2 weeks ago",
        rating: 5,
        content: "Best digital marketing agency in West Delhi! Click Mecha handled our Google Ads and SEO campaigns, and within 2 months our business inquiries jumped by more than 200%. The team in Punjabi Bagh is super supportive and transparent with weekly reports."
    },
    {
        id: 2,
        name: "Priya Malhotra",
        badge: "Verified Client • 5 reviews",
        avatarBg: "#4285F4",
        initials: "PM",
        time: "3 weeks ago",
        rating: 5,
        content: "Outstanding experience working with Click Mecha. Their SEO strategy got our high-intent keywords ranked on page 1 of Google in Delhi NCR. Very professional team, always accessible and result-oriented."
    },
    {
        id: 3,
        name: "Rahul Verma",
        badge: "Director, R.V. Enterprises • 8 reviews",
        avatarBg: "#34A853",
        initials: "RV",
        time: "a month ago",
        rating: 5,
        content: "We hired Click Mecha for website redesigning and PPC lead generation. The quality of leads we received from Delhi and surrounding areas was top notch. Highly recommended digital marketing company in Delhi!"
    },
    {
        id: 4,
        name: "Sanjay Aggarwal",
        badge: "Local Guide • 22 reviews",
        avatarBg: "#F7941E",
        initials: "SA",
        time: "a month ago",
        rating: 5,
        content: "Click Mecha is definitely the #1 digital marketing company in Delhi. They understand local market dynamics and helped our brand gain immense visibility on Google Maps and search results. Great ROI!"
    },
    {
        id: 5,
        name: "Neha Gupta",
        badge: "Founder, Bloom Studio • 6 reviews",
        avatarBg: "#9C27B0",
        initials: "NG",
        time: "2 months ago",
        rating: 5,
        content: "Their social media marketing and performance ads delivered incredible results for our brand in Delhi NCR. Creative ad copies, crisp designs, and great communication throughout."
    },
    {
        id: 6,
        name: "Vikram Singhania",
        badge: "Local Guide • 19 reviews",
        avatarBg: "#00897B",
        initials: "VS",
        time: "2 months ago",
        rating: 5,
        content: "Honest, transparent, and result-focused marketing agency. Unlike others who promise unrealistic things, Click Mecha delivered genuine organic traffic and high-converting leads for our business in Delhi."
    },
    {
        id: 7,
        name: "Rohit Ahuja",
        badge: "Local Guide • 11 reviews",
        avatarBg: "#FBBC05",
        initials: "RA",
        time: "3 months ago",
        rating: 5,
        content: "Superb SEO and Google Ads management! Team Click Mecha knows exactly how to scale a business online. Best marketing agency in West Punjabi Bagh Delhi."
    },
    {
        id: 8,
        name: "Amit Sethi",
        badge: "Local Guide • 31 reviews",
        avatarBg: "#3F51B5",
        initials: "AS",
        time: "3 months ago",
        rating: 5,
        content: "Working with Click Mecha has been a game-changer for our lead pipeline. They are truly growth partners who care about client success and deliver measurable results."
    }
];

const IndiaGateIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="sd-monument-svg">
        {/* Base Steps */}
        <rect x="4" y="58" width="56" height="3" rx="1" fill="#F7941E" />
        <rect x="8" y="54" width="48" height="4" rx="1" fill="#F7941E" />
        <rect x="12" y="50" width="40" height="4" rx="1" fill="#F7941E" />

        {/* Main Pillars */}
        <rect x="14" y="24" width="10" height="26" fill="#F7941E" />
        <rect x="40" y="24" width="10" height="26" fill="#F7941E" />

        {/* Central Archway */}
        <path d="M24 50V35C24 30.58 27.58 27 32 27C36.42 27 40 30.58 40 35V50H24Z" fill="#FFF8EE" stroke="#F7941E" strokeWidth="2.5" />
        <path d="M27 50V37C27 34.2 29.2 32 32 32C34.8 32 37 34.2 37 37V50" stroke="#0E1D28" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

        {/* Middle Cornice */}
        <rect x="10" y="20" width="44" height="4" rx="1" fill="#F7941E" />
        <rect x="14" y="16" width="36" height="4" fill="#F7941E" />

        {/* Upper Structure */}
        <rect x="16" y="9" width="32" height="7" rx="1" fill="#F7941E" />
        <line x1="20" y1="12.5" x2="44" y2="12.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Top Dome */}
        <rect x="24" y="5" width="16" height="4" rx="1" fill="#F7941E" />
        <path d="M27 5C27 2.5 29.2 1 32 1C34.8 1 37 2.5 37 5H27Z" fill="#0E1D28" />

        {/* Architectural lines */}
        <line x1="19" y1="28" x2="19" y2="46" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <line x1="45" y1="28" x2="45" y2="46" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
);

const BuildingIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="sd-monument-svg">
        <rect x="8" y="56" width="48" height="4" rx="1" fill="#F7941E" />
        <rect x="14" y="14" width="22" height="42" rx="2" fill="#F7941E" />
        <rect x="36" y="24" width="16" height="32" rx="2" fill="#0E1D28" />
        <rect x="18" y="20" width="4" height="5" rx="1" fill="#ffffff" opacity="0.9" />
        <rect x="26" y="20" width="4" height="5" rx="1" fill="#ffffff" opacity="0.9" />
        <rect x="18" y="28" width="4" height="5" rx="1" fill="#ffffff" opacity="0.9" />
        <rect x="26" y="28" width="4" height="5" rx="1" fill="#0E1D28" />
        <rect x="18" y="36" width="4" height="5" rx="1" fill="#ffffff" opacity="0.9" />
        <rect x="26" y="36" width="4" height="5" rx="1" fill="#ffffff" opacity="0.9" />
        <rect x="40" y="30" width="3" height="4" rx="0.5" fill="#ffffff" opacity="0.9" />
        <rect x="46" y="30" width="3" height="4" rx="0.5" fill="#ffffff" opacity="0.9" />
        <rect x="40" y="38" width="3" height="4" rx="0.5" fill="#F7941E" />
        <rect x="46" y="38" width="3" height="4" rx="0.5" fill="#ffffff" opacity="0.9" />
        <rect x="22" y="47" width="6" height="9" fill="#0E1D28" />
        <line x1="25" y1="6" x2="25" y2="14" stroke="#0E1D28" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const getOfficeData = (locationName, isDubaiLocation) => {
    if (isDubaiLocation) {
        return {
            title: "Our Office in Dubai",
            city: "Dubai",
            typeBadge: "Regional Office",
            isDelhi: false,
            address: "2nd floor, Aspin Commercial Tower - Office no -42 - Sheikh Zayed Rd - Trade Center First - Dubai - United Arab Emirates",
            email: "coffee@clickmecha.com",
            whatsapp: "+919999008998",
            whatsappDisplay: "+91 99990 08998",
            mapLink: "https://maps.google.com/?q=Aspin+Commercial+Tower+Dubai",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14438.21684815678!2d55.27029961470927!3d25.218251855826303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428853519993%3A0x709d27d64e65ca6a!2sAspin%20Commercial%20Tower!5e0!3m2!1sen!2sin!4v1775152751880!5m2!1sen!2sin"
        };
    }
    return {
        title: "Our Office in Delhi NCR",
        city: "Delhi",
        typeBadge: "Corporate Office",
        isDelhi: true,
        address: "34, N W Ave Rd, North Ave, West Punjabi Bagh, Delhi, 110026",
        email: "coffee@clickmecha.com",
        whatsapp: "+919999008998",
        whatsappDisplay: "+91-9910308266",
        mapLink: "https://maps.app.goo.gl/yLzYpDq98PZzS68b9",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5157853805426!2d77.12619127601755!3d28.67421378218569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d031b84fef5b1%3A0x67f6457ebbbde2f3!2sDigital%20Marketing%20Agency%20In%20West%20Delhi%20%7C%20Click%20Mecha!5e0!3m2!1sen!2sin!4v1776965890271!5m2!1sen!2sin"
    };
};

const getStrategies = (locationName) => [
    {
        title: "Social Media Marketing",
        serviceTitle: "Social Media Marketing Services",
        subtitle: "Build a stronger social presence with content and campaigns designed to reach the right audience and support your business goals.",
        points: [
            "Social media strategy",
            "Content & creative",
            "Paid social campaigns",
            "Audience engagement"
        ],
        btnText: "GROW MY SOCIAL PRESENCE →"
    },
    {
        title: "Search Engine Optimization (SEO)",
        serviceTitle: "Search Engine Optimization Services",
        subtitle: "Improve your search visibility and attract relevant organic traffic with SEO built around your audience, competition, and business goals.",
        points: [
            "Keyword research & strategy",
            "On-page & technical SEO",
            "Local SEO",
            "Link building"
        ],
        btnText: "IMPROVE MY SEARCH VISIBILITY →"
    },
    {
        title: "Pay-Per-Click (PPC) Advertising",
        serviceTitle: "Pay Per Click Services",
        subtitle: "Reach potential customers through targeted paid campaigns across search and other digital platforms, with ongoing optimization based on campaign performance.",
        points: [
            "Google Ads & Bing Ads",
            "Conversion-focused campaigns",
            "A/B testing & optimization",
            "Performance tracking"
        ],
        btnText: "LAUNCH A PPC CAMPAIGN →"
    },
    {
        title: "Local SEO",
        serviceTitle: "Local SEO Services",
        subtitle: "Help local customers find your business when they search for products and services in your area.",
        points: [
            "Google Business Profile optimization",
            "Local keyword targeting",
            "Local citations",
            "Location-based SEO"
        ],
        btnText: "IMPROVE MY LOCAL VISIBILITY →"
    },
    {
        title: "Google Ads & Display Advertising",
        serviceTitle: "Google Ads & Display Advertising Services",
        subtitle: "Reach potential customers across Google Search, Shopping and Display with targeted paid campaigns.",
        points: [
            "Search & Shopping campaigns",
            "Display advertising",
            "Remarketing",
            "Campaign optimization"
        ],
        btnText: "GROW WITH GOOGLE ADS →"
    }
];

const caseStudies = [
    {
        client: "Neelgagan",
        results: [
            { keyword: "Adhesive tapes", rank: 1 },
            { keyword: "Document protector", rank: 3 },
            { keyword: "Notebook stenographer", rank: 1 },
            { keyword: "Photo glossy paper", rank: 3 },
            { keyword: "Cash receipt book", rank: 2 }
        ]
    },
    {
        client: "Mello Store",
        results: [
            { keyword: "Sumi ink", rank: 1 },
            { keyword: "Gansai tambi", rank: 3 },
            { keyword: "Calligraphy pens", rank: 2 },
            { keyword: "Coloured pencils", rank: 1 },
            { keyword: "Ohto pens", rank: 2 }
        ]
    },
    {
        client: "Elworld Organic",
        results: [
            { keyword: "A2 desi cow ghee", rank: 2 },
            { keyword: "Medjoul dates", rank: 1 },
            { keyword: "Lava salt", rank: 2 },
            { keyword: "Telangana sona rice", rank: 2 },
            { keyword: "Organic arhar dal", rank: 1 }
        ]
    },
    {
        client: "Masson Development",
        results: [
            { keyword: "Interior Design Services Uxbridge", rank: 2 },
            { keyword: "Design & Build Services in Uxbridge", rank: 1 },
            { keyword: "Construction Company Uxbridge", rank: 3 },
            { keyword: "Residential Construction Uxbridge", rank: 1 },
            { keyword: "Commercial Construction Services Uxbridge", rank: 4 }
        ]
    },
    {
        client: "Work Exchange",
        results: [
            { keyword: "Coworking space near dwarka", rank: 1 },
            { keyword: "Best coworking in dwarka", rank: 3 },
            { keyword: "Virtual office space dwarka", rank: 1 },
            { keyword: "Top coworking space in dwarka", rank: 2 },
            { keyword: "Office coworking space dwarka", rank: 1 }
        ]
    },
    {
        client: "Fabilicious Fashion",
        results: [
            { keyword: "Emerald green lehenga", rank: 2 },
            { keyword: "Indo western jumpsuit", rank: 1 },
            { keyword: "Balloon sleeved dress", rank: 2 },
            { keyword: "Lime green jumpsuit", rank: 3 },
            { keyword: "Indian fusion dress", rank: 1 }
        ]
    },
    {
        client: "Amit GT Couture",
        results: [
            { keyword: "Indian designer lehenga", rank: 2 },
            { keyword: "Indian lehenga dress", rank: 3 },
            { keyword: "Wedding saree indian", rank: 1 },
            { keyword: "Lehenga online shop", rank: 2 },
            { keyword: "Indian lehenga", rank: 2 }
        ]
    },
    {
        client: "Mega Furniture",
        results: [
            { keyword: "Home decor near me", rank: 2 },
            { keyword: "Mega furniture near me", rank: 1 },
            { keyword: "Furniture retailers in usa", rank: 1 },
            { keyword: "Bedroom set for teens", rank: 3 },
            { keyword: "Furniture store in usa", rank: 2 },
            { keyword: "Teenager bedroom set", rank: 1 }
        ]
    }
];

const industriesData = [
    { id: 'real-estate', title: 'Real estate and property developers', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'healthcare', title: 'Healthcare, clinics, and hospitals', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'education', title: 'Education, coaching, and ed-tech', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'ecommerce', title: 'E-commerce and direct-to-consumer brands', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'saas', title: 'SaaS and technology companies', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'hospitality', title: 'Hospitality, restaurants, and hotels', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'retail', title: 'Retail and fashion', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'manufacturing', title: 'Manufacturing and B2B services', img: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'finance', title: 'Financial services and fintech', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'professional', title: 'Professional services including legal, consulting, and accounting', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];


const getWhyClickmecha = (locationName) => [
    {
        title: "We Report on What Matters",
        desc: "Traffic, leads, cost per acquisition, return on ad spend. No vanity numbers hiding the truth. If something is not working, you hear it from us first.",
        icon: change1
    },
    {
        title: "You Talk to the People Doing the Work",
        desc: "No account manager layers. When your strategist or ads specialist makes a change, you hear it from them. Direct communication, fewer surprises.",
        icon: change2
    },
    {
        title: "No Long Lock-ins",
        desc: "Month-to-month engagements after the initial setup. If the work does not deliver, you walk away. That pressure keeps us sharp.",
        icon: change3
    },
    {
        title: "Strategy Built Around Your Business",
        desc: "A B2B SaaS firm in Cyber City and a jewellery brand in Karol Bagh do not need the same playbook. We build the strategy around your business, your audience, and your margins.",
        icon: change4
    },
    {
        title: "Transparent Pricing",
        desc: "You know exactly what each service costs, what is included, and what is not. No hidden retainers, no surprise invoices, no bundled fees that hide where your money is going.",
        icon: change5
    },
    {
        title: "Work That Ranks in Google and AI Search",
        desc: "We optimise for traditional search engines and the new wave of AI-powered search. Showing up in ChatGPT, Perplexity, and Google AI Overviews is where the next five years of organic traffic is heading, and we build for it now.",
        icon: change6
    }
];

const getDetailedServices = (locationName) => [
    {
        title: "SEO That Ranks and Keeps Ranking",
        content: (
            <>
                We help you get buyers, not window shoppers, to find your website on Google. Technical audits, fixing things on the page, local SEO for Google Business Profile, content that answers real buyer questions, and building links from sites that matter. You can check Search Console to see how your rankings have changed from month to month.
            </>
        )
    },
    {
        title: "Paid Ads That Respect Your Budget",
        content: (
            <>
                Ads on Google, Meta, and LinkedIn. Built with strict keyword match types, the right negative lists, and landing pages that turn clicks into sales. We talk about cost per lead and return on ad spend, not impressions that don't help you pay your bills.
            </>
        )
    },
    {
        title: "Social That Drives Business, Not Just Followers",
        content: (
            <>
                YouTube, Facebook, Instagram, and LinkedIn. We choose the best platform for your audience, create a content plan around it, run paid ads, and handle daily interactions. Having followers is a side effect. The point is money.
            </>
        )
    },
    {
        title: "Content Humans Read and Google Ranks",
        content: (
            <>
                Blog posts, copy for landing pages, long-form guides, email sequences, and case studies. Written by people who know your business, made to rank well on Google, and made to show up in AI search tools like ChatGPT, Perplexity, and Google AI Overviews.
            </>
        )
    },
    {
        title: "Websites Built to Convert, Not Just Look Nice",
        content: (
            <>
                Websites that load quickly and are designed for mobile devices, made with WordPress, Shopify, or custom stacks. Designed for fast page loading, a clean look, and clear paths to conversion. You are losing half of your visitors before they even see a word if your site takes more than three seconds to load.
            </>
        )
    },
    {
        title: "Visual Work That Supports the Campaign",
        content: (
            <>
                Ad creative, graphics for social media, brand identity, marketing materials, and pitch decks. Every design is based on a specific business goal, not a generic stock template. Strong visuals give your campaigns a chance to stand out in crowded feeds.
            </>
        )
    }
];

const getCityFaqs = (locationName) => [
    {
        question: `How much does a digital marketing company in ${locationName} cost?`,
        answer: "It depends on the services and scope of work. We usually understand your requirements first and then suggest a suitable monthly plan."
    },
    {
        question: "How long does it take to see results?",
        answer: "Google Ads can show results within a few days. SEO generally takes 3 to 6 months to show clear ranking improvements."
    },
    {
        question: `Do you work with small businesses or only big brands?`,
        answer: "We work with both small and mid-sized businesses. Our plans are flexible and based on your goals and budget."
    },
    {
        question: "What is the difference between SEO and Google Ads?",
        answer: "SEO helps you rank organically over time, while Google Ads gives quick visibility by paying for clicks. Both work well together."
    },
    {
        question: "How are you different from other digital marketing agencies?",
        answer: `We keep things simple, transparent, and focused on real results — without overpromising or using unnecessary jargon.`
    }
];

const getDelhiFaqs = () => [
    {
        question: "What digital marketing services does Click Mecha offer in Delhi?",
        answer: "Click Mecha offers complete digital marketing services in Delhi, including SEO, Google Ads, Social Media Marketing, PPC Advertising, Website Designing, Content Marketing, Local SEO and Online Reputation Management. Our strategies are designed according to your business goals and target audience."
    },
    {
        question: "Do you provide customized digital marketing services for businesses in Delhi?",
        answer: "Yes, we provide customized digital marketing solutions based on your business requirements, industry, competition and marketing goals. Every business is different, so we create a strategy that focuses on the channels that can deliver the best results for your brand."
    },
    {
        question: "How do you measure the success of a digital marketing campaign?",
        answer: "We measure campaign performance through important metrics such as website traffic, keyword rankings, leads, conversions, cost per lead, ROI and engagement. Regular reports help you understand exactly how your digital marketing investment is performing."
    },
    {
        question: "Why should I choose Click Mecha as my digital marketing agency in Delhi?",
        answer: "Click Mecha focuses on creating result-driven digital marketing strategies rather than using the same approach for every business. Our team works on understanding your business, competitors and audience to create campaigns focused on real growth, quality leads and better online visibility."
    },
    {
        question: "How long does it take to see results from digital marketing?",
        answer: "The timeline depends on the services you choose and your business goals. PPC and paid advertising can start generating results quickly, while SEO usually takes a few months to show strong and sustainable growth. We focus on both short-term opportunities and long-term results."
    },
    {
        question: "Which digital marketing service is best for my business?",
        answer: "The best service depends on your business type, competition and goals. SEO is ideal for long-term organic growth, Google Ads can help generate quick leads, and Social Media Marketing helps build brand awareness and engagement. We can create a strategy by combining multiple services."
    }
];

const ServiceDetail = ({ locationLabel }) => {
    const { location } = useParams();
    const formatLocation = (loc) => loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    // locationLabel (from App.jsx prop) takes priority, then useParams, then fallback 'Dubai'
    const locationName = locationLabel || (location ? formatLocation(location) : 'Dubai');
    const isDubaiLocation = locationName.trim().toLowerCase() === 'dubai';

    const currentLoc = useLocation();
    const isDelhiLocation = locationName.trim().toLowerCase() === 'delhi' || currentLoc.pathname.toLowerCase().includes('delhi');
    const pageSlug = currentLoc.pathname.replace(/^\/+|\/+$/g, '') || 'service-detail';
    usePageMeta(pageSlug);

    const strategies = getStrategies(locationName);
    const whyClickmecha = getWhyClickmecha(locationName);
    const detailedServices = getDetailedServices(locationName);
    const cityFaqs = isDelhiLocation ? getDelhiFaqs() : getCityFaqs(locationName);

    const isUsLocation = US_CITY_LOCATIONS.includes(locationName);
    const cityPageLinks = isUsLocation
        ? US_CITY_LOCATIONS.map((city) => ({
            name: city,
            path: getCityPagePath(city)
        }))
        : CITY_LOCATIONS.map((city) => ({
            name: city,
            path: getCityPagePath(city)
        }));

    const officeData = getOfficeData(locationName, isDubaiLocation);

    const { openModal } = useContactModal();
    const sliderRef = useRef(null);

    const resultsSliderSettings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false
    };

    const lpCaseStudies = [
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
    const [activeFaq, setActiveFaq] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formResponse, setFormResponse] = useState({ type: '', text: '' });
    const [helpFormResponse, setHelpFormResponse] = useState({ type: '', text: '' });
    const [isHelpSubmitting, setIsHelpSubmitting] = useState(false);
    const [clients, setClients] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const [activeProofId, setActiveProofId] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleHelpFormSubmit = async (e) => {
        e.preventDefault();
        setHelpFormResponse({ type: '', text: '' });

        const form = e.currentTarget;
        const formData = new FormData(form);
        const allowedFields = ['name', 'email', 'phone', 'message'];
        const payload = {};

        allowedFields.forEach((field) => {
            const value = formData.get(field);
            if (typeof value === 'string') {
                const trimmedValue = value.trim();
                if (trimmedValue) {
                    payload[field] = trimmedValue;
                }
            }
        });

        const countryCode = (formData.get('country_code') || '').split('-')[0] || '+91';
        if (payload.phone) {
            payload.phone = `${countryCode} ${payload.phone}`.trim();
        }

        if (!payload.name || !payload.email || !payload.phone || !payload.message) {
            setHelpFormResponse({
                type: 'error',
                text: 'Please fill in all required fields (Name, Email, Phone, and Message)'
            });
            return;
        }

        const currentPageUrl = typeof window !== 'undefined' ? window.location.href : '';
        payload.page_url = currentPageUrl;
        payload.url = currentPageUrl;

        setIsHelpSubmitting(true);

        try {
            const data = await submitContactForm(payload);

            if (data.status) {
                setHelpFormResponse({
                    type: 'success',
                    text: data.message || 'Thank you! Your query has been submitted successfully.'
                });
                form.reset();
            } else {
                setHelpFormResponse({
                    type: 'error',
                    text: data.message || 'Unable to submit your query right now.'
                });
            }
        } catch (error) {
            setHelpFormResponse({
                type: 'error',
                text: `Error: ${error.message}`
            });
        } finally {
            setIsHelpSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch('https://cms.clickmecha.com/api/home');
                const result = await response.json();
                if (result.status && result.data) {
                    if (result.data.clients) {
                        setClients(result.data.clients);
                    }
                    if (result.data.testimonials && Array.isArray(result.data.testimonials)) {
                        setTestimonials(result.data.testimonials);
                    }
                }
            } catch (err) {
                console.error('Error fetching home data in ServiceDetail:', err);
            }
        };
        fetchHomeData();
    }, []);

    // Dynamic JSON-LD FAQ Schema injection in <head>
    useEffect(() => {
        const schema = generateFaqSchema(cityFaqs);
        applyJsonLdSchema(schema, 'city-faq-schema');

        return () => {
            removeJsonLdSchema('city-faq-schema');
        };
    }, [locationName, isDelhiLocation]);

    // Dynamic JSON-LD Review & Rating Schema injection in <head>
    useEffect(() => {
        const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://clickmecha.com${currentLoc.pathname}`;

        const combinedCount = Math.max(50, 50 + (Array.isArray(testimonials) ? testimonials.length : 0));

        const reviewSchema = generateReviewSchema({
            name: `Click Mecha - Digital Marketing Agency in ${locationName}`,
            description: `Click Mecha is a leading digital marketing company in ${locationName} offering SEO, PPC, Google Ads, and Website Design services with a 4.9 rating on Google.`,
            url: pageUrl,
            ratingValue: '4.9',
            ratingCount: combinedCount,
            reviews: delhiGoogleReviews,
            locationName: locationName
        });

        applyJsonLdSchema(reviewSchema, 'city-review-schema');

        return () => {
            removeJsonLdSchema('city-review-schema');
        };
    }, [locationName, isDelhiLocation, testimonials, currentLoc.pathname]);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };
    const handleServiceFormSubmit = async (e) => {
        e.preventDefault();
        setFormResponse({ type: '', text: '' });

        const form = e.currentTarget;
        const formData = new FormData(form);
        const allowedFields = ['name', 'email', 'phone', 'message'];
        const payload = {};

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

        if (!payload.name || !payload.email || !payload.phone || !payload.message) {
            setFormResponse({
                type: 'error',
                text: 'Please fill in all required fields (Name, Email, Phone, and Message)'
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

    const displayClients = clients.length > 0 ? clients : homeClientLogos;

    return (
        <div className="sd-page-wrapper">
            {/* Hero / Query Section */}
            <div className="sd-hero-section" style={{ position: 'relative' }}>
                {/* Colored Grid Background */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(to right, rgba(247, 148, 30, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(247, 148, 30, 0.07) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>
                <div className="container">
                    <div className="sd-card-container" style={{ background: 'transparent', boxShadow: 'none', position: 'relative', overflow: 'visible', padding: '3.5rem 0' }}>
                        <div className="row align-items-center" style={{ position: 'relative', zIndex: 1 }}>

                            {/* Left Text Content */}
                            <div className="col-lg-7 sd-content-col">
                                <div style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', border: '1px solid #FFE5D9', borderRadius: '50px', padding: '6px 16px', marginBottom: '20px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F7941E', marginRight: '8px' }}></div>
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#F7941E', letterSpacing: '0.5px' }}>RESULTS-DRIVEN DIGITAL MARKETING AGENCY</span>
                                </div>
                                <h1 className="sd-hero-title" style={{ fontSize: '4.2rem', lineHeight: '1.1', fontWeight: '900', marginBottom: '5px', color: '#0E1D28', fontFamily: "'Larken', serif", position: 'relative' }}>
                                    Digital Marketing <br className="d-none d-lg-block" /> <span style={{ color: '#F7941E' }}>Agency</span> in {locationName}
                                </h1>
                                <p className="sd-hero-subtitle" style={{ fontSize: '1.6rem', color: '#888', marginBottom: '25px', fontWeight: '400', fontFamily: 'inherit' }}>for Measurable Business Growth</p>

                                <p className="sd-hero-desc">
                                    We help businesses build a stronger digital presence, reach the right audience, and turn online visibility into meaningful growth. As a digital marketing agency in {locationName}, we combine data-driven insights with SEO, paid media, social media, content, and other digital strategies to create campaigns built around your business goals.
                                </p>
                                <p className="sd-hero-desc" style={{ marginTop: '15px' }}>
                                    Whether your goal is to increase visibility, generate qualified leads, drive website traffic, or improve conversions, we build strategies around what your business actually needs.
                                </p>

                                <div className="sd-stats-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '35px 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#FFF1E0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F7941E', fontSize: '22px' }}>
                                            <FaUsers />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>6+ YEARS</h4>
                                            <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.3', color: '#666' }}>Digital marketing<br />experience</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#E8EAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A5CFF', fontSize: '22px' }}>
                                            <FaBuilding />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>MULTI-INDUSTRY INDIA</h4>
                                            <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.3', color: '#666' }}>Diverse <span>Business sector</span></p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#E6F9F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00B359', fontSize: '22px' }}>
                                            <FaGlobe />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>INDIA + GLOBAL</h4>
                                            <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.3', color: '#666' }}>Indian & <span>International business</span></p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="sd-features-list" style={{ marginTop: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#F7941E', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0, marginTop: '2px' }}>
                                            <FaCheckCircle style={{ color: '#fff', fontSize: '12px' }} />
                                        </div>
                                        <span style={{ fontWeight: '500', color: '#333' }}>Business-first digital strategies</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#F7941E', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0, marginTop: '2px' }}>
                                            <FaCheckCircle style={{ color: '#fff', fontSize: '12px' }} />
                                        </div>
                                        <span style={{ fontWeight: '500', color: '#333' }}>Data-driven marketing focused on measurable goals</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#F7941E', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0, marginTop: '2px' }}>
                                            <FaCheckCircle style={{ color: '#fff', fontSize: '12px' }} />
                                        </div>
                                        <span style={{ fontWeight: '500', color: '#333' }}>Integrated SEO, paid media, social media & content</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#F7941E', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0, marginTop: '2px' }}>
                                            <FaCheckCircle style={{ color: '#fff', fontSize: '12px' }} />
                                        </div>
                                        <span style={{ fontWeight: '500', color: '#333' }}>Transparent reporting and continuous optimization</span>
                                    </li>
                                </ul>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '35px' }}>
                                    <button style={{ background: '#F7941E', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 32px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(247, 148, 30, 0.3)' }} onClick={openModal}>
                                        TALK TO OUR TEAM <FaArrowRight />
                                    </button>
                                </div>
                            </div>

                            {/* Right Form Content */}
                            <div className="col-lg-5 sd-form-col" style={{ position: 'relative' }}>



                                {/* Let's Grow Note */}
                                <div style={{ position: 'absolute', right: '10px', top: '-60px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', transform: 'rotate(-4deg)' }} className="d-none d-lg-block">
                                    <span style={{ fontFamily: "'Caveat', cursive", fontSize: '26px', color: '#1E293B', fontWeight: 'bold', lineHeight: '1.1', textAlign: 'center' }}>Let's Grow<br />Your Business<br />Together</span>
                                    <svg width="60" height="70" viewBox="0 0 60 70" fill="none" style={{ marginTop: '2px', transform: 'translateX(-30px)' }}>
                                        <path d="M10,10 Q50,20 40,60 M30,50 L40,60 L50,50" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>

                                    {/* Sparkles near the arrow */}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ position: 'absolute', top: '10px', left: '-50px' }}>
                                        <path d="M20,5 L20,15 M35,15 L25,20 M15,25 L5,25" stroke="#F7941E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>
                                </div>

                                {/* Your Growth Partner Note (Bottom-Left of Form) */}
                                <div style={{ position: 'absolute', left: '-145px', bottom: '85px', zIndex: 10, transform: 'rotate(-4deg)' }} className="d-none d-lg-block">
                                    <svg width="85" height="65" viewBox="0 0 85 65" fill="none" style={{ position: 'absolute', top: '-42px', left: '35px' }}>
                                        <path d="M10,50 Q45,8 80,18 M68,8 L80,18 L68,26" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>
                                    <span style={{ fontFamily: "'Caveat', cursive", fontSize: '24px', color: '#1E293B', fontWeight: 'bold', lineHeight: '1.1', textAlign: 'center', display: 'block' }}>
                                        Your<br />Growth Partner<br />in {locationLabel || 'Delhi'}
                                    </span>
                                    <div style={{ width: '70%', height: '4px', background: '#F7941E', borderRadius: '4px', margin: '3px auto 0', transform: 'rotate(-2deg)' }}></div>
                                </div>

                                <div className="sd-form-box" style={{ borderRadius: '24px', padding: '3rem 2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.08)' }}>
                                    <h3 className="sd-form-heading" style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '10px' }}>Request a Consultation</h3>
                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>Tell us about your project and we'll get back to you with a customized plan.</p>
                                    {formResponse.text && (
                                        <div className={`alert ${formResponse.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                                            {formResponse.text}
                                        </div>
                                    )}
                                    <form onSubmit={handleServiceFormSubmit}>
                                        <div className="mb-3" style={{ position: 'relative' }}>
                                            <FaUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '14px' }} />
                                            <input type="text" name="name" className="sd-input-field" placeholder="Full Name" required style={{ paddingLeft: '45px', borderRadius: '12px', border: '1px solid #EAEAEA', height: '52px' }} />
                                        </div>
                                        <div className="mb-3" style={{ position: 'relative' }}>
                                            <FaEnvelope style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '14px' }} />
                                            <input type="email" name="email" className="sd-input-field" placeholder="Email Address" required style={{ paddingLeft: '45px', borderRadius: '12px', border: '1px solid #EAEAEA', height: '52px' }} />
                                        </div>
                                        <div className="mb-3">
                                            <PhoneInput
                                                phoneName="phone"
                                                countryCodeName="country_code"
                                                required={true}
                                                className="pill-style"
                                                placeholder="Phone Number"
                                                style={{ borderRadius: '12px', border: '1px solid #EAEAEA', height: '52px' }}
                                            />
                                        </div>
                                        <div className="mb-4" style={{ position: 'relative' }}>
                                            <FaCommentDots style={{ position: 'absolute', left: '15px', top: '18px', color: '#aaa', fontSize: '14px' }} />
                                            <textarea name="message" className="sd-input-field" placeholder="Tell us about your goals..." required style={{ paddingLeft: '45px', borderRadius: '12px', border: '1px solid #EAEAEA', minHeight: '100px', paddingTop: '15px', resize: 'none' }}></textarea>
                                        </div>

                                        <div className="sd-checkbox-group mb-4" style={{ alignItems: 'flex-start' }}>
                                            <input type="checkbox" id="sdProjectCheck" name="agree" value="yes" className="sd-checkbox" required style={{ marginTop: '2px', borderColor: '#ccc' }} />
                                            <label htmlFor="sdProjectCheck" className="sd-checkbox-label" style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                                                I agree to be contacted about my project.
                                            </label>
                                        </div>

                                        <button type="submit" className="sd-submit-btn" disabled={isSubmitting} style={{ background: '#F7941E', color: '#fff', border: 'none', borderRadius: '50px', padding: '16px', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 8px 20px rgba(247, 148, 30, 0.3)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'} <FaArrowRight />
                                        </button>
                                    </form>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', borderTop: '1px solid #F0F0F0', paddingTop: '25px' }}>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <FaShieldAlt style={{ color: '#0E1D28', fontSize: '20px', marginBottom: '8px' }} />
                                            <h5 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#0E1D28' }}>No Spam</h5>
                                            <p style={{ fontSize: '10px', color: '#888', margin: 0 }}>We respect your privacy</p>
                                        </div>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <FaBolt style={{ color: '#0E1D28', fontSize: '20px', marginBottom: '8px' }} />
                                            <h5 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#0E1D28' }}>Quick Response</h5>
                                            <p style={{ fontSize: '10px', color: '#888', margin: 0 }}>Within 24 hours</p>
                                        </div>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <FaUsers style={{ color: '#0E1D28', fontSize: '20px', marginBottom: '8px' }} />
                                            <h5 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#0E1D28' }}>Free Consultation</h5>
                                            <p style={{ fontSize: '10px', color: '#888', margin: 0 }}>Discuss your goals</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* === Clients Section === */}
            <section className="clients-section">
                <div className="container text-center">
                    <h2 className="clients-headline">Our Clients</h2>
                    <div className="slider-container">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={5}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            speed={500}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                },
                                480: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1280: {
                                    slidesPerView: 5,
                                }
                            }}
                        >
                            {displayClients.map((client, index) => (
                                <SwiperSlide key={index}>
                                    <div className="client-slide">
                                        <img src={client.logo} alt={`Client ${index + 1}`} className="client-logo" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>


            {/* Strategies Section */}
            <div className="sd-strategies-section">
                <div className="container">
                    <div className="sd-strategies-header">
                        <h2 className="sd-strategies-title">Digital Marketing Services in {locationName}</h2>
                        <p className="sd-strategies-subtitle">From search visibility to paid campaigns, we build digital strategies around your business goals.</p>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            }
                        }}
                        className="sd-strategies-slider"
                    >
                        {strategies.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="sd-strategy-card">
                                    <h3 className="sd-card-title">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && <p className="mb-3 text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>{item.subtitle}</p>}
                                    <ul className="sd-card-list">
                                        {item.points.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                    <button className="sd-card-btn" onClick={openModal}>
                                        {item.btnText || "BOOK A FREE CALL"}
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Case Studies Section */}
            <div className="sd-case-studies-section">
                <div className="container">
                    <div className="sd-case-header">
                        <h2 className="sd-case-title">Real SEO Results. Real Businesses.</h2>
                        <p className="sd-case-desc">
                            Proof of what consistent SEO can do for businesses across industries.
                        </p>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            }
                        }}
                        className="sd-case-studies-slider"
                    >
                        {caseStudies.map((study, index) => (
                            <SwiperSlide key={index}>
                                <div className="sd-case-card">
                                    <h3 className="sd-client-name">Client : <span>{study.client}</span></h3>

                                    <div className="sd-results-table">
                                        <div className="sd-table-header">
                                            <div className="sd-th-keyword">Keyword Search</div>
                                            <div className="sd-th-rank">Rankings</div>
                                        </div>
                                        <div className="sd-table-body">
                                            {study.results.map((res, idx) => (
                                                <div key={idx} className="sd-table-row">
                                                    <div className="sd-td-keyword">{res.keyword}</div>
                                                    <div className="sd-td-rank">{res.rank}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
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
                            {lpCaseStudies.map((study, index) => (
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

            {/* Help Section */}
            {/* <div className="sd-help-section">
                <div className="container">
                    <div className="sd-help-box">

                        Floating Icon (Absolute Positioned)
                        <div className="sd-help-floating-icon">
                            <img src={helpSticker} alt="Help" className="sd-help-sticker-img" />
                        </div>

                        <div className="row align-items-center">
                            <div className="col-lg-5 mb-4 mb-lg-0">
                                <div className="sd-help-content">
                                    <h2 className="sd-help-title">ClickMecha is Here to Help</h2>
                                    <p className="sd-help-desc">
                                        We understand your business needs and create simple strategies that deliver real results. Our team is always ready to support you in growing your brand, generating leads, and increasing your online presence.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="sd-help-form-area">
                                    <p className="sd-help-rated">4.9 Rated by 450+ Successful B2B Owners</p>
                                    {formResponse.text && (
                                        <div className={`alert ${formResponse.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                                            {formResponse.text}
                                        </div>
                                    )}
                                    <form onSubmit={handleServiceFormSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <input type="text" name="name" className="sd-help-input" placeholder="Name*" required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="email" name="email" className="sd-help-input" placeholder="Email Id*" required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <PhoneInput
                                                    phoneName="phone"
                                                    countryCodeName="country_code"
                                                    required={true}
                                                    className="simple-style"
                                                    placeholder="Phone No*"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="text" name="message" className="sd-help-input" placeholder="Message*" required />
                                            </div>
                                        </div>
                                        <button type="submit" className="sd-help-submit-btn" disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : <>Submit <FaHandPointRight className="sd-submit-icon" /></>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Why Clickmecha Section */}
            <div className="sd-why-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                            <div className="sd-why-image-wrapper">
                                <img src={digitalMarketingInfographic} alt="Best Digital Marketing Company" className="img-fluid sd-why-infographic-img" />
                            </div>
                        </div>

                        <div className="col-lg-6 text-start">
                            <div className="sd-why-content">
                                <h2 className="sd-why-title text-start mb-3">
                                    Best Digital Marketing Company in {locationName} for Business Growth
                                </h2>
                                <p className="sd-why-paragraph mb-3">
                                    Clickmecha helps businesses build stronger online visibility, generate qualified leads, and grow their digital presence through a strategy built around their business goals.
                                </p>
                                <p className="sd-why-paragraph mb-3">
                                    We start by understanding your business, target audience, competition, and growth objectives. From there, we bring together the right mix of SEO, paid advertising, social media, content, and web development to create a digital strategy that fits your needs.
                                </p>
                                <p className="sd-why-paragraph mb-4">
                                    Whether you're an e-commerce brand, real estate company, healthcare business, manufacturer, B2B service, or growing local business, our approach adapts to your audience, market, and goals.
                                </p>
                                <button className="sd-card-btn" onClick={openModal}>BOOK A FREE CALL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            {/* Top Media Partners (Delhi only) / We Featured In (Other cities) */}
            {isDelhiLocation ? (
                <div className="sd-media-section">
                    <div className="container">
                        <h2 className="sd-media-heading">
                            Our Top Media Partners
                        </h2>
                        <div className="sd-media-grid">
                            {mediaPartnersList.map((partner) => (
                                <a
                                    key={partner.id}
                                    href={partner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sd-media-card"
                                    title={`Read about Click Mecha on ${partner.name}`}
                                >
                                    <img
                                        src={partner.img}
                                        alt={partner.name}
                                        className="sd-media-logo-img"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="sd-featured-section">
                    <div className="container">
                        <h2 className="sd-featured-title">We Featured In</h2>
                        <div className="sd-featured-grid">
                            <div className="sd-featured-item">
                                <img src={featured2} alt="News Of Hindustan" />
                            </div>
                            <div className="sd-featured-item">
                                <img src={featured3} alt="XPERT TIMES" />
                            </div>
                            <div className="sd-featured-item">
                                <img src={featured4} alt="Hello Entrepreneurs" />
                            </div>
                            <div className="sd-featured-item">
                                <img src={featured5} alt="Hindustan Metro" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* === Testimonials Section (Google Reviews on Delhi / Home Testimonials on other cities) === */}
            <section className={`testimonials-section position-relative ${isDelhiLocation ? 'sd-google-testimonials-wrap' : ''}`}>
                <img src={rocketIcon} alt="Rocket" className="rocket-icon" />
                <div className="container">
                    <div className="testimonials-header text-center mb-4 position-relative">
                        <h2 className="testimonials-headline">
                            Client <span className="highlight-text">Testimonials</span>
                        </h2>

                        {isDelhiLocation && (
                            <div className="sd-google-summary-bar">
                                <div className="sd-google-summary-left">
                                    <div className="sd-google-badge-brand">
                                        <GoogleColorIcon />
                                        <span className="sd-google-brand-label">Google Rating</span>
                                    </div>
                                    <div className="sd-google-score-tag">
                                        <span className="sd-google-score-val">4.9</span>
                                        <div className="sd-google-stars-row">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="sd-g-star">★</span>
                                            ))}
                                        </div>
                                        <span className="sd-google-count-text">(50+ Verified Reviews)</span>
                                    </div>
                                </div>
                                <a
                                    href="https://share.google/GGvOSkMpFttZ8KlTK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sd-google-map-btn"
                                >
                                    <GoogleColorIcon />
                                    <span>Review Us on Google</span>
                                    <FaExternalLinkAlt className="sd-ext-link-ico" />
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="testimonials-slider">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={3}
                            loop={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            speed={500}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 16
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                                992: {
                                    slidesPerView: 2,
                                    spaceBetween: 24
                                },
                                1280: {
                                    slidesPerView: 3,
                                    spaceBetween: 24
                                }
                            }}
                        >
                            {isDelhiLocation ? (
                                delhiGoogleReviews.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="testimonial-card sd-google-review-card">
                                            <div className="sd-google-card-top">
                                                <div className="sd-google-profile-wrap">
                                                    <div
                                                        className="sd-google-avatar-box"
                                                        style={{ backgroundColor: item.avatarBg }}
                                                    >
                                                        {item.initials}
                                                    </div>
                                                    <div className="sd-google-meta">
                                                        <h3 className="sd-google-meta-name">{item.name}</h3>
                                                        <span className="sd-google-meta-sub">{item.badge}</span>
                                                    </div>
                                                </div>
                                                <div className="sd-google-corner-logo" title="Google Review">
                                                    <GoogleColorIcon />
                                                </div>
                                            </div>
                                            <div className="sd-google-rating-row">
                                                <div className="sd-google-card-stars">
                                                    {[...Array(item.rating)].map((_, i) => (
                                                        <span key={i} className="sd-star-gold">★</span>
                                                    ))}
                                                </div>
                                                <span className="sd-google-timestamp">{item.time}</span>
                                            </div>
                                            <p className="sd-google-review-body">{item.content}</p>
                                            <div className="sd-google-card-bottom">
                                                <span className="sd-google-verified-chip">
                                                    <FaCheckCircle className="sd-verified-icon" /> Posted on Google Maps
                                                </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                (testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials).map((item, index) => (
                                    <SwiperSlide key={item.id || index}>
                                        <div className="testimonial-card">
                                            <div className="quote-icon">“</div>
                                            <div className="stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>★</span>
                                                ))}
                                            </div>
                                            <h3 className="testimonial-title">{item.name || item.client_name}</h3>
                                            <p className="testimonial-subtitle text-muted mb-2">{item.position || item.client_position}</p>
                                            <p className="testimonial-desc">{item.content || item.testimonial_text}</p>
                                        </div>
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    </div>
                </div>
            </section>


            {/* ClickMecha is Here to Help Banner (Screenshot 2) */}
            <div className="sd-help-section">
                <div className="container">
                    <div className="sd-help-box">
                        {/* Floating Icon Sticker on Left */}
                        <div className="sd-help-floating-icon">
                            <img src={helpSticker} alt="ClickMecha Help" className="sd-help-sticker-img" />
                        </div>

                        <div className="row align-items-center">
                            {/* Left Text */}
                            <div className="col-lg-5 mb-4 mb-lg-0">
                                <div className="sd-help-content">
                                    <h2 className="sd-help-title">Let's Talk About Your Business</h2>
                                    <p className="sd-help-desc mb-3">
                                        Tell us what you’re looking to achieve, and our team will help you identify the right digital marketing approach for your business.
                                    </p>
                                    <p style={{ color: '#F7941E', fontWeight: '600', fontSize: '0.92rem', letterSpacing: '0.3px', margin: 0 }}>
                                        SEO · Paid Advertising · Social Media · Content · Web Development
                                    </p>
                                </div>
                            </div>

                            {/* Right Form */}
                            <div className="col-lg-7">
                                <div className="sd-help-form-area">
                                    <p className="sd-help-rated">4.9 Rated by 450+ Successful B2B Owners</p>
                                    {helpFormResponse.text && (
                                        <div className={`alert ${helpFormResponse.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3 py-2 px-3`}>
                                            {helpFormResponse.text}
                                        </div>
                                    )}
                                    <form onSubmit={handleHelpFormSubmit} className="sd-help-form">
                                        <div className="sd-help-grid">
                                            <div className="sd-help-grid-item">
                                                <input type="text" name="name" className="sd-help-input" placeholder="Name*" required />
                                            </div>
                                            <div className="sd-help-grid-item">
                                                <input type="email" name="email" className="sd-help-input" placeholder="Email Id*" required />
                                            </div>
                                            <div className="sd-help-grid-item">
                                                <PhoneInput
                                                    phoneName="phone"
                                                    countryCodeName="country_code"
                                                    required={true}
                                                    className="sd-help-phone-field"
                                                    placeholder="Phone No*"
                                                />
                                            </div>
                                            <div className="sd-help-grid-item">
                                                <input type="text" name="message" className="sd-help-input" placeholder="Message*" required />
                                            </div>
                                        </div>
                                        <button type="submit" className="sd-help-submit-btn" disabled={isHelpSubmitting}>
                                            {isHelpSubmitting ? 'Submitting...' : <>Submit <FaHandPointRight className="sd-submit-icon" /></>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Office Location & Map Section (Screenshot 1) */}
            <div className="sd-office-section">
                <div className="container">
                    <div className="sd-office-card-wrapper">
                        <h2 className="sd-office-heading">{officeData.title}</h2>

                        <div className="sd-office-grid">
                            {/* Left Side: Office Info Card */}
                            <div className="sd-office-info-box">
                                <div className="sd-office-top-row">
                                    <div className="sd-office-monument-icon-wrap">
                                        {officeData.isDelhi ? <IndiaGateIcon /> : <BuildingIcon />}
                                    </div>
                                    <span className="sd-office-type-badge">{officeData.typeBadge}</span>
                                </div>

                                <h3 className="sd-office-city-name">{officeData.city}</h3>
                                <p className="sd-office-address">{officeData.address}</p>

                                <div className="sd-office-contact-list">
                                    <div className="sd-office-contact-item">
                                        <div className="sd-office-contact-icon-circle email">
                                            <FaEnvelope />
                                        </div>
                                        <div className="sd-office-contact-details">
                                            <span className="sd-office-contact-label">Email us</span>
                                            <a href={`mailto:${officeData.email}`} className="sd-office-contact-val">
                                                {officeData.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="sd-office-contact-item">
                                        <div className="sd-office-contact-icon-circle whatsapp">
                                            <FaWhatsapp />
                                        </div>
                                        <div className="sd-office-contact-details">
                                            <span className="sd-office-contact-label">WhatsApp</span>
                                            <a
                                                href={`https://wa.me/${officeData.whatsapp.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="sd-office-contact-val"
                                            >
                                                {officeData.whatsappDisplay}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Interactive Google Map */}
                            <div className="sd-office-map-box">
                                <a
                                    href={officeData.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sd-office-open-maps-btn"
                                    title="Open in Google Maps"
                                >
                                    Open in Maps <FaExternalLinkAlt className="sd-open-maps-icon" />
                                </a>
                                <iframe
                                    src={officeData.mapEmbed}
                                    title={officeData.title}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="sd-office-map-iframe"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Choosing Best Digital Marketing Agency Section */}
            <div className="sd-content-section">
                <div className="container">
                    <h2 className="sd-content-title">#1 Leading Digital Marketing Company in {locationName}</h2>

                    <div className="sd-content-body">
                        <p>The main goal of any digital marketing efforts is simply to reach the perfect audience and turn them into our customers. But now-a-days digital marketing is not just posting a few ads. It includes many things like SEO, content management, social media handling, and many others. Managing all this on your own is very difficult.</p>

                        <p>That’s where Click Mecha, a best <Link to={getCityPagePath(locationName)} className="sd-content-link">digital marketing agency in {locationName}</Link>  comes in. A good digital marketing near me first understands your goals, studies your audience, and then builds a personalized strategy that actually delivers results.
                        </p>

                        {/* <p className="sd-content-subtitle">Types of Digital Marketing Services in {locationName}</p>

                        <p>Digital marketing works better when different services come together. Most agencies in {locationName} offer these core services:</p> */}

                        {/* <ul className="sd-content-list">
                            <li>Search Engine Optimization Service</li>
                            <li>Linkedin Marketing Services</li>
                            <li>Wordpress Website Design Service</li>
                            <li>Pay Per Click Services</li>
                            <li>Website Designing Services</li>
                            <li>Social Media Services</li>
                            <li>Google Adsense Services</li>
                            <li>Affiliate Marketing Services</li>
                            <li>Mobile App Marketing Services</li>
                            <li>Email Marketing Services</li>
                            <li>Lead Generation Services</li>
                            <li>Google Adwords Services</li>
                            <li>Youtube Marketing Services</li>
                            <li>E-commerce Marketing Services</li>
                            <li>Facebook Marketing Services</li>
                            <li>Local Business Listing Services</li>
                            <li>Google Analytics Services</li>
                            <li>Blogging Services</li>
                            <li>Instagram Marketing Services</li>
                        </ul> */}

                        {/* <div className="sd-specialized-grid">
                            {specializedServices.map((service, index) => (
                                <Link to={getSubServicePagePath(service.title, locationName)} key={index} className="sd-specialized-card-link">
                                    <div className="sd-specialized-card">
                                        <div className="sd-specialized-icon">
                                            {service.icon}
                                        </div>
                                        <h3 className="sd-specialized-name text-center">{service.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div> */}

                        <p className="sd-content-subtitle">Key Benefits of a Digital Marketing Company</p>

                        <p>There are a lots of benefits of working with a digital marketing company in {locationName} below are some :</p>

                        <ul className="sd-content-list">
                            <li>You will get daily new marketing updates.</li>
                            <li>You can get detailed knowledge of the marketing tools.</li>
                            <li>Your main focus in your business only rest marketing team will handle.</li>
                            <li>Get regular updates of your business marketing.</li>
                        </ul>

                        <p className="sd-content-subtitle">Find Digital Marketing Agency Near Me</p>

                        <p>If you are searching the digital marketing agency in {locationName}, don’t select one just because it looks good online. Keep a few things in mind:</p>

                        <ul className="sd-content-list">
                            <li><strong>Know your goals:</strong> Be clear what you want, whether it’s more traffic, leads, sales, or better brand visibility.</li>
                            <li><strong>Check their work:</strong> Firstly check their portfolio and case studies to understand the kind of results they have delivered to past clients.</li>
                            <li><strong>Read client reviews:</strong> Good reviews and testimonials can help you know what their clients actually said about them.</li>
                            <li><strong>Look for clear communication:</strong> Choose an agency that keeps always updated, shares regular work reports, and explains the work in easy words.</li>
                        </ul>

                        {/* <h3 className="sd-content-subtitle">Conclusion</h3>

                        <p>Having a strong online presence is very important today. Click Mecha, as a leading digital marketing company in {locationName}, helps you build that presence and grow your business step by step. If you want better traffic, leads, and sales, choosing the right agency is the first step.</p> */}

                        <h2 className="sd-faq-heading">Frequently Asked Questions</h2>

                        <div className="accordion" id="faqAccordion">
                            {cityFaqs.map((faq, index) => (
                                <div key={index} className="accordion-item mb-3 border bg-white rounded">
                                    <h4 className="accordion-header">
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

            <section className="sd-city-links-section d-none d-md-block">
                <div className="container">
                    <div className="sd-city-links-box">
                        <p className="sd-city-links-eyebrow">Explore By Location</p>
                        <h2 className="sd-city-links-title">Check Out Our Digital Marketing Agency Pages According to Your City</h2>
                        <p className="sd-city-links-desc">
                            Browse our city pages to find Click Mecha&apos;s digital marketing solutions tailored for your local market, audience, and business goals.
                        </p>

                        <div className="sd-city-links-grid">
                            {cityPageLinks.map((city) => {
                                const isActiveCity = city.name.toLowerCase() === locationName.toLowerCase();

                                if (isActiveCity) {
                                    return (
                                        <span key={city.path} className="sd-city-link sd-city-link-active">
                                            {city.name}
                                        </span>
                                    );
                                }

                                return (
                                    <Link key={city.path} to={city.path} className="sd-city-link">
                                        {city.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

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

            {/* Contact Section */}
            <Contact />
        </div >
    );
};

export default ServiceDetail;
