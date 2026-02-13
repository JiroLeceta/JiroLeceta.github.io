import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

const Confirmation = () => {
    const navigate = useNavigate();
    const { getLastOrder } = useCart();
    
    const orderData = getLastOrder();

    useEffect(() => {
        if (!orderData) {
            alert('No order found. Please place an order first.');
            navigate('/');
        }
    }, [orderData, navigate]);

    if (!orderData) {
        return null;
    }

    const paymentLabels = {
        cod: 'Cash on Delivery',
        card: 'Credit/Debit Card',
        gcash: 'GCash',
        bank: 'Bank Transfer'
    };

    const deliveryLabels = {
        standard: 'Standard Delivery (3-5 days)',
        express: 'Express Delivery (1-2 days)',
        sameday: 'Same Day Delivery'
    };

    return (
        <Layout>
            <div className="confirmation-container">
                <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h1>Order Confirmed!</h1>
                <p className="confirmation-message">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>

                {/* E-Receipt */}
                <div className="receipt">
                    <div className="receipt-header">
                        <h2>E-Receipt</h2>
                        <div className="receipt-logo">
                            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="JL Tech Logo" />
                            <span>JL Tech Solutions</span>
                        </div>
                    </div>

                    <div className="receipt-info">
                        <div className="info-row">
                            <span className="label">Order Number:</span>
                            <span className="value">{orderData.orderNumber}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Date:</span>
                            <span className="value">{orderData.date}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Payment Method:</span>
                            <span className="value">{paymentLabels[orderData.paymentMethod]}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Delivery Option:</span>
                            <span className="value">{deliveryLabels[orderData.deliveryOption]}</span>
                        </div>
                    </div>

                    <div className="receipt-delivery">
                        <h3>Delivery Details</h3>
                        <p>{orderData.deliveryName}</p>
                        <p>{orderData.deliveryPhone}</p>
                        <p>{orderData.deliveryAddress}</p>
                    </div>

                    <div className="receipt-items">
                        <h3>Order Items</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.image} {item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>₱{item.price.toLocaleString()}</td>
                                        <td>₱{(item.price * item.quantity).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="receipt-totals">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>₱{orderData.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping:</span>
                            <span>₱{orderData.shipping.toLocaleString()}</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Total Amount:</span>
                            <span>₱{orderData.total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="receipt-footer">
                        <p>Thank you for supporting JL Tech Solutions!</p>
                        <p>For inquiries, contact us at jltech@email.com or 0912-345-6789</p>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <button onClick={() => window.print()} className="print-btn">
                        <i className="fas fa-print"></i> Print Receipt
                    </button>
                    <Link to="/products" className="continue-btn">Continue Shopping</Link>
                    <Link to="/" className="home-btn">Back to Home</Link>
                </div>
            </div>
        </Layout>
    );
};

export default Confirmation;