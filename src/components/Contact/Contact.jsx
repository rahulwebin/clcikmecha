import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import { FiPhone, FiMail, FiX } from 'react-icons/fi'; // Using feather icons for clean look
import ContactForm from '../ContactForm/ContactForm';

const Contact = ({ preHeading, helpData }) => {
    const [showModal, setShowModal] = useState(false);

    const phone1 = helpData?.phone_1 || '+91-99996-73073';
    const phone2 = helpData?.phone_2 || '+91 99990 08998';
    const email = helpData?.email || 'kavya@clickmecha.com';
    const title = helpData?.title || null;
    const buttonText = helpData?.button_text || 'BOOK A 30 MIN CALL';
    // const buttonLink = helpData?.button_link || '/contact'; // Overridden for popup

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    return (
        <>
            <section className="contact-section">
                <div className="container text-center">
                    {preHeading && (
                        <h5 className="mb-3" style={{ fontWeight: 600, color: '#0E1D28' }}>
                            {preHeading}
                        </h5>
                    )}
                    {/* Headline */}
                    <h2 className="contact-headline">
                        {title ? (
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        ) : (
                            <>
                                Let's Talk <span className="emoji-3d">💬</span> About <br />
                                <span className="highlight-text">Your <span className="emoji-3d">👋</span> Next Project</span>
                            </>
                        )}
                    </h2>

                    {/* Contact Info Grid */}
                    <div className="contact-info-wrapper">
                        <div className="contact-item">
                            <div className="icon-circle">
                                <FiPhone className="contact-icon" />
                            </div>
                            <div className="contact-details text-start">
                                <span className="contact-label">Phone Number:</span>
                                <span className="contact-value">{phone1}</span>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-circle">
                                <FiPhone className="contact-icon" />
                            </div>
                            <div className="contact-details text-start">
                                <span className="contact-label">Phone Number:</span>
                                <span className="contact-value">{phone2}</span>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="icon-circle">
                                <FiMail className="contact-icon" />
                            </div>
                            <div className="contact-details text-start">
                                <span className="contact-label">Email:</span>
                                <span className="contact-value">{email}</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="cta-wrapper position-relative d-inline-block">
                        <span className="free-tag">FREE</span>
                        <button className="btn-book-call" onClick={openModal}>{buttonText}</button>
                    </div>
                </div>
            </section>

            {/* Popup Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={closeModal}>
                            <FiX />
                        </button>
                        <ContactForm />
                    </div>
                </div>
            )}
        </>
    );
};

export default Contact;
