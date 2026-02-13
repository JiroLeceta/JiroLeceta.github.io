import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { getItemCount } = useCart();
    const { isLoggedIn } = useAuth();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="page">
            {/* Menu Toggle Checkbox */}
            <input 
                type="checkbox" 
                id="menu-toggle" 
                checked={menuOpen}
                onChange={toggleMenu}
            />

            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <label htmlFor="menu-toggle" className="menu-btn">☰</label>
                    <Link to="/" className="brand">
                      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="JL Tech Logo" />
                        <span>JL TECH SOLUTIONS</span>
                    </Link>
                </div>

                <div className="header-right">
                    <Link to="/cart" title="Shopping Cart" className="cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="cart-badge" id="cartBadge">{getItemCount()}</span>
                    </Link>
                    <Link to="/products" title="Products">
                        <i className="fas fa-shopping-bag"></i>
                    </Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"} title={isLoggedIn ? "Profile" : "Login"}>
                        <i className="fas fa-user"></i>
                    </Link>
                </div>
            </header>

            {/* Side Navigation */}
            <nav className="side-nav">
                <label htmlFor="menu-toggle" className="close-btn" onClick={closeMenu}>← Back</label>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/products" onClick={closeMenu}>Products</Link>
                <Link to="/cart" onClick={closeMenu}>Shopping Cart</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
                {!isLoggedIn ? (
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                ) : (
                    <Link to="/profile" onClick={closeMenu}>Profile</Link>
                )}
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="JL Tech Logo" />
                        <span>JL Tech Solutions</span>
                    </div>
                    <div className="footer-info">
                        <p>© 2026 JL Tech Solutions</p>
                        <p>Email: jltech@email.com | Phone: 0912-345-6789</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;