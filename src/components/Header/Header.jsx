import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/clickmecha-logo.png';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useContactModal } from '../../context/ContactModalContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const headerRef = useRef(null);
    const { openModal } = useContactModal();
    const { pathname } = useLocation();
    const [menuState, setMenuState] = useState({ isOpen: false, pathname });
    const isMenuOpen = menuState.isOpen && menuState.pathname === pathname;
    const isMenuOpenRef = useRef(isMenuOpen);

    // Reset header/menu state when the route changes so a hidden header
    // transform from the previous page does not carry over.
    useEffect(() => {
        isMenuOpenRef.current = false;
        if (headerRef.current) {
            gsap.set(headerRef.current, { yPercent: 0 });
        }

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
        return () => clearTimeout(timer);
    }, [pathname]);

    useGSAP(() => {
        const header = headerRef.current;
        if (!header) return;

        // Use yPercent for smoother, more reliable transform-based animation
        const showAnim = gsap.fromTo(header,
            { yPercent: 0 },
            {
                yPercent: -100,
                paused: true,
                duration: 0.3,
                ease: "power1.out"
            }
        ).progress(0);

        const st = ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (isMenuOpenRef.current) {
                    showAnim.reverse(); // Ensure shown if menu is open
                    return;
                }

                // If scrolling down and past 100px, hide. Otherwise show.
                if (self.direction === 1 && self.scroll() > 100) {
                    showAnim.play();
                } else {
                    showAnim.reverse();
                }
            }
        });

        // Ensure ScrollTrigger is aware of the new page state
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            st.kill();
            clearTimeout(timer);
        };
    }, { scope: headerRef, dependencies: [pathname] });

    const toggleMenu = () => {
        if (!isMenuOpen && headerRef.current) {
            gsap.set(headerRef.current, { yPercent: 0 });
        }
        setMenuState((state) => {
            const currentlyOpen = state.isOpen && state.pathname === pathname;
            const nextOpen = !currentlyOpen;
            isMenuOpenRef.current = nextOpen;
            return { isOpen: nextOpen, pathname };
        });
    };

    const closeMenu = () => {
        isMenuOpenRef.current = false;
        setMenuState((state) => (
            state.isOpen ? { ...state, isOpen: false } : state
        ));
    };

    const handleMobileCtaClick = () => {
        closeMenu();
        openModal();
    };

    const isLandingPage = pathname === '/growthlanding';

    return (
        <header className="header" ref={headerRef}>
            <div className={`container d-flex ${isLandingPage ? 'justify-content-center justify-content-md-between' : 'justify-content-between'} align-items-center`}>
                <div className="header-logo">
                    <Link to="/">
                        <img src={logo} alt="Clickmecha Logo" className="logo-image" />
                    </Link>
                </div>

                {!isLandingPage && (
                    <div className="mobile-menu-icon" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                )}

                <nav className={`header-nav ${isLandingPage ? 'header-nav-landing' : ''} ${isMenuOpen ? 'open' : ''}`}>
                    <div className="close-menu-icon" onClick={toggleMenu}>&times;</div>
                    {isLandingPage ? (
                        <div className="landing-menu-content">
                            <a href="tel:+919999008998" className="header-phone-link" onClick={closeMenu}>
                                <FaPhoneAlt /> +91 99990 08998
                            </a>
                            <button className="btn-book" onClick={handleMobileCtaClick}>BOOK A FREE CALL</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/" onClick={closeMenu}>HOME</Link>
                            <Link to="/about" onClick={closeMenu}>ABOUT</Link>
                            <Link to="/services" onClick={closeMenu}>SERVICES</Link>
                            <Link to="/clientele" onClick={closeMenu}>CLIENTELE</Link>
                            <Link to="/career" onClick={closeMenu}>CAREER</Link>
                            <Link to="/blog" onClick={closeMenu}>BLOG</Link>
                            <Link to="/contact" onClick={closeMenu}>CONTACT</Link>
                            <div className="mobile-cta">
                                <div className="contact-icons-wrapper">
                                    <a href="tel:+919999008998" className="contact-icon-link">
                                        <FaPhoneAlt />
                                    </a>
                                    <a href="mailto:kavya@clickmecha.com" className="contact-icon-link">
                                        <FaEnvelope />
                                    </a>
                                </div>
                                <button className="btn-book" onClick={handleMobileCtaClick}>BOOK A FREE CALL</button>
                            </div>
                        </>
                    )}
                </nav>

                <div className="header-cta desktop-cta">
                    {isLandingPage ? (
                        <div className="header-landing-cta">
                            <a href="tel:+919999008998" className="header-phone-link">
                                <FaPhoneAlt /> +91 99990 08998
                            </a>
                            <button className="btn-book" onClick={openModal}>BOOK A FREE CALL</button>
                        </div>
                    ) : (
                        <button className="btn-book" onClick={openModal}>BOOK A FREE CALL</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
