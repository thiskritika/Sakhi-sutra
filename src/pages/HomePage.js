// src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  const featuredProducts = [
    {
      id: 1,
      name: "Crochet Flower Keychain",
      price: 199,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
      description: "Cute handmade crochet flower keychain made with soft yarn"
    },
    {
      id: 2,
      name: "Crochet Teddy Bear",
      price: 499,
      image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=600&q=80",
      description: "Adorable handmade crochet teddy bear perfect for gifts"
    },
    {
      id: 3,
      name: "Crochet Heart Keychain",
      price: 179,
      image: "https://images.unsplash.com/photo-1616627457334-6f3c2c9d2b89?auto=format&fit=crop&w=600&q=80",
      description: "Handmade crochet heart keychain made with premium yarn"
    },
    {
      id: 4,
      name: "Crochet Sunflower",
      price: 249,
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80",
      description: "Beautiful crochet sunflower for decoration or gifting"
    },
    {
      id: 5,
      name: "Crochet Mini Bag",
      price: 599,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
      description: "Stylish handmade crochet mini bag for everyday use"
    },
    {
      id: 6,
      name: "Crochet Butterfly Keychain",
      price: 199,
      image: "https://images.unsplash.com/photo-1617957743096-3d8a0f6f2d14?auto=format&fit=crop&w=600&q=80",
      description: "Colorful crochet butterfly keychain made with love"
    }
  ];

  // WhatsApp Order Function
  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "919217544105"; // Sakhi Sutra WhatsApp number
    const message = `🛍️ *New Order Request*%0a%0a` +
      `*Product:* ${product.name}%0a` +
      `*Price:* ₹${product.price}%0a` +
      `*Description:* ${product.description}%0a%0a` +
      `I would like to order this product. Please provide more details.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Wishlist Functions
  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Handwoven Stories, Empowered Hands</h1>
          <p>Discover unique handmade creations by women artisans. Each piece tells a story of tradition, empowerment, and exquisite craftsmanship.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Shop Now
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/custom-order')}>
              Custom Order
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Handmade Creations</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                      View Details
                    </button>
                    
                    {/* Wishlist Button */}
                    <button 
                      className={`btn-wishlist ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                      onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      {isInWishlist(product.id) ? 'Added to Wishlist' : 'Add to Wishlist'}
                    </button>

                    {/* WhatsApp Order Button */}
                    <button 
                      className="btn-whatsapp-order" 
                      onClick={() => handleWhatsAppOrder(product)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.346-.219.462-.219l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.232-.144.39-.086.159.058 1.003.473 1.175.559.172.086.287.13.332.202.043.072.043.418-.101.823z"/>
                      </svg>
                      Order on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>Sakhi Sutra was founded by three passionate women - Khushi, Kritika, and Neha - who shared a vision to preserve traditional handicrafts while empowering women artisans.</p>
              <p>We bridge the gap between skilled artisans and conscious consumers, offering handmade products that carry the warmth of human touch and stories of empowerment.</p>
              <button className="btn btn-primary" onClick={() => navigate('/about')}>
                Learn More About Us
              </button>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Artisans at work" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Sakhi Sutra</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Custom Orders</h3>
              <p>Upload your design, choose fabrics, and create something truly unique with our artisans.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Handmade Excellence</h3>
              <p>Each piece is crafted with attention to detail, preserving traditional techniques.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👩‍🎨</div>
              <h3>Women Empowerment</h3>
              <p>Your purchase directly supports women artisans with fair wages and safe working conditions.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Wishlist & WhatsApp</h3>
              <p>Save your favorite items to wishlist and order directly on WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <a 
          href="https://wa.me/919217544105?text=Hi%20Sakhi%20Sutra%2C%20I%20would%20like%20to%20know%20more%20about%20your%20handmade%20products." 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.346-.219.462-.219l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.232-.144.39-.086.159.058 1.003.473 1.175.559.172.086.287.13.332.202.043.072.043.418-.101.823z"/>
          </svg>
          <span>Chat with us</span>
        </a>
      </div>
    </div>
  );
};

export default HomePage;