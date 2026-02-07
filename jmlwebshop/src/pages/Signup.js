import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        address: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile,
            address: formData.address
        };

        const success = signup(user);
        if (success) {
            alert("Sign up successful! Please login.");
            navigate('/login');
        } else {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Layout>
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                />

                <label>Last Name</label>
                <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                />

                <label>Email</label>
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                />

                <label>Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                />

                <label>Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required 
                />

                <label>Mobile Number</label>
                <input 
                    type="tel" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required 
                />

                <label>Home Address</label>
                <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <button type="submit">Register</button>
            </form>

            <p style={{ marginTop: '1.2rem', textAlign: 'center' }}>
                Already have an account?{' '}
                <Link to="/login" className="back-login-link">Go back to Login</Link>
            </p>
        </Layout>
    );
};

export default Signup;