import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Career.css';
import careerBg from '../../assets/service-images/service-bg.png';
import careerFaces from '../../assets/career-images/career-faces.png';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaArrowRight, FaLaptopCode, FaChartLine, FaHome } from 'react-icons/fa';
import { usePageMeta } from '../../hooks/usePageMeta';

const Career = () => {
    usePageMeta('career');
    const [activeTab, setActiveTab] = useState('All Roles');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('https://cms.clickmecha.com/api/careers');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && Array.isArray(result.data)) {
                    // Transform API data to match UI component structure if needed
                    const transformedJobs = result.data.map(job => ({
                        ...job,
                        desc: job.short_desc || job.description, // Map short_desc to desc
                        tags: typeof job.tags === 'string' ? job.tags.split(',').map(tag => tag.trim()) : (job.tags || [])
                    }));
                    setJobs(transformedJobs);
                } else {
                    throw new Error('Failed to load jobs');
                }
            } catch (err) {
                console.error("Error fetching careers:", err);
                setError('Unable to load open positions at the moment.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const scrollToPositions = () => {
        const positionsSection = document.getElementById('open-positions');
        if (positionsSection) {
            positionsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const tabs = ['All Roles', 'Development', 'Designing', 'Marketing', 'Management', 'Data Analyst'];

    const filteredJobs = activeTab === 'All Roles'
        ? jobs
        : jobs.filter(job => job.category === activeTab);

    return (
        <div className="career-page">
            <div className="container">
                {/* Banner Section */}
                <div
                    className="career-banner mb-5 pb-0 "
                    style={{ backgroundImage: `url(${careerBg})` }}
                >
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6">
                            <div className="career-banner-content">
                                <h1 className="career-title">
                                    Join the Pack of the <br />
                                    Clickmecha
                                </h1>
                                <button className="btn-open-positions" onClick={scrollToPositions}>
                                    SEE OPEN POSITIONS
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 position-relative text-center text-lg-end">
                            <div className="career-faces-wrapper">
                                <img src={careerFaces} alt="Clickmecha Team" className="career-faces-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container">
                {/* Open Positions Section */}
                <div id="open-positions" className="positions-section">
                    <div className="positions-header d-flex flex-wrap justify-content-between align-items-lg-end align-items-center mb-5">
                        <div className="text-center text-lg-start">
                            <h2 className="positions-title">Open Positions</h2>
                            <p className="positions-subtitle">Find your place in Clickmecha.</p>
                        </div>

                        <div className="positions-tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    className={`position-tab ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="row g-4">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="col-lg-4 col-md-6">
                                <div className="job-card">
                                    <span className="job-category-badge">{job.category}</span>
                                    <h3 className="job-title">{job.title}</h3>

                                    <div className="job-meta-row">
                                        <div className="job-meta-item">
                                            <FaBriefcase className="me-1" /> {job.type}
                                        </div>
                                        <div className="job-meta-item">
                                            <FaClock className="me-1" /> {job.experience}
                                        </div>
                                    </div>

                                    <p className="job-desc">{job.desc}</p>

                                    <div className="job-tags">
                                        {job.tags.map((tag, idx) => (
                                            <span key={idx} className="job-tag">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="job-footer">
                                        <div className="job-location">
                                            <FaMapMarkerAlt className="me-1" /> {job.location}
                                        </div>
                                        <button
                                            className="btn-apply"
                                            onClick={() => {
                                                const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                                navigate(`/career/${slug}`);
                                            }}
                                        >
                                            Apply Now <FaArrowRight className="ms-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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

        </div>


    );
};

export default Career;
