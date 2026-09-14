import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import './BlogPost.css';
import Contact from '../../components/Contact/Contact';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import heroImage from '../../assets/blog-images/blog-details-hero.png';
import { submitContactForm } from '../../utils/api';
import {
    applySeoMetadata,
    DEFAULT_OG_IMAGE,
    stripHtml,
} from '../../utils/seo';

const getReadCount = (blog) =>
    blog?.read_count ??
    blog?.reads ??
    blog?.views ??
    blog?.view_count ??
    blog?.total_reads ??
    blog?.total_views ??
    null;

const formatReadCount = (count) => {
    if (count === null || count === undefined || count === '') return null;

    const numericCount = Number(count);
    if (Number.isFinite(numericCount)) {
        return `${numericCount.toLocaleString('en-US')} Reads`;
    }

    return `${count} Reads`;
};

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [activeFaq, setActiveFaq] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country_code: '+91',
        agree: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleFaq = (index) => {
        setActiveFaq((current) => (current === index ? null : index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agree) {
            setSubmitStatus({
                type: 'error',
                text: 'Please agree to be contacted about your project'
            });
            return;
        }

        setLoadingSubmit(true);
        setSubmitStatus({ type: '', text: '' });

        try {
            const cleanCode = formData.country_code.split('-')[0];
            const apiData = {
                name: formData.name,
                email: formData.email,
                phone: `${cleanCode} ${formData.phone}`.trim(),
                message: `Inquiry from Blog Post: ${blog ? blog.title : 'Unknown'}`,
                agree: 'yes'
            };

            const data = await submitContactForm(apiData);

            if (data.status) {
                setSubmitStatus({
                    type: 'success',
                    text: data.message || 'Query sent successfully!'
                });
                setFormData({ name: '', email: '', phone: '', country_code: '+91', agree: false });
            } else {
                setSubmitStatus({
                    type: 'error',
                    text: data.message || 'Failed to send query.'
                });
            }
        } catch (err) {
            console.error('Contact form error:', err);
            setSubmitStatus({
                type: 'error',
                text: 'An error occurred. Please try again.'
            });
        } finally {
            setLoadingSubmit(false);
        }
    };

    useEffect(() => {
        const fetchBlogDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://cms.clickmecha.com/api/blogs/${slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && result.data) {
                    setBlog(result.data);
                    setRecentBlogs(result.recent_blogs || []);
                    setActiveFaq(null);
                } else {
                    throw new Error(result.message || 'Failed to fetch blog details');
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Blog post not found or has been removed.');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlogDetails();
            window.scrollTo(0, 0);
        }
    }, [slug]);

    useEffect(() => {
        if (blog) {
            const formatDateSafe = (dateVal) => {
                if (!dateVal) return '';
                try {
                    const d = new Date(dateVal);
                    if (isNaN(d.getTime())) return '';
                    return d.toISOString().split('T')[0];
                } catch (e) {
                    return '';
                }
            };

            const rawDesc = blog.metaDesc || blog.short_desc || (blog.desc ? blog.desc.replace(/<[^>]+>/g, '').substring(0, 160) : '');
            const cleanDescription = stripHtml(rawDesc);
            const canonicalUrl = `https://clickmecha.com/blog/${blog.slug}`;

            applySeoMetadata({
                title: blog.metaTitle || blog.title || 'Blog Post | Click Mecha',
                description: cleanDescription,
                keywords: blog.metaKeyword || '',
                canonicalUrl,
                ogTitle: blog.metaTitle || blog.title || 'Blog Post | Click Mecha',
                ogDescription: cleanDescription,
                ogImage: blog.image_url || DEFAULT_OG_IMAGE,
                ogUrl: canonicalUrl,
                ogType: 'article',
                articleModifiedTime: blog.updated_at || blog.created_at,
                msTileImage: blog.image_url || DEFAULT_OG_IMAGE,
            });

            // Dynamic JSON-LD Schema (BlogPosting)
            let schemaScript = document.getElementById('blog-posting-schema');
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.type = 'application/ld+json';
                schemaScript.id = 'blog-posting-schema';
                document.head.appendChild(schemaScript);
            }

            const schema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://clickmecha.com/blog/${blog.slug}`
                },
                "headline": blog.title || '',
                "description": cleanDescription,
                "image": blog.image_url || 'https://cms.clickmecha.com/public/storage/blogs/media/1777882398_32ybMmDuNm.jpg',
                "author": {
                    "@type": "Organization",
                    "name": "Click Mecha"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Click Mecha",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://clickmecha.com/favicon.png"
                    }
                },
                "datePublished": formatDateSafe(blog.created_at),
                "dateModified": formatDateSafe(blog.updated_at || blog.created_at)
            };

            schemaScript.textContent = JSON.stringify(schema, null, 2);
            console.log('JSON-LD BlogPosting schema dynamically injected in <head>:', schema);

            // Dynamic JSON-LD Schema (FAQPage) - only if FAQs exist
            if (blog.faqs && blog.faqs.length > 0) {
                let faqSchemaScript = document.getElementById('blog-faq-schema');
                if (!faqSchemaScript) {
                    faqSchemaScript = document.createElement('script');
                    faqSchemaScript.type = 'application/ld+json';
                    faqSchemaScript.id = 'blog-faq-schema';
                    document.head.appendChild(faqSchemaScript);
                }

                const faqSchema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": blog.faqs.map(faq => ({
                        "@type": "Question",
                        "name": faq.question || '',
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer || ''
                        }
                    }))
                };

                faqSchemaScript.textContent = JSON.stringify(faqSchema, null, 2);
                console.log('JSON-LD FAQPage schema dynamically injected in <head>:', faqSchema);
            } else {
                const faqSchemaScript = document.getElementById('blog-faq-schema');
                if (faqSchemaScript) {
                    faqSchemaScript.remove();
                }
            }
        }

        return () => {
            const schemaScript = document.getElementById('blog-posting-schema');
            if (schemaScript) {
                schemaScript.remove();
                console.log('JSON-LD BlogPosting schema removed from <head>.');
            }
            const faqSchemaScript = document.getElementById('blog-faq-schema');
            if (faqSchemaScript) {
                faqSchemaScript.remove();
                console.log('JSON-LD FAQPage schema removed from <head>.');
            }
        };
    }, [blog]);

    if (loading) {
        return (
            <div className="blog-post-page">
                <div className="container text-center" style={{ padding: '100px 0' }}>
                    <h2>Loading article...</h2>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return <NotFound />;
    }

    const blogDate = blog.created_at
        ? new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'DATE LOADING...';
    const blogReadCount = formatReadCount(getReadCount(blog));

    return (
        <div className="blog-post-page">
            <div className="container">
                <div className="blog-hero-image-wrapper mb-5">
                    <img
                        src={blog.image_url || heroImage}
                        alt={blog.title}
                        className="blog-hero-image"
                    />
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <div className="blog-post-content">
                            <div className="blog-post-meta">
                                <span>{blogDate}</span>
                                <span>{blog.read_time || '3 MINUTE READ'}</span>
                                {blogReadCount && <span>{blogReadCount}</span>}
                            </div>

                            <h1 className="blog-post-title">
                                {blog.title}
                            </h1>

                            <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: blog.desc }} />

                            {blog.faqs?.length > 0 && (
                                <section className="blog-faq-section">
                                    <div className="blog-faq-header">
                                        <p className="blog-faq-eyebrow">Blog FAQs</p>
                                        <h2 className="blog-faq-title">Frequently Asked Questions</h2>
                                    </div>

                                    <div className="blog-faq-list">
                                        {blog.faqs.map((faq, index) => {
                                            const isOpen = activeFaq === index;
                                            const faqId = `blog-faq-${faq.id || index}`;

                                            return (
                                                <div key={faq.id || faqId} className={`blog-faq-item ${isOpen ? 'is-open' : ''}`}>
                                                    <button
                                                        type="button"
                                                        className="blog-faq-question"
                                                        onClick={() => toggleFaq(index)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={`${faqId}-answer`}
                                                    >
                                                        <span>{faq.question}</span>
                                                        <span className="blog-faq-icon">{isOpen ? '-' : '+'}</span>
                                                    </button>
                                                    <div
                                                        id={`${faqId}-answer`}
                                                        className={`blog-faq-answer ${isOpen ? 'is-open' : ''}`}
                                                    >
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="blog-sidebar-sticky">
                            <div className="sidebar-form-card">
                                <h3 className="sidebar-title">Send your Query</h3>
                                {submitStatus.text && (
                                    <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} p-2 small`}>
                                        {submitStatus.text}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control sidebar-input"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control sidebar-input"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <PhoneInput
                                            phoneName="phone"
                                            countryCodeName="country_code"
                                            phoneValue={formData.phone}
                                            countryCodeValue={formData.country_code}
                                            onChange={handleInputChange}
                                            required={true}
                                            className="pill-style"
                                        />
                                    </div>

                                    <div className="form-check mb-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="sidebar-consent"
                                            name="agree"
                                            checked={formData.agree}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="form-check-label sidebar-consent-label" htmlFor="sidebar-consent">
                                            I agree to be contacted about my project.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-sidebar-submit"
                                        disabled={loadingSubmit}
                                    >
                                        {loadingSubmit ? 'SENDING...' : 'SUBMIT QUERY'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {recentBlogs.length > 0 && (
                    <div className="related-articles-section">
                        <h3 className="mb-4">Recent Articles</h3>
                        <div className="row g-4">
                            {recentBlogs.map((recent) => {
                                const recentReadCount = formatReadCount(getReadCount(recent));

                                return (
                                    <div key={recent.id} className="col-md-4">
                                        <Link to={`/blog/${recent.slug || '#'}`} className="text-decoration-none">
                                            <div className="related-card">
                                                <div className="related-img-wrapper">
                                                    <img src={recent.image_url || heroImage} alt={recent.title} className="related-img" />
                                                </div>
                                                <div className="related-meta">
                                                    {recent.created_at ? new Date(recent.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'OCTOBER 8, 2025'}
                                                    {recentReadCount ? ` • ${recentReadCount}` : ''}
                                                </div>
                                                <h4 className="related-title">{recent.title}</h4>
                                                <p className="related-desc">
                                                    {recent.short_desc || 'Read this article to learn more.'}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <Contact />
        </div>
    );
};

export default BlogPost;
