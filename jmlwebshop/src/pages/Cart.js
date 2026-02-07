import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { getItems, updateQuantity, removeItem, getSubtotal } = useCart();
    
    const items = getItems();
    const subtotal = getSubtotal();
    const shipping = subtotal > 0 ? 100 : 0;
    const total = subtotal + shipping;

    const handleUpdateQuantity = (productId, quantity) => {
        updateQuantity(productId, quantity);
    };

    const handleRemoveItem = (productId) => {
        removeItem(productId);
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        navigate('/checkout');
    };

    return (
        <Layout>
            <h1>Shopping Cart</h1>

            <div className="cart-container">
                <div className="cart-items">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <i className="fas fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <Link to="/products" className="continue-shopping">Start Shopping</Link>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-icon">{item.image}</div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-category">{item.category.toUpperCase()}</p>
                                    <p className="item-price">₱{item.price.toLocaleString()}</p>
                                </div>
                                <div className="item-quantity">
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <div className="item-total">
                                    <p>₱{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
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
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                    <Link to="/products" className="continue-shopping">Continue Shopping</Link>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;