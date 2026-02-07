import React, { useState } from 'react';
import Layout from '../components/Layout';

const Contact = () => {
    const [formData, setFormData] = useState({
        contactName: '',
        contactMessage: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.contactName && formData.contactMessage) {
            alert("Thank you for your message! We will get back to you soon.");
            setFormData({
                contactName: '',
                contactMessage: ''
            });
        }
    };

    return (
        <Layout>
            <h2>Contact Us</h2>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                    type="text" 
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                />

                <label>Message</label>
                <textarea 
                    name="contactMessage"
                    value={formData.contactMessage}
                    onChange={handleInputChange}
                    placeholder="Your message"
                ></textarea>

                <button type="submit">Send Message</button>
            </form>
        </Layout>
    );
};

export default Contact;