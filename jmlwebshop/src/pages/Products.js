import React, { useState } from 'react';
import Layout from '../components/Layout';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Products = () => {
    const [filterCategory, setFilterCategory] = useState('all');
    const [notification, setNotification] = useState(null);
    const { addItem } = useCart();

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const handleAddToCart = (product) => {
        addItem(product, 1);
        showNotification(`${product.name} added to cart!`);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    const filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(p => p.category === filterCategory);

    return (
        <Layout>
            <h1>Our Products</h1>
            <p className="subtitle">Premium tech products and services for your business</p>

            <div className="filter-section">
                <label htmlFor="categoryFilter">Filter by Category:</label>
                <select 
                    id="categoryFilter" 
                    value={filterCategory}
                    onChange={handleFilterChange}
                >
                    <option value="all">All Products</option>
                    <option value="services">Services</option>
                    <option value="software">Software</option>
                    <option value="hardware">Hardware</option>
                </select>
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-icon">{product.image}</div>
                        <h3>{product.name}</h3>
                        <p className="product-category">{product.category.toUpperCase()}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">₱{product.price.toLocaleString()}</p>
                        <button 
                            onClick={() => handleAddToCart(product)} 
                            className="add-to-cart-btn"
                        >
                            <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Notification */}
            {notification && (
                <div className="notification show">
                    {notification}
                </div>
            )}
        </Layout>
    );
};

export default Products;