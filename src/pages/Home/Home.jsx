import React, { useState, useEffect, useRef } from 'react';

import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';
import Work from '../../components/Work/Work';
import Contact from '../../components/Contact/Contact';
import ContactForm from '../../components/ContactForm/ContactForm';
import { usePageMeta } from '../../hooks/usePageMeta';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Assets Imports from src/assets/home-images/
// Hero
import heroShape from '../../assets/home-images/hero-shape.png';
import heroAvatar from '../../assets/home-images/hero-avatar.png';
import heroBg from '../../assets/home-images/hero-bg.png';
import heroRatingGroup from '../../assets/home-images/hero-rating-group.png';

// About
import officeImage from '../../assets/home-images/office.png';
import aboutBgBlur from '../../assets/home-images/about-bg-blur.png';
import bottomImage from '../../assets/home-images/opfficeima.jpg';

// Services
import iconWeb from '../../assets/home-images/icon-web.png';
import iconMobile from '../../assets/home-images/icon-mobile.png';
import iconUI from '../../assets/home-images/icon-ui.png';
import stickerGreatWork from '../../assets/home-images/sticker-great-work.png';
import iconMarketing from '../../assets/home-images/icon-marketing.png';

// Clients
import logo1 from '../../assets/home-images/imgi_10_nww_c9.png';
import logo2 from '../../assets/home-images/imgi_35_cl5.png';
import logo3 from '../../assets/home-images/imgi_36_cl6.png';
import logo4 from '../../assets/home-images/imgi_49_cl20.png';
import logo5 from '../../assets/home-images/imgi_50_cl23.png';
import logo6 from '../../assets/home-images/imgi_51_cl24.png';

// Testimonials
import rocketIcon from '../../assets/home-images/rocket.png';

// Results
import result1 from '../../assets/home-images/result-1.png';
import result2 from '../../assets/home-images/result-2.png';
import result3 from '../../assets/home-images/result-3.png';
import result4 from '../../assets/home-images/result-4.png';

// Growth
import teamMeeting from '../../assets/home-images/team-meeting.png';
import netLikes from '../../assets/home-images/net-likes.png';
import baburaoSticker from '../../assets/home-images/baburao-sticker.png';
import growthBg from '../../assets/home-images/growth-bg.webp';


const VideoItem = ({ video }) => {
    // Fallback thumbnail
    const thumbnailImage = video.thumbnail || result1;
    const [isMuted, setIsMuted] = useState(true);

    const getYoutubeId = (url) => {
        if (!url) return null;
        // Regex to handle various YouTube URL formats including shorts
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(video.video_url);
    const isDirectFile = !videoId && video.video_url;

    return (
        <div
            className="result-img-wrapper position-relative"
            style={{
                background: '#000',
                minHeight: '300px',
                borderRadius: '12px',
                overflow: 'hidden'
            }}
        >
            {videoId ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${videoId}&playsinline=1&showinfo=0&modestbranding=1&rel=0`}
                    title="Video testimonial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                ></iframe>
            ) : isDirectFile ? (
                <video
                    src={video.video_url}
                    autoPlay={true}
                    muted={isMuted}
                    loop={true}
                    playsInline={true}
                    controls={false}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div style={{
                    backgroundImage: `url(${thumbnailImage})`,
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            )}
            <button
                className="mute-toggle-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                style={{ zIndex: 10, position: 'absolute', bottom: '10px', right: '10px' }}
            >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
        </div>
    );
};

const Home = () => {
    usePageMeta('home');
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playingVideoId, setPlayingVideoId] = useState(null);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const aboutImgRef = useRef(null);
    const bottomImgRef = useRef(null);

    useGSAP(() => {
        // Office Image Parallax
        const aboutContainer = aboutImgRef.current;
        if (aboutContainer) {
            const img = aboutContainer.querySelector('img');
            if (img) {
                gsap.fromTo(
                    img,
                    { yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: aboutContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.2,
                        },
                    }
                );
            }
        }

        // Bottom Image Parallax
        const bottomContainer = bottomImgRef.current;
        if (bottomContainer) {
            const img = bottomContainer.querySelector('img');
            if (img) {
                gsap.fromTo(
                    img,
                    { yPercent: -15 },
                    {
                        yPercent: 15,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: bottomContainer,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.2,
                        },
                    }
                );
            }
        }
    }, { dependencies: [homeData], revertOnUpdate: true });

    const openServiceModal = () => {
        setShowServiceModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeServiceModal = () => {
        setShowServiceModal(false);
        document.body.style.overflow = 'unset';
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://cms.clickmecha.com/api/home');
                const result = await response.json();
                if (result.status && result.data) {
                    setHomeData(result.data);
                } else {
                    setError(result.message || 'Failed to fetch data');
                }
            } catch (err) {
                console.error('Error fetching home data:', err);
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Clients Slider Settings
    const clientSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    // Use API data or fallback to static
    const clientLogos = homeData && homeData.clients ? homeData.clients : [
        { logo: logo1 }, { logo: logo2 }, { logo: logo3 }, { logo: logo4 }, { logo: logo5 }, { logo: logo6 }
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="text-danger">Error: {error}</div>
            </div>
        );
    }

    if (!homeData) return null;



    const testimonialSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };


    return (
        <main>
            {/* === Hero Section === */}
            <section id="home" className="hero-section" style={{ backgroundImage: `url(${homeData.hero.image || heroBg})` }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 hero-content">
                            <div className="rating-pill mb-4 fade-in-up">
                                <img src={heroRatingGroup} alt="Rating Avatars" className="rating-avatars" />
                                <span className="rating-text">{homeData.hero.subtitle}</span>
                            </div>
                            <h1 className="hero-title mb-4 fade-in-up delay-1" dangerouslySetInnerHTML={{ __html: homeData.hero.title }} />

                            <button className="btn-journey d-none d-md-inline-block text-decoration-none text-center d-inline-block" onClick={openServiceModal}>
                                {homeData.hero.button_text}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hero-shape-container fade-in-right">
                    <img src={heroShape} alt="Abstract 3D Shape" className="hero-shape-img" />
                </div>

                <div className="hero-floating-desc">
                    <p className="d-none d-md-none" dangerouslySetInnerHTML={{ __html: homeData.hero.description }} />
                    <p className="d-md-none" dangerouslySetInnerHTML={{ __html: homeData.hero.description }} />
                    <button className="btn-journey d-md-none text-decoration-none text-center d-inline-block" onClick={openServiceModal}>
                        {homeData.hero.button_text}
                    </button>
                </div>
            </section>

            {/* === About Section === */}
            <>
                <section className="about-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                <span className="section-label">{homeData.about.title}</span>
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div dangerouslySetInnerHTML={{ __html: homeData.about.subtitle }} />
                                <div className="about-image-container mb-5" ref={aboutImgRef}>
                                    <img src={homeData.about.image || officeImage} alt="About Us" className="img-fluid rounded-4 w-100 about-office-img" />
                                </div>
                                <div className="row stats-row">
                                    <div className="col-md-6 mb-4 mb-md-0">
                                        <div dangerouslySetInnerHTML={{ __html: homeData.about.content }} />
                                    </div>
                                    <div className="col-md-6 mb-4 mb-md-0">
                                        <div dangerouslySetInnerHTML={{ __html: homeData.about.content_2 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <div className="parallax-image-wrapper" ref={bottomImgRef}>
                    <img src={bottomImage} alt="" className="about-bottom-image" />
                </div>
            </>

            {/* === Services Section === */}
            <section id="services" className="services-section">
                <div className="container">
                    <div className="row pb-5 align-items-end position-relative">
                        <div className="col-lg-7">
                            <h2 className="services-headline">
                                From <span className="highlight-text">strategy to execution</span>, we provide full-stack digital solutions.
                            </h2>
                        </div>
                        <div className="col-lg-5 text-lg-end text-center position-relative mt-3">
                            {/* <Link to="/contact">
                                <button className="btn-quote">REQUEST A QUOTE</button>
                            </Link> */}
                        </div>
                        {/* <img src={stickerGreatWork} alt="Great Work" className="great-work-sticker d-none d-md-block" /> */}
                    </div>
                    <div className="row g-4">
                        {homeData.services && homeData.services.map((service, index) => (
                            <div key={service.id || index} className="col-lg-4 col-md-6">
                                <div className="service-card">
                                    <h3 className="service-title">{service.title}</h3>
                                    <div className="service-icon-wrapper">
                                        <img src={service.icon} alt={service.title} className="service-icon" />
                                    </div>
                                    <p className="service-desc">{service.description}</p>

                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <button className="btn-journey" onClick={openServiceModal}>CONTACT US</button>
                    </div>
                    {/* 
                    <div className="text-center mt-5">
                        <Link to="/services">
                            <button className="btn-journey">See More</button>
                        </Link>
                    </div> */}
                </div>
            </section>

            {/* === Work Component (Kept Separate) === */}
            <Work workShowcase={homeData.work_showcase} />

            {/* === Clients Section === */}
            <section className="clients-section">
                <div className="container-fluid text-center">
                    <h2 className="clients-headline mb-5">Our Clients</h2>
                    <div className="slider-container">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={5}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            speed={500}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                },
                                480: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1280: {
                                    slidesPerView: 5,
                                }
                            }}
                        >
                            {clientLogos.map((client, index) => (
                                <SwiperSlide key={client.id || index}>
                                    <div className="client-slide">
                                        <img src={client.logo} alt={`Client ${index + 1}`} className="client-logo" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* === Testimonials Section === */}
            <section className="testimonials-section position-relative">
                <img src={rocketIcon} alt="Rocket" className="rocket-icon" />
                <div className="container">
                    <div className="testimonials-header text-center mb-5 position-relative">
                        <h2 className="testimonials-headline">
                            What it’s like to <br />
                            <span className="highlight-text">collaborate together</span>
                        </h2>
                    </div>
                    <div className="testimonials-slider">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={30}
                            slidesPerView={3}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            speed={500}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                992: {
                                    slidesPerView: 2,
                                },
                                1280: {
                                    slidesPerView: 3,
                                }
                            }}
                        >
                            {homeData.testimonials && homeData.testimonials.map((item, index) => (
                                <SwiperSlide key={item.id || index}>
                                    <div className="testimonial-card">
                                        <div className="quote-icon">“</div>
                                        <div className="stars">
                                            {/* Stars mapping if rating exists, otherwise just show images or nothing */}
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                        </div>
                                        <h3 className="testimonial-title">{item.name || item.client_name}</h3>
                                        <p className="testimonial-subtitle text-muted mb-2">{item.position || item.client_position}</p>
                                        <p className="testimonial-desc">{item.content || item.testimonial_text}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* === Results Section (Video Testimonials) === */}
            <section className="results-section">
                <div className="container">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6">
                            <h2 className="results-headline">
                                Real Results, <br />
                                <span className="highlight-text">Real People</span>
                            </h2>
                        </div>
                        <div className="col-lg-6">
                            <p className="results-desc">
                                Discover genuine customer experiences, thoughtfully shared to highlight the real results and refined quality behind our brand.
                            </p>
                        </div>
                    </div>
                    <div className="row g-3">
                        {homeData.video_testimonials && homeData.video_testimonials.map((video, index) => (
                            <div key={video.id || index} className="col-6 col-md-3">
                                <VideoItem video={video} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === Growth Section === */}
            <section className="growth-section" style={{ backgroundImage: `url(${growthBg})` }}>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-lg-5 mb-5 mb-lg-0 position-relative z-2">
                            <h2 className="growth-headline" dangerouslySetInnerHTML={{ __html: homeData.company_highlight?.section_title }} />
                            <Link to={homeData.company_highlight?.button_link || '/about'}>
                                <button className="btn-about">{homeData.company_highlight?.button_text || 'ABOUT THE BRAND'}</button>
                            </Link>
                        </div>
                        <div className="col-lg-7 position-relative">
                            <img src={netLikes} alt="Likes" className="net-sticker" />
                            <div className="growth-image-wrapper">
                                <img src={homeData.company_highlight?.team_image || teamMeeting} alt="Team Meeting" className="img-fluid growth-img" />
                            </div>
                            <div className="growth-content mt-4">
                                <p className="growth-desc" dangerouslySetInnerHTML={{ __html: homeData.company_highlight?.section_description }} />
                                {/* Display Statistics from company highlight if available and not already in description */}
                                {homeData.company_highlight?.statistics && (
                                    <div className="d-flex gap-4 mt-3">
                                        {homeData.company_highlight.statistics.map((stat, idx) => (
                                            <div key={idx}>
                                                <strong className="d-block h4 mb-0">{stat.value}</strong>
                                                <span className="text-muted small">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === Contact Component (Kept Separate) === */}
            <Contact helpData={homeData.help_section} />

            {/* Service Modal */}
            {showServiceModal && (
                <div className="modal-overlay" onClick={closeServiceModal} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}>
                    <div className="modal-content-box" onClick={(e) => e.stopPropagation()} style={{
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '30px',
                        maxWidth: '800px',
                        width: '100%',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <button className="close-modal-btn" onClick={closeServiceModal} style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#333'
                        }}>
                            <FiX />
                        </button>
                        <ContactForm />
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
