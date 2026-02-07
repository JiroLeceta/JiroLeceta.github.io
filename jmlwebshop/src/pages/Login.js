import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        loginEmail: '',
        loginPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(formData.loginEmail, formData.loginPassword);
        
        if (result.success) {
            alert(result.message);
            navigate('/profile');
        } else {
            alert(result.message);
        }
    };

    return (
        <Layout>
            <h2>User Login</h2>

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    type="email" 
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    required 
                />

                <label>Password</label>
                <input 
                    type="password" 
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    required 
                />

                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account?{' '}
                <Link to="/signup">Create one</Link>
            </p>
        </Layout>
    );
};

export default Login;