import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { LuLightbulb, LuPhone, LuMail } from 'react-icons/lu';
import { useContactModal } from '../../context/ContactModalContext';
import { fetchAboutData } from '../../utils/api';
import './About.css';
import aboutimgfloat from '../../assets/home-images/about-bg-blur.png';
import curvedArrowImg from '../../assets/about-image/curved-arrow.png';
import { usePageMeta } from '../../hooks/usePageMeta';

const BASE_URL = 'https://cms.clickmecha.com';

const About = () => {
    usePageMeta('about');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { openModal } = useContactModal();

    useEffect(() => {
        const loadAboutData = async () => {
            try {
                setLoading(true);
                setError(false);

                const result = await fetchAboutData();

                if (result?.status && result?.data) {
                    setData(result.data);
                    return;
                }

                setError(true);
            } catch (fetchError) {
                console.error('Error fetching About data:', fetchError);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadAboutData();
    }, []);

    const getImageUrl = (apiPath) => {
        if (!apiPath) return '';
        if (apiPath.startsWith('http')) return apiPath;
        const cleanPath = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
        return `${BASE_URL}${cleanPath}`;
    };

    const renderContent = (content) => {
        if (!content) return null;
        return <span dangerouslySetInnerHTML={{ __html: content }} />;
    };

    const general = data?.general || {};
    const milestones = data?.milestones || [];
    const values = data?.values || [];
    const stats = [
        { value: general.founder_stat1_value, label: general.founder_stat1_label },
        { value: general.founder_stat2_value, label: general.founder_stat2_label },
        { value: general.founder_stat3_value, label: general.founder_stat3_label }
    ].filter((stat) => stat.value || stat.label);

    if (loading) {
        return (
            <div className="about-status-screen">
                <div className="spinner-border about-loader" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="about-status-text">Loading about page...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="about-status-screen">
                <p className="about-status-text">Unable to load about page right now.</p>
            </div>
        );
    }

    return (
        <div className="about-page">
            <div
                className="about-hero-wrappe position-relative vh-50 bg-cover bg-center"
                style={general.hero_bg_image ? { backgroundImage: `url(${getImageUrl(general.hero_bg_image)})` } : undefined}
            >
                <div className="hero-image-box">
                    <img src={aboutimgfloat} alt="Story Illustration" className="about-img-float position-absolute bottom-0 start-0 w-25" />
                </div>

                <div className="container section-padding text-center position-relative">
                    {general.hero_title && (
                        <h1 className="about-title mb-4">
                            {renderContent(general.hero_title)}
                        </h1>
                    )}
                    {general.hero_description && (
                        <p className="about-description mx-auto">
                            {renderContent(general.hero_description)}
                        </p>
                    )}
                </div>
            </div>

            <section className="meet-kavya-section pb-5">
                <div className="container">
                    <div className="row align-items-center gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            {general.founder_image && (
                                <div className="kavya-image-wrapper">
                                    <img
                                        src={getImageUrl(general.founder_image)}
                                        alt={general.founder_title || 'Founder'}
                                        className="img-fluid rounded-4"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-lg-7">
                            {general.founder_subtitle && <span className="section-label-orange">{general.founder_subtitle}</span>}
                            {general.founder_title && <h2 className="about-subheading mt-2 mb-4">{general.founder_title}</h2>}
                            {general.founder_description && (
                                <div className="about-text mb-5">
                                    {renderContent(general.founder_description)}
                                </div>
                            )}

                            {stats.length > 0 && (
                                <div className="row stats-row">
                                    {stats.map((stat, index) => (
                                        <div className="col-sm-4 mb-4 mb-sm-0" key={index}>
                                            {stat.value && <h3 className="stat-number">{stat.value}</h3>}
                                            {stat.label && <p className="stat-label">{stat.label}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="story-section section-padding pt-0">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            {general.story_title && (
                                <h2 className="story-heading mb-4">
                                    {renderContent(general.story_title)}
                                </h2>
                            )}
                            {general.story_description && (
                                <div className="about-text mb-4">
                                    {renderContent(general.story_description)}
                                </div>
                            )}
                            {general.story_image && (
                                <div className="story-image-wrapper">
                                    <img
                                        src={getImageUrl(general.story_image)}
                                        alt="Story"
                                        className="img-fluid rounded-4"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="col-lg-6">
                            {general.struggle_title && (
                                <h2 className="story-heading mb-4">
                                    {renderContent(general.struggle_title)}
                                </h2>
                            )}
                            {general.struggle_description && (
                                <div className="about-text mb-4">
                                    {renderContent(general.struggle_description)}
                                </div>
                            )}
                            {general.struggle_image && (
                                <div className="story-image-wrapper mb-5">
                                    <img
                                        src={getImageUrl(general.struggle_image)}
                                        alt="Struggle"
                                        className="img-fluid rounded-4"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="turning-point-section">
                <div className="container turning-point-content">
                    <div className="text-center mb-5">
                        {general.turning_title && <h2 className="story-heading mb-5">{renderContent(general.turning_title)}</h2>}
                        <div className="row text-start justify-content-center">
                            <div className="col-lg-5 mb-4 mb-lg-0">
                                {general.turning_left_text && (
                                    <div className="about-text">
                                        {renderContent(general.turning_left_text)}
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-5">
                                {general.turning_right_text && (
                                    <div className="about-text">
                                        {renderContent(general.turning_right_text)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {milestones.length > 0 && (
                        <div className="mt-5 pt-4">
                            <h2 className="story-heading text-center mb-5">Milestone Timeline</h2>
                            <div className="timeline-cards-row">
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={3}
                                    loop={milestones.length > 3}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        0: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1200: { slidesPerView: 3 },
                                    }}
                                    className="timeline-slider"
                                >
                                    {milestones.map((milestone, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="timeline-card-wrapper">
                                                <div className="timeline-card">
                                                    {(milestone.year || milestone.badge) && (
                                                        <span className="timeline-badge badge-early-days">{milestone.year || milestone.badge}</span>
                                                    )}
                                                    {milestone.title && <h3 className="timeline-title">{milestone.title}</h3>}
                                                    {milestone.description && (
                                                        <div className="timeline-text" dangerouslySetInnerHTML={{ __html: milestone.description }} />
                                                    )}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {values.length > 0 && (
                <section className="who-we-are-section section-padding">
                    <div className="container">
                        <div className="row mb-5 align-items-end">
                            <div className="col-lg-6">
                                <h2 className="story-heading">
                                    What Makes Us <br />
                                    <span className="highlight-orange">Who We Are</span>
                                </h2>
                            </div>
                            <div className="col-lg-6 text-lg-end">
                                <p className="who-we-are-intro">
                                    A reflection of the story and values coming directly from the API.
                                </p>
                            </div>
                        </div>

                        <div className="row gx-5 pb-5">
                            {values.map((value, index) => (
                                <div className="col-lg-4 mb-4 mb-lg-0 text-center text-lg-start" key={index}>
                                    <div className="icon-box mb-4">
                                        {value.icon_image ? <img src={getImageUrl(value.icon_image)} alt="icon" style={{ width: 40, height: 40 }} /> : <LuLightbulb size={40} color="#E89B25" strokeWidth={1.5} />}
                                    </div>
                                    {value.title && <h3 className="value-title">{value.title}</h3>}
                                    {value.description && <div className="value-desc" dangerouslySetInnerHTML={{ __html: value.description }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="emotional-core-section section-padding pt-0">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            {general.emotional_image && (
                                <div className="about-team-image-wrapper">
                                    <img
                                        src={getImageUrl(general.emotional_image)}
                                        alt="Team Working"
                                        className="img-fluid rounded-4"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-lg-6 bg-light-creme p-lg-5 p-1 rounded-4 position-relative">
                            <div className="emotional-content">
                                {general.emotional_title && (
                                    <h2 className="story-heading mb-4 position-relative d-inline-block">
                                        {general.emotional_title}
                                        <img src={curvedArrowImg} alt="arrow" className="curved-arrow-icon" />
                                    </h2>
                                )}
                                {general.emotional_description && (
                                    <div className="about-text mb-3 mb-lg-5">
                                        {renderContent(general.emotional_description)}
                                    </div>
                                )}
                                {general.emotional_points && (
                                    <div className="core-values-list mb-3 mb-lg-5" dangerouslySetInnerHTML={{ __html: general.emotional_points }} />
                                )}

                                <span className="highlight-tagline">AND KEPT GOING...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section section-padding pt-0 pb-0">
                <div className="cta-card position-relative overflow-hidden w-100 rounded-0">
                    <div className="container">
                        <div className="cta-content position-relative z-1">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-5 mb-lg-0">
                                    {general.cta_title && (
                                        <h2 className="cta-title text-white">
                                            {renderContent(general.cta_title)}
                                        </h2>
                                    )}
                                </div>
                                <div className="col-lg-6 text-lg-end text-white">
                                    {general.cta_description && (
                                        <div className="cta-text mb-0">
                                            {renderContent(general.cta_description)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="cta-contact-row mt-5 pt-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 text-white">
                                {general.cta_phone && (
                                    <div className="contact-item d-flex align-items-center gap-3">
                                        <div className="contact-icon-circle">
                                            <LuPhone size={24} />
                                        </div>
                                        <div className="contact-info text-start">
                                            <span className="d-block small opacity-75">Phone Number:</span>
                                            <span className="fw-bold">{general.cta_phone}</span>
                                        </div>
                                    </div>
                                )}

                                {general.cta_phone_2 && (
                                    <div className="contact-item d-flex align-items-center gap-3">
                                        <div className="contact-icon-circle">
                                            <LuPhone size={24} />
                                        </div>
                                        <div className="contact-info text-start">
                                            <span className="d-block small opacity-75">Phone Number:</span>
                                            <span className="fw-bold">{general.cta_phone_2}</span>
                                        </div>
                                    </div>
                                )}

                                {general.cta_email && (
                                    <div className="contact-item d-flex align-items-center gap-3">
                                        <div className="contact-icon-circle">
                                            <LuMail size={24} />
                                        </div>
                                        <div className="contact-info text-start">
                                            <span className="d-block small opacity-75">Email:</span>
                                            <span className="fw-bold">{general.cta_email}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {general.cta_button_text && (
                                <div className="cta-button-wrapper text-center mt-5 position-relative d-inline-block start-50 translate-middle-x">
                                    <span className="badge-free position-absolute start-50 translate-middle-x">FREE</span>
                                    <button onClick={openModal} className="btn btn-white rounded-pill px-4 py-3 fw-bold">
                                        {general.cta_button_text}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
