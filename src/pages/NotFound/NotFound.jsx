import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import { FaHome, FaServicestack, FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import { applySeoMetadata } from '../../utils/seo';

const NotFound = () => {
    useEffect(() => {
        applySeoMetadata({
            title: '404 - Page Not Found | ClickMecha',
            description: "The page you're looking for doesn't exist. Return to ClickMecha home page to explore our services.",
            canonicalUrl: window.location.href,
        });
    }, []);

    return (
        <div className="nf-page-wrapper">
            <div className="nf-glow-bg-1"></div>
            <div className="nf-glow-bg-2"></div>
            
            <div className="container d-flex flex-column align-items-center justify-content-center text-center nf-content-container animate-fade-in">
                {/* Animated 404 Numbers */}
                <div className="nf-number-container">
                    <span className="nf-digit nf-digit-left">4</span>
                    <span className="nf-digit nf-digit-center">0</span>
                    <span className="nf-digit nf-digit-right">4</span>
                </div>

                <h1 className="nf-title">Oops! Lost in Space?</h1>
                <p className="nf-description">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
                </p>

                {/* CTA Buttons */}
                <div className="nf-cta-group d-flex flex-wrap justify-content-center gap-3">
                    <Link to="/" className="nf-btn nf-btn-primary">
                        <FaHome className="nf-btn-icon" /> Go Back Home
                    </Link>
                    <Link to="/services" className="nf-btn nf-btn-secondary">
                        <FaServicestack className="nf-btn-icon" /> Our Services
                    </Link>
                </div>

                {/* Secondary Helpful Links */}
                <div className="nf-help-links">
                    <p>Need help immediately?</p>
                    <a href="tel:+919999008998" className="nf-contact-link">
                        <FaPhoneAlt /> Call Support <FaArrowRight className="nf-arrow" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
