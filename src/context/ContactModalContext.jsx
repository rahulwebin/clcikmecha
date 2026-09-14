import React, { createContext, useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import ContactForm from '../components/ContactForm/ContactForm';

const ContactModalContext = createContext();

export const useContactModal = () => {
    const context = useContext(ContactModalContext);
    if (!context) {
        throw new Error('useContactModal must be used within ContactModalProvider');
    }
    return context;
};

export const ContactModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <ContactModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {/* Global Popup Modal */}
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
        </ContactModalContext.Provider>
    );
};
