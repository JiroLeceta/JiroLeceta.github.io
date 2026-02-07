import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { getItems, getSubtotal, saveOrder, clear } = useCart();
    
    const [deliveryOption, setDeliveryOption] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formData, setFormData] = useState({
        deliveryName: '',
        deliveryPhone: '',
        deliveryAddress: ''
    });

    const items = getItems();
    const subtotal = getSubtotal();
    
    const shippingCosts = { 
        standard: 100, 
        express: 250, 
        sameday: 500 
    };
    
    const shipping = shippingCosts[deliveryOption];
    const total = subtotal + shipping;

    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [items, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const orderData = {
            orderNumber: 'ORD-' + Date.now(),
            date: new Date().toLocaleString(),
            items: items,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            deliveryName: formData.deliveryName,
            deliveryPhone: formData.deliveryPhone,
            deliveryAddress: formData.deliveryAddress,
            deliveryOption: deliveryOption,
            paymentMethod: paymentMethod
        };

        saveOrder(orderData);
        clear();
        navigate('/confirmation');
    };

    return (
        <Layout>
            <h1>Checkout</h1>

            <div className="checkout-container">
                <div className="checkout-form">
                    <form onSubmit={handleSubmit}>
                        {/* Delivery Information */}
                        <section className="checkout-section">
                            <h2><i className="fas fa-shipping-fast"></i> Delivery Information</h2>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    name="deliveryName"
                                    value={formData.deliveryName}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="deliveryPhone"
                                    value={formData.deliveryPhone}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Delivery Address</label>
                                <textarea 
                                    name="deliveryAddress"
                                    value={formData.deliveryAddress}
                                    onChange={handleInputChange}
                                    rows="3" 
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Delivery Option</label>
                                <select 
                                    value={deliveryOption}
                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                >
                                    <option value="standard">Standard Delivery (3-5 days) - ₱100</option>
                                    <option value="express">Express Delivery (1-2 days) - ₱250</option>
                                    <option value="sameday">Same Day Delivery - ₱500</option>
                                </select>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="checkout-section">
                            <h2><i className="fas fa-credit-card"></i> Payment Method</h2>
                            <div className="payment-options">
                                <label className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="cod" 
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div className="payment-card">
                                        <i className="fas fa-money-bill-wave"></i>
                                        <span>Cash on Delivery</span>
                                    </div>
                                </label>
                                <label className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div className="payment-card">
                                        <i className="fas fa-credit-card"></i>
                                        <span>Credit/Debit Card</span>
                                    </div>
                                </label>
                                <label className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="gcash"
                                        checked={paymentMethod === 'gcash'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div className="payment-card">
                                        <i className="fas fa-mobile-alt"></i>
                                        <span>GCash</span>
                                    </div>
                                </label>
                                <label className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div className="payment-card">
                                        <i className="fas fa-university"></i>
                                        <span>Bank Transfer</span>
                                    </div>
                                </label>
                            </div>
                        </section>

                        <button type="submit" className="place-order-btn">
                            <i className="fas fa-check-circle"></i> Place Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="order-summary-sidebar">
                    <h2>Order Summary</h2>
                    <div>
                        {items.map(item => (
                            <div key={item.id} className="checkout-item">
                                <span className="item-icon">{item.image}</span>
                                <div className="item-info">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-qty">Qty: {item.quantity}</p>
                                </div>
                                <span className="item-price">₱{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-totals">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₱{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>₱{shipping.toLocaleString()}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₱{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;