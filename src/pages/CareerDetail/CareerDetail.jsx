import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import './CareerDetail.css';
import { FaMapMarkerAlt, FaBriefcase, FaBolt, FaHourglassHalf, FaLaptopCode, FaChartLine, FaHome } from 'react-icons/fa';
import '../Career/Career.css';
import PhoneInput from '../../components/PhoneInput/PhoneInput';

const CareerDetail = () => {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [fetchingJob, setFetchingJob] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country_code: '+91',
        state: '',
        experience: '',
        resume: null,
        linkedin: '',
        cover_letter: ''
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`https://cms.clickmecha.com/api/careers/${slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && result.data) {
                    setJob(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch job details');
                }
            } catch (err) {
                console.error("Error fetching job:", err);
                setFetchError('Job position not found or has been removed.');
            } finally {
                setFetchingJob(false);
            }
        };

        if (slug) {
            fetchJobDetails();
        }
    }, [slug]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            alert("File size exceeds 2MB");
            e.target.value = null; // Reset file input
            setFormData(prev => ({ ...prev, resume: null }));
        } else {
            setFormData(prev => ({ ...prev, resume: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage({ type: '', text: '' });

        if (!formData.name || !formData.email || !formData.phone || !formData.state || !formData.experience || !formData.resume) {
            setResponseMessage({
                type: 'error',
                text: 'Please fill in all required fields and upload a resume.'
            });
            return;
        }

        if (!job || !job.id) {
            setResponseMessage({
                type: 'error',
                text: 'Job ID is missing. Please refresh the page.'
            });
            return;
        }

        setLoading(true);

        try {
            const submitData = new FormData();
            const cleanCode = formData.country_code.split('-')[0];

            submitData.append('career_id', job.id);
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', `${cleanCode} ${formData.phone}`.trim());
            submitData.append('state', formData.state);
            submitData.append('experience', formData.experience);
            submitData.append('resume', formData.resume);

            if (formData.linkedin) submitData.append('linkedin', formData.linkedin);
            if (formData.cover_letter) submitData.append('cover_letter', formData.cover_letter);

            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                body: submitData
                // Do NOT set Content-Type header when sending FormData, fetch sets it automatically with boundary
            });

            const result = await response.json();

            if (response.ok && result.status) {
                setResponseMessage({
                    type: 'success',
                    text: result.message || 'Application submitted successfully! Good luck!'
                });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    country_code: '+91',
                    state: '',
                    experience: '',
                    resume: null,
                    linkedin: '',
                    cover_letter: ''
                });
                // Find file input and reset it manually
                const fileInput = document.querySelector('input[type="file"][name="resume"]');
                if (fileInput) fileInput.value = '';

            } else {
                setResponseMessage({
                    type: 'error',
                    text: result.message || `Server error: ${response.status}`
                });
            }
        } catch (error) {
            console.error('Application submission error:', error);
            setResponseMessage({
                type: 'error',
                text: 'An unexpected error occurred. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetchingJob) {
        return (
            <div className="career-detail-page">
                <div className="container text-center" style={{ padding: '100px 0' }}>
                    <h2>Loading job details...</h2>
                </div>
            </div>
        );
    }

    if (fetchError || !job) {
        return <NotFound />;
    }

    return (
        <div className="career-detail-page">
            {/* Header Section */}
            <header className="career-detail-header">
                <div className="container text-center">
                    <h1 className="detail-job-title">{job.title}</h1>
                    {/* Assuming description in header is short summary */}
                    <div className="detail-job-summ" dangerouslySetInnerHTML={{ __html: job.description ? job.description.substring(0, 200) + '...' : '' }}></div>
                </div>
            </header>

            <div className="container content-container">
                <div className="row">
                    {/* Left Column: Job Info */}
                    <div className="col-lg-8">
                        {/* Quick Info Card */}
                        <div className="job-info-card mb-5">
                            <h3 className="info-card-title">{job.title}</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <FaMapMarkerAlt className="info-icon" />
                                    <span className="info-label">Location:</span>
                                    {/* Assuming location might be in fetched data, defaulting if not */}
                                    <span className="info-value">{job.location || 'Remote'}</span>
                                </div>
                                <div className="info-item">
                                    <FaBriefcase className="info-icon" />
                                    <span className="info-label">Job Type:</span>
                                    <span className="info-value">{job.type || 'Full-Time'}</span>
                                </div>
                                <div className="info-item">
                                    <FaBolt className="info-icon" />
                                    <span className="info-label">Required Skills:</span>
                                    <span className="info-value">
                                        {/* Assuming skills might be HTML list or string, handle simply for now if possible */}
                                        See Description
                                    </span>
                                </div>
                                <div className="info-item">
                                    <FaHourglassHalf className="info-icon" />
                                    <span className="info-label">Experience:</span>
                                    <span className="info-value">{job.experience || '0-1 Years'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Content */}
                        <div className="job-description-content">
                            <section className="desc-section">
                                <h3 className="section-title">Job Summary:</h3>
                                <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                            </section>

                            {job.responsibilities && (
                                <section className="desc-section">
                                    <h3 className="section-title">Key Responsibilities:</h3>
                                    <div dangerouslySetInnerHTML={{ __html: job.responsibilities }}></div>
                                </section>
                            )}

                            {job.skills_required && (
                                <section className="desc-section">
                                    <h3 className="section-title">Required Skills:</h3>
                                    <div dangerouslySetInnerHTML={{ __html: job.skills_required }}></div>
                                </section>
                            )}

                            {job.nice_to_have && (
                                <section className="desc-section">
                                    <h3 className="section-title">Nice to Have:</h3>
                                    <div dangerouslySetInnerHTML={{ __html: job.nice_to_have }}></div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="col-lg-4">
                        <div className="application-form-card sticky-sidebar">
                            <h3 className="form-title">Apply Now</h3>
                            <p className="form-subtitle">Applying for: <strong>{job.title}</strong></p>

                            {/* Response Message */}
                            {responseMessage.text && (
                                <div className={`alert ${responseMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                                    {responseMessage.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label required">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Phone Number</label>
                                    <PhoneInput
                                        phoneName="phone"
                                        countryCodeName="country_code"
                                        phoneValue={formData.phone}
                                        countryCodeValue={formData.country_code}
                                        onChange={handleInputChange}
                                        required={true}
                                        className="career-style"
                                        placeholder="Enter Your Number"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">State</label>
                                    <select
                                        name="state"
                                        className="form-select"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Select your state</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Experience</label>
                                    <select
                                        name="experience"
                                        className="form-select"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Select experience</option>
                                        <option value="Fresher">Fresher</option>
                                        <option value="1-2 Years">1-2 Years</option>
                                        <option value="3-5 Years">3-5 Years</option>
                                        <option value="5+ Years">5+ Years</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Resume</label>
                                    <input
                                        type="file"
                                        name="resume"
                                        className="form-control"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    <small className="text-muted">Max 2MB (PDF, DOC, DOCX)</small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">LinkedIn</label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        className="form-control"
                                        placeholder="Enter Your LinkedIn Profile"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Cover Letter</label>
                                    <textarea
                                        name="cover_letter"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Tell us why you're interested in this position"
                                        value={formData.cover_letter}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <div className="captcha-mockup">
                                        <input
                                            type="checkbox"
                                            id="human-check"
                                            required
                                        />
                                        <label htmlFor="human-check">I am human</label>
                                        <span className="captcha-logo">🔄</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-submit-app"
                                    disabled={loading}
                                >
                                    {loading ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Work With Us Section */}
            <section className="why-us-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="why-us-title">Why work with us?</h2>
                        <p className="why-us-desc">
                            We build a culture where innovation meets execution. No <br />
                            corporate fluff, just high-impact work.
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-md-4">
                            <div className="why-us-card">
                                <div className="icon-box icon-orange">
                                    <FaLaptopCode />
                                </div>
                                <h3 className="card-title">Cutting-Edge Stack</h3>
                                <p className="card-desc">
                                    We don't do legacy. Work with React, Node.js, AI Agents, and modern tools.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-md-4">
                            <div className="why-us-card">
                                <div className="icon-box icon-purple">
                                    <FaChartLine />
                                </div>
                                <h3 className="card-title">Impact & Growth</h3>
                                <p className="card-desc">
                                    Meritocracy over seniority. Clear paths for promotion and leading projects.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-md-4">
                            <div className="why-us-card">
                                <div className="icon-box icon-pink">
                                    <FaHome />
                                </div>
                                <h3 className="card-title">Flexibility</h3>
                                <p className="card-desc">
                                    We value output over hours. Enjoy hybrid and remote options.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default CareerDetail;
