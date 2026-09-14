import React, { useState } from 'react';
import './SubServiceBannerForm.css';
import { submitContactForm } from '../../utils/api';

const SubServiceBannerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });

        if (!formData.name || !formData.email || !formData.phone) {
            setStatus({ type: 'error', msg: 'Please fill out all fields.' });
            return;
        }

        setLoading(true);
        try {
            const apiData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: 'Lead from Sub-Service Banner Form',
                agree: 'yes'
            };

            const data = await submitContactForm(apiData);

            if (data.status || data.success || data.message) {
                setStatus({ type: 'success', msg: data.message || 'Thank you! Your query has been submitted.' });
                setFormData({ name: '', email: '', phone: '' });
            } else {
                setStatus({ type: 'error', msg: data.message || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Failed to submit. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sub-banner-form-wrapper">
            <div className="container sub-banner-form-container">
                <p className="sub-banner-subtitle">Ready to Grow</p>
                <h2 className="sub-banner-title">Start Your Project</h2>
                
                <form className="sub-banner-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={loading} className="sub-banner-submit">
                        {loading ? 'Submitting...' : 'Submit now'}
                    </button>
                </form>

                {status.msg && (
                    <div className={`sub-banner-status ${status.type}`}>
                        {status.msg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubServiceBannerForm;
