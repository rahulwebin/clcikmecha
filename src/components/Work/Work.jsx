import React from 'react';
import { Link } from 'react-router-dom';
import './Work.css';
import projectMadhusudan from '../../assets/work/project-madhusudan.png';
import projectNeelgagan from '../../assets/work/project-neelgagan.png';
import projectSindoor from '../../assets/work/project-sindoor.png';
import projectRpBuildtech from '../../assets/work/project-rpbuildtech.png';
import manIllustration from '../../assets/work/illustration-man.png';

const projects = [
    {
        id: 1,
        title: 'Madhusudan',
        image: projectMadhusudan,
        tag: 'DEVELOPMENT',
        description: 'A comprehensive web solution delivering improved user engagement and business growth through strategic design.',
        link: '#'
    },
    {
        id: 2,
        title: 'Neelgagan',
        image: projectNeelgagan,
        tag: 'DEVELOPMENT',
        description: 'Custom development project focused on scalability, performance, and delivering a seamless user experience.',
        link: '#'
    },
    {
        id: 3,
        title: 'Sindoor',
        image: projectSindoor,
        tag: 'DEVELOPMENT',
        description: 'Innovative digital platform designed to streamlined operations and enhance customer accessibility.',
        link: '#'
    },
    {
        id: 4,
        title: 'RP Buildtech',
        image: projectRpBuildtech,
        tag: 'DEVELOPMENT',
        description: 'Professional corporate website showcasing real estate portfolio with modern UI and robust architecture.',
        link: '#'
    }
];

const Work = ({ workShowcase }) => {
    // Fallback or empty if not provided
    // Use provided showcase or fallback to default projects
    const displayProjects = (workShowcase && workShowcase.length > 0) ? workShowcase : projects;

    if (!displayProjects || displayProjects.length === 0) return null;

    return (
        <section id="case-studies" className="work-section">
            <div className="container">
                <div className="row">

                    {/* Right Content */}
                    <div className="col-lg-12 col-md-12">
                        {/* Headline */}
                        <div className="work-header mb-5 d-flex align-items-start justify-content-between flex-wrap gap-3">
                            <span className="section-label">WORK SHOWCASE</span>
                            <h2 className="work-headline">
                                Our Philosophy is to build a <br className="d-none d-md-block" />
                                <span className="highlight-text">Product for greater good.</span>
                            </h2>
                        </div>

                        {/* Projects Grid */}
                        <div className="row g-4">
                            {displayProjects.map((project, index) => (
                                <div key={project.id || index} className="col-md-6 mb-4">
                                    <a
                                        href={project.link || project.project_url || project.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none d-block h-100"
                                    >
                                        <div className="project-card">
                                            <div className="project-image-wrapper">
                                                {/* <span className="project-tag">{project.category || 'DEVELOPMENT'}</span> */}
                                                <img src={project.image} alt={project.title} className="project-image" />
                                            </div>
                                            <div className="project-info mt-4">
                                                <h3 className="project-title">{project.title}</h3>
                                                <p className="project-desc">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
