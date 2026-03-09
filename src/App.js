// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CustomOrderPage from './pages/CustomOrderPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage'; // ✅ Changed from CartPage to WishlistPage
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/custom-order" element={<CustomOrderPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/wishlist" element={<WishlistPage />} /> {/* ✅ Changed from /cart to /wishlist */}
              </Routes>
            </main>
            <Footer />
          </div>
        
      </AuthProvider>
    </Router>
  );
}

export default App;