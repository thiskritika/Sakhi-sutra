// src/pages/ShopPage.js
import React, { useState } from 'react';
import './ShopPage.css';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(10000);

  const products = [
    {
      id: 1,
      name: "Crochet Flower Keychain",
      category: "keychain",
      price: 199,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
      description: "Cute handmade crochet flower keychain made with soft yarn"
    },
    {
      id: 2,
      name: "Crochet Teddy Bear",
      category: "toy",
      price: 499,
      image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=600&q=80",
      description: "Adorable handmade crochet teddy bear perfect for gifts"
    },
    {
      id: 3,
      name: "Crochet Heart Keychain",
      category: "keychain",
      price: 179,
      image: "https://images.unsplash.com/photo-1616627457334-6f3c2c9d2b89?auto=format&fit=crop&w=600&q=80",
      description: "Handmade crochet heart keychain made with premium yarn"
    },
    {
      id: 4,
      name: "Crochet Sunflower",
      category: "flower",
      price: 249,
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80",
      description: "Beautiful crochet sunflower for decoration or gifting"
    }
  ];

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  // WhatsApp Order Function
  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "919876543210"; // Sakhi Sutra WhatsApp number
    const message = `🛍️ *New Order Request*%0a%0a` +
      `*Product:* ${product.name}%0a` +
      `*Category:* ${product.category}%0a` +
      `*Price:* ₹${product.price}%0a` +
      `*Description:* ${product.description}%0a%0a` +
      `I would like to order this product. Please provide more details about:${product.name}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="shop-page">
      <div className="container">
        <h1 className="page-title">Our Collection</h1>

        <div className="shop-layout">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <h3>Filters</h3>

            <div className="filter-section">
              <h4>Category</h4>
              {categories.map(category => (
                <label key={category} className="category-label">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span className="category-name">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-range"
              />
              <div className="price-display">
                <span>₹0</span>
                <span>₹{priceRange}</span>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange(10000);
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* Products Section */}
          <div className="products-section">
            <p className="results-count">{filteredProducts.length} products found</p>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>
                    <p className="product-description">{product.description}</p>
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
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-results">
                <p>No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;