// src/components/Layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Sakhi Sutra</h3>
            <p>Handcrafted with love and purpose. Empowering women artisans one stitch at a time.</p>
            <div className="social-links">
              <a href="/" className="social-link">📷</a>
              <a href="/" className="social-link">📘</a>
              <a href="/" className="social-link">💬</a>
              <a href="/" className="social-link">📌</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop All</Link></li>
              <li><Link to="/custom-order">Custom Orders</Link></li>
              <li><Link to="/order-tracking">Track Order</Link></li>
              <li><Link to="/about">Our Story</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Customer Service</h3>
            <ul className="footer-links">
              <li><Link to="/order-tracking">Order Tracking</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/returns">Returns & Exchange</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Contact Info</h3>
            <ul className="footer-links">
              <li>📧 hello@sakhisutra.com</li>
              <li>📞 +91 98765 43210</li>
              <li>💬 WhatsApp: +91 98765 43210</li>
              <li>📍 Artisan Village, India</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Sakhi Sutra. All rights reserved. | Handmade with ❤️ by women artisans</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;