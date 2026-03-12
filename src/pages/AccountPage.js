// src/pages/AccountPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
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
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      // Sign Up validation
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

    // Common validation
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (isLogin) {
        // Login success
        alert('Login successful! Welcome back.');
        navigate('/');
      } else {
        // Sign up success
        alert('Account created successfully! Please login.');
        setIsLogin(true); // Switch to login form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: ''
        });
      }
    }, 1500);
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    alert('Google Sign In coming soon!');
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    alert('Password reset link will be sent to your email!');
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

          {/* Right Side - Form */}
          <div className="account-form-container">
            <div className="form-header">
              <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
              <p>{isLogin ? 'Please login to your account' : 'Join our community of handmade lovers'}</p>
            </div>

            {/* Toggle Buttons */}
            <div className="toggle-buttons">
              <button 
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="account-form">
              {!isLogin && (
                <>
                  {/* Name Field - Sign Up only */}
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">👤</span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={errors.name ? 'error' : ''}
                      />
                    </div>
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  {/* Phone Field - Sign Up only */}
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📱</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={errors.phone ? 'error' : ''}
                      />
                    </div>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </>
              )}

              {/* Email Field - Common */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Password Field - Common */}
              <div className="form-group">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
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

              {!isLogin && (
                <>
                  {/* Confirm Password - Sign Up only */}
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirm Password <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                    </div>
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                </>
              )}

              {/* Remember Me & Forgot Password - Login only */}
              {isLogin && (
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
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Login' : 'Sign Up'
                )}
              </button>

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
                {isLogin ? 'Login with Google' : 'Sign up with Google'}
              </button>
            </form>

            {/* Terms & Privacy */}
            <p className="terms-text">
              By {isLogin ? 'logging in' : 'signing up'}, you agree to our{' '}
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