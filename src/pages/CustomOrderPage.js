// src/pages/CustomOrderPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomOrderPage.css';

const CustomOrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I want to discuss a custom order:\nName: ${formData.name}\nProduct: ${formData.productType}\nDescription: ${formData.description}`;
    window.open(`https://wa.me/919217544105?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="custom-order-page">
      <div className="container">
        <h1 className="page-title">Custom Order</h1>
        
        {submitted ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>Your custom order request has been submitted. We'll contact you within 24 hours.</p>
            <p>Redirecting to home page...</p>
          </div>
        ) : (
          <form className="custom-order-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Product Type</label>
              <select name="productType" value={formData.productType} onChange={handleChange}>
                <option value="">Select product type</option>
                <option value="clothing">Clothing</option>
                <option value="accessory">Accessory</option>
                <option value="home-decor">Home Decor</option>
                <option value="gift">Gift</option>
              </select>
            </div>

            <div className="form-group">
              <label>Design Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your design idea..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
              <button type="button" className="btn-whatsapp" onClick={handleWhatsApp}>
                📱 Discuss on WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomOrderPage;