import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to JL Tech Solutions!</h1>
                    <p className="hero-subtitle">Your trusted partner for innovative technology solutions</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="hero-btn primary">Browse Products</Link>
                        <Link to="/about" className="hero-btn secondary">Learn More</Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stat-card">
                    <i className="fas fa-users"></i>
                    <h3>500+</h3>
                    <p>Happy Clients</p>
                </div>
                <div className="stat-card">
                    <i className="fas fa-project-diagram"></i>
                    <h3>1000+</h3>
                    <p>Projects Completed</p>
                </div>
                <div className="stat-card">
                    <i className="fas fa-award"></i>
                    <h3>15+</h3>
                    <p>Years Experience</p>
                </div>
                <div className="stat-card">
                    <i className="fas fa-star"></i>
                    <h3>4.9/5</h3>
                    <p>Client Rating</p>
                </div>
            </section>

            {/* Featured Services */}
            <section className="services-section">
                <h2>Featured Tech Services</h2>
                <p className="section-subtitle">Comprehensive IT solutions tailored to your business needs</p>

                <div className="services">
                    <div className="service-card">
                        <div className="service-icon">
                            <i className="fas fa-code"></i>
                        </div>
                        <h3>Web Development</h3>
                        <p>Professional business websites with modern design and functionality</p>
                        <Link to="/products" className="service-link">Learn More →</Link>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">
                            <i className="fas fa-tools"></i>
                        </div>
                        <h3>IT Support</h3>
                        <p>24/7 system maintenance & troubleshooting for your peace of mind</p>
                        <Link to="/products" className="service-link">Learn More →</Link>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">
                            <i className="fas fa-cloud"></i>
                        </div>
                        <h3>Cloud Solutions</h3>
                        <p>Secure data storage and cloud services for modern businesses</p>
                        <Link to="/products" className="service-link">Learn More →</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-choose-section">
                <h2>Why Choose JL Tech Solutions?</h2>
                <div className="why-choose-grid">
                    <div className="why-item">
                        <i className="fas fa-badge-check"></i>
                        <h4>Quality Assurance</h4>
                        <p>We deliver top-notch solutions that exceed expectations</p>
                    </div>
                    <div className="why-item">
                        <i className="fas fa-headset"></i>
                        <h4>24/7 Support</h4>
                        <p>Round-the-clock assistance whenever you need us</p>
                    </div>
                    <div className="why-item">
                        <i className="fas fa-shield-alt"></i>
                        <h4>Secure & Reliable</h4>
                        <p>Your data security is our top priority</p>
                    </div>
                    <div className="why-item">
                        <i className="fas fa-dollar-sign"></i>
                        <h4>Competitive Pricing</h4>
                        <p>Quality services at affordable rates</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-home">
                <h2>Ready to Transform Your Business?</h2>
                <p>Get started with our innovative technology solutions today</p>
                <Link to="/contact" className="cta-btn">Contact Us Now</Link>
            </section>
        </Layout>
    );
};

export default Home;