import React, { useState } from 'react';
import './ContactForm.css';
import { submitContactForm } from '../../utils/api';
import PhoneInput from '../PhoneInput/PhoneInput';

const ContactForm = () => {
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
        <div className="contact-form-container">
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
                        {['Branding', 'UI/UX Design', 'Graphic Design', 'App Development', 'Website Development', 'CRM & ERP Development', 'Social Media Marketing', 'SEO (Search Engine Optimization)'].map(service => (
                            <div className="col-md-4 mb-2" key={service}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={service.replace(/\s+/g, '-').toLowerCase()}
                                        value={service}
                                        checked={formData.services.includes(service)}
                                        onChange={handleServiceChange}
                                    />
                                    <label className="form-check-label" htmlFor={service.replace(/\s+/g, '-').toLowerCase()}>{service}</label>
                                </div>
                            </div>
                        ))}
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
    );
};

export default ContactForm;
