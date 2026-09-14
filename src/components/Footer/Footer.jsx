import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';
import { FaLinkedin, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/clickmecha-logo.png'; // Updated logo
import { getSubServicePagePath, getCityNameFromSlug } from '../../data/services';

// Helper mapper for custom links
const getLink = (title, locationName) => {
    let targetTitle = title;
    if (title === "Blogging Marketing Services") {
        targetTitle = "Blogging Services";
    } else if (title === "PPC Services") {
        targetTitle = "Pay Per Click Services";
    } else if (title === "SEO Services") {
        targetTitle = "Search Engine Optimization Services";
    } else if (title === "SMO Services") {
        targetTitle = "Social Media Marketing Services";
    } else if (title === "YouTube Marketing Services") {
        targetTitle = "Youtube Marketing Services";
    } else if (title.startsWith("Local SEO Services")) {
        targetTitle = "Search Engine Optimization Services"; // link to main SEO subservice
    }
    return getSubServicePagePath(targetTitle, locationName);
};

const Footer = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const isCityPage = pathname.startsWith('/digital-marketing-agency-in-');
    const isSubServicePage = pathname.startsWith('/in/') || pathname.startsWith('/us/') || pathname.startsWith('/ae/');
    const isCityOrSubService = isCityPage || isSubServicePage;

    // Extract city name and country from pathname
    const parts = pathname.split('-in-');
    const citySlug = parts.length > 1 ? parts[1].replace(/\/+$/, '') : '';
    const locationName = getCityNameFromSlug(citySlug) || 'Delhi';

    let country = 'India';
    if (pathname.includes('/ae/') || citySlug === 'dubai') {
        country = 'UAE';
    } else if (pathname.includes('/us/') || ['new-york', 'chicago', 'los-angeles', 'san-francisco', 'houston'].includes(citySlug)) {
        country = 'USA';
    }

    if (isCityOrSubService) {
        return (
            <footer className="city-footer-section">
                <div className="container py-5">
                    <div className="row">
                        {/* Column 1: Branding & Contact */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="city-footer-brand mb-4">
                                <Link to="/">
                                    <img src={logo} alt="Clickmecha" className="city-footer-logo-img mb-2" />
                                </Link>
                            </div>
                            <p className="city-footer-desc mb-4">
                                Click Mecha is a leading digital marketing and advertising agency in {locationName}, {country}. We help businesses build strong online presence through high-converting websites, memorable branding, and result-driven digital marketing campaigns.
                            </p>
                            <div className="city-footer-social-icons d-flex gap-3 mb-4">
                                <a href="https://www.linkedin.com/company/clickmecha" target="_blank" rel="noopener noreferrer" className="city-social-icon"><FaLinkedin /></a>
                                <a href="https://www.facebook.com/theclickmechaa" target="_blank" rel="noopener noreferrer" className="city-social-icon"><FaFacebook /></a>
                                <a href="https://www.instagram.com/theclickmechaa" target="_blank" rel="noopener noreferrer" className="city-social-icon"><FaInstagram /></a>
                            </div>
                            <div className="city-footer-contact-details mt-4">
                                <div className="city-footer-contact-item mb-2">
                                    <FaMapMarkerAlt className="city-footer-icon" />
                                    <span>{locationName}, {country}</span>
                                </div>
                                <div className="city-footer-contact-item mb-2">
                                    <FaPhoneAlt className="city-footer-icon" />
                                    <a href="tel:+919999008998">+91 99990 08998</a>
                                </div>
                                <div className="city-footer-contact-item">
                                    <FaEnvelope className="city-footer-icon" />
                                    <a href="mailto:kavya@clickmecha.com">kavya@clickmecha.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Services Column 1 */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h3 className="city-footer-title">Our Services</h3>
                            <ul className="city-footer-links">
                                <li><span className="bullet-dots">•</span><Link to={getLink("Blogging Marketing Services", locationName)}>Blogging Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Digital Marketing Services", locationName)}>Digital Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("E-commerce Marketing Services", locationName)}>E-commerce Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Email Marketing Services", locationName)}>Email Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Facebook Marketing Services", locationName)}>Facebook Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Google AdWords Services", locationName)}>Google AdWords Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Google Adsense Services", locationName)}>Google Adsense Services</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Services Column 2 */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h3 className="city-footer-title">Our Services</h3>
                            <ul className="city-footer-links">
                                <li><span className="bullet-dots">•</span><Link to={getLink("Google Analytics Services", locationName)}>Google Analytics Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Instagram Marketing Services", locationName)}>Instagram Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Lead Generation Services", locationName)}>Lead Generation Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("LinkedIn Marketing Services", locationName)}>LinkedIn Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Local Business Listing Services", locationName)}>Local Business Listing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Local SEO Services Delhi", locationName)}>Local SEO Services {locationName}</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Mobile App Marketing Services", locationName)}>Mobile App Marketing Services</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Services Column 3 */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h3 className="city-footer-title">Our Services</h3>
                            <ul className="city-footer-links">
                                <li><span className="bullet-dots">•</span><Link to={getLink("PPC Services", locationName)}>Pay Per Click Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("SEO Services", locationName)}>Search Engine Optimization Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("SMO Services", locationName)}>Social Media Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Website Designing Services", locationName)}>Website Designing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("WordPress Website Design Services", locationName)}>WordPress Website Design Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("YouTube Marketing Services", locationName)}>YouTube Marketing Services</Link></li>
                                <li><span className="bullet-dots">•</span><Link to={getLink("Affiliate Marketing Services", locationName)}>Affiliate Marketing Services</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Background Large Text Watermark */}
                <div className="footer-bg-text">
                    CLICKMECHA
                </div>

                {/* Bottom Copyright Row */}
                <div className="city-footer-bottom py-3">
                    <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
                            Copyright ©kavya kapoor. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="row">
                    {/* Branding Column */}
                    <div className="col-lg-4 col-md-12 mb-4">
                        <div className="footer-logo mb-3">
                            <div className="logo-container">
                                <Link to="/">
                                    <img src={logo} alt="Clickmecha" className="footer-logo-img" />
                                </Link>
                            </div>
                        </div>
                        <p className="footer-description">
                            We design, build, and market digital solutions that help businesses grow faster.
                        </p>
                        <div className="social-icons d-flex gap-3 mb-4">
                            <a href="https://www.linkedin.com/company/clickmecha" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
                            <a href="https://www.facebook.com/theclickmechaa" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
                            <a href="https://www.instagram.com/theclickmechaa" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
                        </div>
                        <div className="copyright text-muted">
                            <small>
                                Copyright ©kavya kapoor.<br />
                                All rights reserved
                            </small>
                        </div>
                        <div className="newsletter-section mt-4">
                            <h6 className="text-white mb-2">Subscribe to our newsletter</h6>
                            <form className="d-flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="newsletter-input"
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    →
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Navigation Links and Legal Links */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex justify-content-between gap-3">
                            <ul className="list-unstyled footer-links">
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to="/about">ABOUT</Link></li>
                                <li><Link to="/services">SERVICES</Link></li>
                                <li><Link to="/clientele">CLIENTELE</Link></li>
                                <li><Link to="/career">CAREER</Link></li>
                                <li><Link to="/blog">BLOG</Link></li>
                                <li><Link to="/contact">CONTACT</Link></li>
                            </ul>
                            <ul className="list-unstyled footer-links">
                                <li><a href="#privacy">PRIVACY POLICY</a></li>
                                <li><a href="#terms">TERMS OF SERVICE</a></li>
                                <li><a href="#cookies">COOKIES POLICIES</a></li>
                                <li><Link to="/posh-policy">PoSH POLICY</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact & Map */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="footer-contact">
                            <div className="d-flex align-items-start gap-2 mb-2 text-white-50">
                                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                                <span>34, N W Ave Rd, North Ave, West Punjabi Bagh, Delhi, 110026</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 mb-2 text-white-50">
                                <FaPhoneAlt />
                                <span>+91 99990 08998</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 text-white-50">
                                <FaEnvelope />
                                <span>kavya@clickmecha.com</span>
                            </div>
                        </div>

                        {/* Google Map embedded in 3rd column */}
                        <div className="footer-map-container mt-4" style={{ borderRadius: '15px', overflow: 'hidden', height: '200px' }}>
                            <iframe
                                title="Footer Location Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5157853805426!2d77.12619127601755!3d28.67421378218569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d031b84fef5b1%3A0x67f6457ebbbde2f3!2sDigital%20Marketing%20Agency%20In%20West%20Delhi%20%7C%20Click%20Mecha!5e0!3m2!1sen!2sin!4v1776965890271!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Text */}
            <div className="footer-bg-text">
                CLICKMECHA
            </div>
        </footer>
    );
};

export default Footer;
