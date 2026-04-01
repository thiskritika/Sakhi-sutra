// src/pages/AccountPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AccountPage.css';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [activeAccordion, setActiveAccordion] = useState('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  const { signup, login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to profile
  if (isAuthenticated) {
    navigate('/profile');
    return null;
  }

  // Accordion toggle function
  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 3) {
        newErrors.name = 'Name must be at least 3 characters';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Enter valid 10-digit phone number';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
      if (result.success) {
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/profile'), 1500);
      }
    } else {
      result = await signup(formData);
      if (result.success) {
        setSuccessMessage(`Account created successfully! Welcome ${formData.name}! Redirecting...`);
        setTimeout(() => navigate('/profile'), 1500);
      }
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    alert('Google Sign In coming soon!');
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    setActiveAccordion('forgot');
  };

  // Handle Reset Password Submit
  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setActiveAccordion('login');
      setResetEmail('');
    }, 3000);
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-container">
          {/* Left Side - Brand Info */}
          <div className="account-info">
            <div className="info-content">
              <div className="brand-icon">🧵</div>
              <h2>Sakhi Sutra</h2>
              <p className="brand-tagline">Handwoven Stories, Empowered Hands</p>
              
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">❤️</span>
                  <span>Save your favorite items to wishlist</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📦</span>
                  <span>Track your orders in real-time</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💬</span>
                  <span>Direct WhatsApp ordering</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎨</span>
                  <span>Request custom designs</span>
                </div>
              </div>

              <div className="testimonial">
                <p>"Sakhi Sutra's handmade products are amazing! The quality and craftsmanship are outstanding."</p>
                <div className="testimonial-author">- Priya Sharma</div>
              </div>
            </div>
          </div>

          {/* Right Side - Accordion Form */}
          <div className="account-form-container">
            <div className="form-header">
              <h2>Account Access</h2>
              <p>Choose an option to continue</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="success-message">
                <span className="success-icon">✓</span>
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="error-message-global">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {/* Accordion Container */}
            <div className="accordion-container">
              
              {/* Login Accordion */}
              <div className="accordion-item">
                <div 
                  className={`accordion-header ${activeAccordion === 'login' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('login')}
                >
                  <span className="accordion-icon">🔐</span>
                  <span className="accordion-title">Login to Existing Account</span>
                  <span className="accordion-arrow">{activeAccordion === 'login' ? '▼' : '▶'}</span>
                </div>
                
                {activeAccordion === 'login' && (
                  <div className="accordion-content">
                    <form onSubmit={handleSubmit} className="account-form">
                      {/* Email Field */}
                      <div className="form-group">
                        <label>Email Address <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">✉️</span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                          />
                        </div>
                        {errors.email && <span className="error-message">{errors.email}</span>}
                      </div>

                      {/* Password Field */}
                      <div className="form-group">
                        <label>Password <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">🔒</span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.password ? 'error' : ''}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="form-options">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <span>Remember me</span>
                        </label>
                        <button 
                          type="button" 
                          className="forgot-password"
                          onClick={handleForgotPassword}
                        >
                          Forgot Password?
                        </button>
                      </div>

                      {/* Submit Button */}
                      <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="spinner"></span>
                            Logging in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Sign Up Accordion */}
              <div className="accordion-item">
                <div 
                  className={`accordion-header ${activeAccordion === 'signup' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('signup')}
                >
                  <span className="accordion-icon">📝</span>
                  <span className="accordion-title">Create New Account</span>
                  <span className="accordion-arrow">{activeAccordion === 'signup' ? '▼' : '▶'}</span>
                </div>
                
                {activeAccordion === 'signup' && (
                  <div className="accordion-content">
                    <form onSubmit={handleSubmit} className="account-form">
                      {/* Name Field */}
                      <div className="form-group">
                        <label>Full Name <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">👤</span>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                          />
                        </div>
                        {errors.name && <span className="error-message">{errors.name}</span>}
                      </div>

                      {/* Email Field */}
                      <div className="form-group">
                        <label>Email Address <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">✉️</span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                          />
                        </div>
                        {errors.email && <span className="error-message">{errors.email}</span>}
                      </div>

                      {/* Phone Field */}
                      <div className="form-group">
                        <label>Phone Number <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">📱</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            className={errors.phone ? 'error' : ''}
                          />
                        </div>
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                      </div>

                      {/* Password Field */}
                      <div className="form-group">
                        <label>Password <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">🔒</span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className={errors.password ? 'error' : ''}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                      </div>

                      {/* Confirm Password */}
                      <div className="form-group">
                        <label>Confirm Password <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <span className="input-icon">🔒</span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            className={errors.confirmPassword ? 'error' : ''}
                          />
                        </div>
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                      </div>

                      {/* Submit Button */}
                      <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="spinner"></span>
                            Creating account...
                          </>
                        ) : (
                          'Sign Up'
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Forgot Password Accordion */}
              <div className="accordion-item">
                <div 
                  className={`accordion-header ${activeAccordion === 'forgot' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('forgot')}
                >
                  <span className="accordion-icon">❓</span>
                  <span className="accordion-title">Forgot Password?</span>
                  <span className="accordion-arrow">{activeAccordion === 'forgot' ? '▼' : '▶'}</span>
                </div>
                
                {activeAccordion === 'forgot' && (
                  <div className="accordion-content">
                    {resetSent ? (
                      <div className="reset-success">
                        <div className="success-icon">✓</div>
                        <h3>Reset Link Sent!</h3>
                        <p>Check your email for password reset instructions.</p>
                        <button 
                          className="back-to-login"
                          onClick={() => {
                            setActiveAccordion('login');
                            setResetSent(false);
                            setResetEmail('');
                          }}
                        >
                          Back to Login
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleResetSubmit} className="account-form">
                        <p className="forgot-instruction">
                          Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <div className="form-group">
                          <label>Email Address <span className="required">*</span></label>
                          <div className="input-wrapper">
                            <span className="input-icon">✉️</span>
                            <input
                              type="email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              placeholder="Enter your registered email"
                              required
                            />
                          </div>
                        </div>

                        <button type="submit" className="submit-btn">
                          Send Reset Link
                        </button>

                        <button 
                          type="button"
                          className="back-to-login"
                          onClick={() => setActiveAccordion('login')}
                        >
                          ← Back to Login
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Benefits Accordion */}
              <div className="accordion-item">
                <div 
                  className={`accordion-header ${activeAccordion === 'benefits' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('benefits')}
                >
                  <span className="accordion-icon">🎁</span>
                  <span className="accordion-title">Why Create an Account?</span>
                  <span className="accordion-arrow">{activeAccordion === 'benefits' ? '▼' : '▶'}</span>
                </div>
                
                {activeAccordion === 'benefits' && (
                  <div className="accordion-content">
                    <div className="benefits-grid">
                      <div className="benefit-card">
                        <div className="benefit-icon">❤️</div>
                        <h4>Save Wishlist</h4>
                        <p>Save your favorite items and access them from any device</p>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">⚡</div>
                        <h4>Faster Checkout</h4>
                        <p>Save your details for quick and easy ordering</p>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">📦</div>
                        <h4>Order Tracking</h4>
                        <p>Track all your orders in one place with real-time updates</p>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">🎉</div>
                        <h4>Exclusive Offers</h4>
                        <p>Get access to member-only discounts and early sales</p>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">💬</div>
                        <h4>WhatsApp Updates</h4>
                        <p>Receive order updates directly on WhatsApp</p>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">🎨</div>
                        <h4>Custom Orders</h4>
                        <p>Save your custom design preferences for future orders</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Google Sign In */}
            <div className="divider">
              <span>OR</span>
            </div>

            <button 
              type="button" 
              className="google-btn"
              onClick={handleGoogleSignIn}
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="google-icon"
              />
              Continue with Google
            </button>

            {/* Terms & Privacy */}
            <p className="terms-text">
              By continuing, you agree to our{' '}
              <a href="/terms">Terms of Service</a> and{' '}
              <a href="/privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;