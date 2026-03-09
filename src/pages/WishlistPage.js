// src/pages/WishlistPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = () => {
  const navigate = useNavigate();

  // Sample wishlist data (in real app, this would come from context/state)
  const [wishlist, setWishlist] = React.useState([
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
    }
  ]);

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  // WhatsApp Order Function
  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "919217544105"; // Sakhi Sutra WhatsApp number
    const message = `🛍️ *New Order Request from Wishlist*%0a%0a` +
      `*Product:* ${product.name}%0a` +
      `*Price:* ₹${product.price}%0a` +
      `*Description:* ${product.description}%0a%0a` +
      `I would like to order this product from my wishlist.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Share wishlist on WhatsApp
  const shareWishlist = () => {
    const phoneNumber = "919217544105";
    let message = `🎁 *My Wishlist from Sakhi Sutra*%0a%0a`;
    
    wishlist.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₹${item.price}%0a`;
    });
    
    message += `%0aI would like to order these items. Please help me with the details.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <h1 className="page-title">My Wishlist</h1>
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite handmade treasures here!</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Explore Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="page-title">My Wishlist</h1>
          <button className="btn-whatsapp-share" onClick={shareWishlist}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.346-.219.462-.219l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.232-.144.39-.086.159.058 1.003.473 1.175.559.172.086.287.13.332.202.043.072.043.418-.101.823z"/>
            </svg>
            Share Wishlist on WhatsApp
          </button>
        </div>
        
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-card">
              <button 
                className="remove-from-wishlist"
                onClick={() => removeFromWishlist(item.id)}
                title="Remove from wishlist"
              >
                ✕
              </button>
              
              <img src={item.image} alt={item.name} className="wishlist-img" />
              
              <div className="wishlist-info">
                <h3 className="wishlist-title">{item.name}</h3>
                <p className="wishlist-price">₹{item.price}</p>
                <p className="wishlist-description">{item.description}</p>
                
                <div className="wishlist-actions">
                  <button 
                    className="btn-whatsapp-order"
                    onClick={() => handleWhatsAppOrder(item)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.346-.219.462-.219l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.232-.144.39-.086.159.058 1.003.473 1.175.559.172.086.287.13.332.202.043.072.043.418-.101.823z"/>
                    </svg>
                    Order Now
                  </button>
                  
                  <button 
                    className="btn-view-details"
                    onClick={() => navigate('/shop')}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;