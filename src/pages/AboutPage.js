// src/pages/AboutPage.js
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const founders = [
    { name: 'Khushi', role: 'Design & Craftsmanship', initial: 'K' },
    { name: 'Kritika', role: 'Artisan Empowerment', initial: 'K' },
    { name: 'Neha', role: 'Business & Community', initial: 'N' }
  ];

  const impactStats = [
    { number: '50+', label: 'Women Artisans Empowered' },
    { number: '1000+', label: 'Handmade Products Created' },
    { number: '₹25L+', label: 'Fair Wages Distributed' }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">Our Journey</h1>

        {/* Founders Section */}
        <div className="founders-section">
          <h2>Meet the Founders</h2>
          <div className="founders-grid">
            {founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <div className="founder-avatar">{founder.initial}</div>
                <h3>{founder.name}</h3>
                <p>{founder.role}</p>
              </div>
            ))}
          </div>
          <p className="founders-quote">
            "Three friends, one vision - to create a platform where traditional craftsmanship 
            meets modern design, empowering women artisans with every stitch."
          </p>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>At Sakhi Sutra, we're on a mission to:</p>
          <ul className="mission-list">
            <li>Preserve traditional Indian handicraft techniques</li>
            <li>Provide sustainable livelihoods for women artisans</li>
            <li>Bridge the gap between artisans and conscious consumers</li>
            <li>Promote handmade over mass-produced items</li>
            <li>Create a community that values craftsmanship and stories</li>
          </ul>
        </div>

        {/* Impact Section */}
        <div className="impact-section">
          <h2>Impact So Far</h2>
          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="impact-card">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Handmade Section */}
        <div className="why-handmade">
          <h2>Why Choose Handmade?</h2>
          <div className="handmade-grid">
            <div className="handmade-item">
              <h3>🎨 Unique & Authentic</h3>
              <p>Each piece is one-of-a-kind, carrying the artist's personal touch and story.</p>
            </div>
            <div className="handmade-item">
              <h3>🌱 Sustainable</h3>
              <p>Handmade products have a lower environmental footprint and support local communities.</p>
            </div>
            <div className="handmade-item">
              <h3>💪 Empowering</h3>
              <p>Your purchase directly supports women artisans and helps preserve traditional crafts.</p>
            </div>
            <div className="handmade-item">
              <h3>❤️ Made with Love</h3>
              <p>Every stitch, every bead is placed with care and passion by skilled hands.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;