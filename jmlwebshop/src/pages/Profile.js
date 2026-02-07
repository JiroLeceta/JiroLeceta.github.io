import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            alert("Please login first");
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        alert("You have been logged out");
        navigate('/login');
    };

    const now = new Date();

    return (
        <Layout>
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="profile-welcome">
                        <h1>Welcome back, <span>{user.firstName}</span>!</h1>
                        <p className="profile-subtitle">Manage your account and view your information</p>
                    </div>
                </div>

                {/* Profile Cards Grid */}
                <div className="profile-grid">
                    {/* Personal Information Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2><i className="fas fa-id-card"></i> Personal Information</h2>
                        </div>
                        <div className="card-body">
                            <div className="info-row">
                                <span className="info-label">Full Name:</span>
                                <span className="info-value">{user.firstName} {user.lastName}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Email Address:</span>
                                <span className="info-value">{user.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Mobile Number:</span>
                                <span className="info-value">{user.mobile}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Home Address:</span>
                                <span className="info-value">{user.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Account Activity Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2><i className="fas fa-history"></i> Account Activity</h2>
                        </div>
                        <div className="card-body">
                            <div className="activity-item">
                                <i className="fas fa-sign-in-alt"></i>
                                <div>
                                    <p className="activity-title">Last Login</p>
                                    <p className="activity-time">{now.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <i className="fas fa-calendar-alt"></i>
                                <div>
                                    <p className="activity-title">Member Since</p>
                                    <p className="activity-time">{now.toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <i className="fas fa-shopping-cart"></i>
                                <div>
                                    <p className="activity-title">Total Orders</p>
                                    <p className="activity-time">0 orders</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2><i className="fas fa-bolt"></i> Quick Actions</h2>
                        </div>
                        <div className="card-body">
                            <Link to="/products" className="quick-action-btn">
                                <i className="fas fa-shopping-bag"></i>
                                <span>Browse Products</span>
                            </Link>
                            <Link to="/cart" className="quick-action-btn">
                                <i className="fas fa-shopping-cart"></i>
                                <span>View Cart</span>
                            </Link>
                            <Link to="/contact" className="quick-action-btn">
                                <i className="fas fa-envelope"></i>
                                <span>Contact Support</span>
                            </Link>
                            <button onClick={handleLogout} className="quick-action-btn logout-btn">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2><i className="fas fa-shield-alt"></i> Account Security</h2>
                        </div>
                        <div className="card-body">
                            <div className="security-item">
                                <i className="fas fa-check-circle security-check"></i>
                                <div>
                                    <p className="security-title">Email Verified</p>
                                    <p className="security-desc">Your email is verified</p>
                                </div>
                            </div>
                            <div className="security-item">
                                <i className="fas fa-check-circle security-check"></i>
                                <div>
                                    <p className="security-title">Password Protected</p>
                                    <p className="security-desc">Your account is secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;