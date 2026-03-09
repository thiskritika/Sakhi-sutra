// src/components/Layout/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // Wishlist count - sample data
  const wishlistCount = 3; // Aap ise actual wishlist se bhi le sakte ho

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Custom Order', path: '/custom-order' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <span className="logo-icon">🧵</span>
            Sakhi Sutra
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>

          {/* Icons - Sirf Cart ko Wishlist se replace kiya */}
          <div className="nav-icons">
            <button className="icon-btn" onClick={() => navigate('/wishlist')}>
              ❤️
              {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
            </button>
            <button className="icon-btn" onClick={() => navigate('/account')}>
              👤
            </button>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Sirf Cart ko Wishlist se replace kiya */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-header">
            <button 
              className="close-menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <ul className="mobile-nav-links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                ❤️ Wishlist ({wishlistCount})
              </Link>
            </li>
            <li>
              <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                👤 My Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;