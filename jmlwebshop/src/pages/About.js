import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="about-hero">
                <h1>About JL Tech Solutions</h1>
                <p className="hero-subtitle">Empowering businesses through innovative technology solutions</p>
            </section>

            {/* Company Overview */}
            <section className="about-section">
                <div className="section-icon">
                    <i className="fas fa-building"></i>
                </div>
                <h2>Our Company</h2>
                <p>
                    JL Tech Solutions is a technology-driven business dedicated to providing
                    modern IT services that help small and medium enterprises thrive in the digital age.
                    We specialize in web development, system support, and comprehensive digital solutions
                    tailored to meet the unique needs of each client.
                </p>
                <p>
                    Founded with a vision to bridge the technology gap for growing businesses,
                    we combine technical expertise with a deep understanding of business operations
                    to deliver solutions that drive real results.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="mission-vision">
                <div className="mv-card">
                    <div className="mv-icon">
                        <i className="fas fa-bullseye"></i>
                    </div>
                    <h3>Our Mission</h3>
                    <p>
                        To deliver cutting-edge technology solutions that empower businesses
                        to achieve their goals, streamline operations, and stay competitive
                        in an ever-evolving digital landscape.
                    </p>
                </div>
                <div className="mv-card">
                    <div className="mv-icon">
                        <i className="fas fa-eye"></i>
                    </div>
                    <h3>Our Vision</h3>
                    <p>
                        To become the trusted technology partner for businesses across the region,
                        known for innovation, reliability, and exceptional service that transforms
                        the way companies leverage technology.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="about-section">
                <h2>Our Core Values</h2>
                <div className="values-grid">
                    <div className="value-item">
                        <i className="fas fa-star"></i>
                        <h4>Excellence</h4>
                        <p>We strive for excellence in every project, ensuring quality and precision</p>
                    </div>
                    <div className="value-item">
                        <i className="fas fa-lightbulb"></i>
                        <h4>Innovation</h4>
                        <p>We embrace new technologies and creative solutions to solve complex problems</p>
                    </div>
                    <div className="value-item">
                        <i className="fas fa-handshake"></i>
                        <h4>Integrity</h4>
                        <p>We build trust through transparency, honesty, and ethical business practices</p>
                    </div>
                    <div className="value-item">
                        <i className="fas fa-users"></i>
                        <h4>Collaboration</h4>
                        <p>We work closely with clients as partners to achieve shared success</p>
                    </div>
                </div>
            </section>

            {/* Owner Profile */}
            <section className="owner-profile">
                <h2>Meet the Founder</h2>
                <div className="owner-card">
                    <div className="owner-image">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="owner-info">
                        <h3>Jiro Leceta</h3>
                        <p className="owner-title">Founder & IT Developer</p>
                        <p className="owner-bio">
                            An IT student with a passion for web development, networking,
                            and business technology solutions. Jiro founded JL Tech Solutions
                            with a commitment to helping businesses leverage technology for growth
                            and efficiency. With expertise in modern web technologies and a keen
                            understanding of business needs, Jiro leads the company's mission to
                            deliver innovative solutions that make a real difference.
                        </p>
                        <div className="owner-specialties">
                            <span><i className="fas fa-code"></i> Web Development</span>
                            <span><i className="fas fa-network-wired"></i> Networking</span>
                            <span><i className="fas fa-cogs"></i> System Integration</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="about-section why-choose">
                <h2>Why Choose JL Tech Solutions?</h2>
                <div className="features-grid">
                    <div className="feature-box">
                        <i className="fas fa-rocket"></i>
                        <h4>Fast Delivery</h4>
                        <p>Quick turnaround times without compromising quality</p>
                    </div>
                    <div className="feature-box">
                        <i className="fas fa-shield-alt"></i>
                        <h4>Reliable Support</h4>
                        <p>24/7 technical support to keep your systems running smoothly</p>
                    </div>
                    <div className="feature-box">
                        <i className="fas fa-dollar-sign"></i>
                        <h4>Affordable Pricing</h4>
                        <p>Competitive rates tailored to your budget</p>
                    </div>
                    <div className="feature-box">
                        <i className="fas fa-chart-line"></i>
                        <h4>Scalable Solutions</h4>
                        <p>Technology that grows with your business</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to Transform Your Business?</h2>
                <p>Let's discuss how we can help you achieve your technology goals</p>
                <Link to="/contact" className="cta-button">Get in Touch</Link>
            </section>
        </Layout>
    );
};

export default About;