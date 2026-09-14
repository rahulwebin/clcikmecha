import React, { useState } from 'react';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import mapImage from '../../assets/contact-images/map.png';
import { usePageMeta } from '../../hooks/usePageMeta';
import { submitContactForm } from '../../utils/api';
import PhoneInput from '../../components/PhoneInput/PhoneInput';

const Contact = () => {
    usePageMeta('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country_code: '+91',
        company_name: '',
        budget: '',
        message: '',
        services: [],
        agree: false
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle checkbox changes for services
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            services: checked
                ? [...prev.services, value]
                : prev.services.filter(service => service !== value)
        }));
    };

    // Handle consent checkbox
    const handleConsentChange = (e) => {
        setFormData(prev => ({
            ...prev,
            agree: e.target.checked
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage({ type: '', text: '' });

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setResponseMessage({
                type: 'error',
                text: 'Please fill in all required fields (Name, Email, Phone, and Message)'
            });
            return;
        }

        if (!formData.agree) {
            setResponseMessage({
                type: 'error',
                text: 'Please agree to be contacted about your project'
            });
            return;
        }

        setLoading(true);

        try {
            const cleanCode = formData.country_code.split('-')[0];
            const apiData = {
                name: formData.name,
                email: formData.email,
                phone: `${cleanCode} ${formData.phone}`.trim(),
                company_name: formData.company_name || undefined,
                budget: formData.budget || undefined,
                services: formData.services.length > 0 ? formData.services : undefined,
                message: formData.message,
                agree: formData.agree ? 'yes' : undefined
            };

            const data = await submitContactForm(apiData);

            if (data.status) {
                setResponseMessage({
                    type: 'success',
                    text: data.message || 'Thank you! Your query has been submitted successfully.'
                });

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    country_code: '+91',
                    company_name: '',
                    budget: '',
                    message: '',
                    services: [],
                    agree: false
                });
            } else {
                let errorText = data.message || 'Unable to submit your query right now.';
                if (data.errors) {
                    const validations = Object.values(data.errors).flat().join(', ');
                    errorText += ` (${validations})`;
                }
                setResponseMessage({
                    type: 'error',
                    text: errorText
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setResponseMessage({
                type: 'error',
                text: `Error: ${error.message}. Check console for details.`
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page-wrapper">
            {/* Hero Section */}
            <section className=" container text-center">
                <div className="contact-hero">
                    <h1 className="contact-hero-title">
                        Contacts Us
                    </h1>
                    <p className="contact-hero-desc">
                        Tell us about your project, and we'll respond within 24 hours. <br />
                        No jargon — just ideas that work.
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="row">
                        {/* Left Side - Form */}
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h2 className="form-title">
                                Send your Query <span className="stars-icon">✨</span>
                            </h2>

                            {/* Response Message */}
                            {responseMessage.text && (
                                <div className={`alert ${responseMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                                    {responseMessage.text}
                                </div>
                            )}

                            <form className="query-form" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control custom-input"
                                            placeholder="Full Name *"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control custom-input"
                                            placeholder="Email Address *"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <PhoneInput
                                            phoneName="phone"
                                            countryCodeName="country_code"
                                            phoneValue={formData.phone}
                                            countryCodeValue={formData.country_code}
                                            onChange={handleInputChange}
                                            className="pill-style"
                                            placeholder="Phone Number *"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="company_name"
                                            className="form-control custom-input"
                                            placeholder="Company Name"
                                            value={formData.company_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="services-group mt-4">
                                    <label className="group-label">Services Looking For</label>
                                    <div className="row mt-2">
                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="branding"
                                                    value="Branding"
                                                    checked={formData.services.includes('Branding')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="branding">Branding</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="uiux"
                                                    value="UI/UX Design"
                                                    checked={formData.services.includes('UI/UX Design')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="uiux">UI/UX Design</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="graphic"
                                                    value="Graphic Design"
                                                    checked={formData.services.includes('Graphic Design')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="graphic">Graphic Design</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="appdev"
                                                    value="App Development"
                                                    checked={formData.services.includes('App Development')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="appdev">App Development</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="webdev"
                                                    value="Website Development"
                                                    checked={formData.services.includes('Website Development')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="webdev">Website Development</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="crm"
                                                    value="CRM & ERP Development"
                                                    checked={formData.services.includes('CRM & ERP Development')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="crm">CRM & ERP Development</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="social-marketing"
                                                    value="Social Media Marketing"
                                                    checked={formData.services.includes('Social Media Marketing')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="social-marketing">Social Media Marketing</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="seo"
                                                    value="SEO (Search Engine Optimization)"
                                                    checked={formData.services.includes('SEO (Search Engine Optimization)')}
                                                    onChange={handleServiceChange}
                                                />
                                                <label className="form-check-label" htmlFor="seo">SEO (Search Engine Optimization)</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row g-3 mt-2">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="budget"
                                            className="form-control custom-input"
                                            placeholder="Budget Approx"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="message"
                                            className="form-control custom-input"
                                            placeholder="Tell us about the project *"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-check mt-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="consent"
                                        checked={formData.agree}
                                        onChange={handleConsentChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="consent">I agree to be contacted about my project. *</label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-submit-query mt-4"
                                    disabled={loading}
                                >
                                    {loading ? 'SUBMITTING...' : 'SUBMIT QUERY'}
                                </button>
                            </form>
                        </div>

                        {/* Right Side - Contact Info */}
                        <div className="col-lg-6">
                            <div className="contact-details-card">
                                <h3 className="details-title">Contact Details</h3>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaPhoneAlt />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">PHONE NUMBER</span>
                                        <p className="value">+91 99990 08998</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaPhoneAlt />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">PHONE NUMBER</span>
                                        <p className="value">+91 99996 73073</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">OFFICE ADDRESS (HEAD OFFICE)</span>
                                        <p className="value">34, N W Ave Rd, North Ave, West Punjabi Bagh, Delhi, 110026</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">OFFICE ADDRESS (NEW YORK)</span>
                                        <p className="value">Office no. 140, 60 East 42nd Street, New York, 10165</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">OFFICE ADDRESS (KAROL BAGH)</span>
                                        <p className="value">Office no, 3, Arya Samaj Rd, near big biknervala, Block 18, WEA, Karol Bagh, New Delhi, Delhi, 110005</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">OFFICE ADDRESS (DUBAI)</span>
                                        <p className="value">2nd floor, Aspin Commercial Tower - Office no -42 - Sheikh Zayed Rd - Trade Center First - Dubai - United Arab Emirates</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaEnvelope />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">EMAIL ADDRESS</span>
                                        <p className="value">kavya@clickmecha.com</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-circle">
                                        <FaEnvelope />
                                    </div>
                                    <div className="info-text">
                                        <span className="label">EMAIL ADDRESS</span>
                                        <p className="value">coffee@clickmecha.com</p>
                                    </div>
                                </div>

                                {/* Map Embed */}
                                <div className="map-container mt-4">
                                    <iframe
                                        title="ClickMecha Office Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5157853805426!2d77.12619127601755!3d28.67421378218569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d031b84fef5b1%3A0x67f6457ebbbde2f3!2sDigital%20Marketing%20Agency%20In%20West%20Delhi%20%7C%20Click%20Mecha!5e0!3m2!1sen!2sin!4v1776965890271!5m2!1sen!2sin"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0, borderRadius: '15px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
