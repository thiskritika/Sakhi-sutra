// src/components/Layout/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from "../../Assets/image/WhatsApp_Image_2026-03-31_at_4.16.19_PM-removebg-preview.png";
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // Wishlist count - sample data
  const wishlistCount = 3; // Aap ise actual wishlist se bhi le sakte ho

  // Authentication state (sample - aap context se bhi le sakte ho)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change to true for logged in state

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Custom Order', path: '/custom-order' },
    { name: 'About Us', path: '/about' },
  ];

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add logout logic here
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          {/* Logo with Image - Replace the path with your actual logo image */}
          <Link to="/" className="logo">
            <img 
              src={Image}  // ← Change this path to your actual logo image
              alt="Sakhi Sutra" 
              className="logo-image"
            />
            {/* Optional: If you want to keep text as fallback or hide it */}
            {/* <span className="logo-text">Sakhi Sutra</span> */}
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>

          {/* Icons - With Sign In/Account */}
          <div className="nav-icons">
            {/* Wishlist Icon */}
            <button className="icon-btn" onClick={() => navigate('/wishlist')}>
              ❤️
              {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
            </button>
            
            {/* Sign In / Account Button */}
            {isLoggedIn ? (
              <div className="user-menu">
                <button className="icon-btn user-btn" onClick={() => navigate('/account')}>
                  👤
                  <span className="user-name">Hi, User</span>
                </button>
                <div className="user-dropdown">
                  <Link to="/account">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/wishlist">My Wishlist</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <button className="btn-signin-header" onClick={() => navigate('/account')}>
                👤 Sign In
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
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
            
            {/* Mobile Sign In/Account Links */}
            {isLoggedIn ? (
              <>
                <li className="mobile-user-greeting">👋 Hello, User!</li>
                <li>
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                    👤 My Account
                  </Link>
                </li>
                <li>
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                    📦 My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                    ❤️ Wishlist ({wishlistCount})
                  </Link>
                </li>
                <li>
                  <button 
                    className="mobile-logout-btn"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="mobile-signin-btn">
                    👤 Sign In / Register
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                    ❤️ Wishlist ({wishlistCount})
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;