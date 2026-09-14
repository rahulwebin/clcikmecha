import React, { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import './Blog.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Contact from '../../components/Contact/Contact';

// Fallback image if API doesn't provide one
import fallbackImg from '../../assets/blog-images/blog-1.png';
import { usePageMeta } from '../../hooks/usePageMeta';

const getReadCount = (blog) =>
    blog.read_count ??
    blog.reads ??
    blog.views ??
    blog.view_count ??
    blog.total_reads ??
    blog.total_views ??
    null;

const formatReadCount = (count) => {
    if (count === null || count === undefined || count === '') return null;

    const numericCount = Number(count);
    if (Number.isFinite(numericCount)) {
        return `${numericCount.toLocaleString('en-US')} Reads`;
    }

    return `${count} Reads`;
};

const Blog = () => {
    usePageMeta('blog');
    const [activeTab, setActiveTab] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

    const itemsPerPage = 5; // Used for calculation if needed, but API controls per_page really

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                // Construct URL with pagination
                // The API documentation specifies: GET /blogs?page={page}&search={search}
                const response = await fetch(`https://cms.clickmecha.com/api/blogs?page=${currentPage}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && result.data) {
                    // New API Response Structure: 
                    // result.data = { current_page, data: [], total, per_page }
                    const paginationData = result.data;
                    const blogsArray = paginationData.data || [];

                    // Transform API data to match UI component structure
                    const transformedBlogs = blogsArray.map(blog => ({
                        id: blog.id,
                        category: blog.category ? blog.category.name : 'GENERAL',
                        image: blog.image_url || fallbackImg,
                        date: blog.date ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'RECENT',
                        readTime: blog.read_time || '3 MINUTE READ',
                        readCount: formatReadCount(getReadCount(blog)),
                        title: blog.title,
                        desc: (blog.desc || '').replace(/<[^>]+>/g, ''),
                        author: blog.author ? blog.author.name : 'TEAM CLICKMECHA',
                        slug: blog.slug
                    }));

                    setBlogs(transformedBlogs);

                    // Update total pages based on API total and per_page
                    const totalProxy = paginationData.total || 0;
                    const perPageProxy = paginationData.per_page || 10;
                    setTotalPages(Math.ceil(totalProxy / perPageProxy));
                } else {
                    setBlogs([]);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage]); // Re-fetch when page changes

    const tabs = ['ALL', 'LATEST', 'AI TRENDS', 'MARKETING', 'DESIGN'];

    // Note: The API currently only supports 'page' and 'search'. 
    // Category filtering is not supported server-side yet.
    // We will display all fetched blogs regardless of tab for now, 
    // or we could filter client-side if the page size was large enough, 
    // but for paginated data, client-side filtering is incomplete.
    // For now, we pass 'blogs' directly.
    const currentPosts = blogs;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        // In the future, pass 'tab' as a category param to the API
    };

    const lenis = useLenis();

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            if (lenis) {
                lenis.scrollTo(0);
            } else {
                window.scrollTo(0, 0);
            }
        }
    };

    if (loading) {
        return (
            <div className="blog-page">
                <div className="container text-center" style={{ padding: '100px 0' }}>
                    <h2>Loading stories...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-page">
            <div className="container">

                {/* Filter Tabs - UI Only for now until API supports Category */}
                <div className="blog-tabs-wrapper">
                    <div className="blog-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`blog-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="blog-content">
                    {/* If page 1 and ALL/LATEST, show specific layout (2 Featured + Grid) */}

                    <div className="row g-4 mb-5">
                        {currentPosts.length > 0 ? (
                            currentPosts.map((post, index) => {
                                // First 2 items on Page 1 get full width featured treatment (col-lg-6)
                                // Only if we are on the first page
                                const isFeaturedDisplay = currentPage === 1 && index < 2;

                                return (
                                     <div key={post.id} className={isFeaturedDisplay ? "col-lg-6" : "col-lg-4 col-md-6"}>
                                         <Link to={`/blog/${post.slug || '#'}`} className="blog-card-link text-decoration-none">
                                             <div className={`blog-card ${isFeaturedDisplay ? 'featured-card' : ''}`}>
                                                 <div className="blog-img-wrapper">
                                                     <img src={post.image} alt={post.title} className="blog-img" />
                                                 </div>
                                                 <div className="blog-body">
                                                     <div className="blog-meta">
                                                         {post.date}, {post.readTime}{post.readCount ? `, ${post.readCount}` : ''}
                                                     </div>
                                                     <h3 className="blog-title">{post.title}</h3>
                                                     <p className="blog-desc">{post.desc}</p>

                                                     <div className="blog-footer">
                                                         <span className="read-more-link">Read More</span>
                                                         <span className="blog-author-badge">{post.author}</span>
                                                     </div>
                                                 </div>
                                             </div>
                                         </Link>
                                     </div>
                                );
                            })
                        ) : (
                            <div className="text-center w-100 py-5">
                                <h3>No posts found.</h3>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="blog-pagination">
                            <button
                                className="page-btn prev-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <FaArrowLeft className="me-2" /> Previous
                            </button>

                            <div className="page-numbers">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="page-btn next-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next <FaArrowRight className="ms-2" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Contact />
        </div>
    );
};

export default Blog;
