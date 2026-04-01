// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    navigate('/account');
    return null;
  }

  const stats = [
    { label: 'Total Orders', value: user?.stats?.orders || 0, icon: '📦' },
    { label: 'Wishlist Items', value: user?.stats?.wishlist?.length || 0, icon: '❤️' },
    { label: 'Total Spent', value: `₹${user?.stats?.totalSpent || 0}`, icon: '💰' },
    { label: 'Member Since', value: new Date(user?.createdAt).getFullYear() || '2024', icon: '📅' }
  ];

  const recentOrders = [
    { id: 'ORD001', date: '2024-03-15', total: 1299, status: 'Delivered', items: 2 },
    { id: 'ORD002', date: '2024-03-10', total: 499, status: 'Processing', items: 1 },
    { id: 'ORD003', date: '2024-03-05', total: 899, status: 'Shipped', items: 3 }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={user?.avatar} alt={user?.name} />
              <button className="edit-avatar-btn">✎</button>
            </div>
            <div className="profile-info">
              <h1>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="profile-email">{user?.email}</p>
              <p className="profile-phone">{user?.phone || 'Add phone number'}</p>
              <div className="profile-badge">
                <span>✨ Handmade Lover</span>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-edit" onClick={() => navigate('/edit-profile')}>
                ✏️ Edit Profile
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="profile-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              📦 My Orders
            </button>
            <button 
              className={activeTab === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveTab('wishlist')}
            >
              ❤️ Wishlist
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="welcome-message">
                  <h3>Your Journey with Sakhi Sutra</h3>
                  <p>You've been a part of our community since {new Date(user?.createdAt).toLocaleDateString()}</p>
                  <div className="impact-badge">
                    🌸 You've helped empower women artisans!
                  </div>
                </div>

                <div className="recent-orders">
                  <h3>Recent Orders</h3>
                  <div className="orders-list">
                    {recentOrders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-info">
                          <span className="order-id">#{order.id}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className="order-details">
                          <span>{order.items} items</span>
                          <span className="order-total">₹{order.total}</span>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="view-all-btn">View All Orders</button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="orders-tab">
                <h3>All Orders</h3>
                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.date}</td>
                          <td>{order.items}</td>
                          <td>₹{order.total}</td>
                          <td>
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button className="track-btn">Track Order</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="wishlist-tab">
                <h3>Your Wishlist</h3>
                {user?.stats?.wishlist?.length === 0 ? (
                  <div className="empty-wishlist">
                    <div className="empty-icon">❤️</div>
                    <p>Your wishlist is empty</p>
                    <button className="shop-now-btn" onClick={() => navigate('/shop')}>
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {user?.stats?.wishlist?.map(item => (
                      <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>₹{item.price}</p>
                        <button className="move-to-cart">Add to Cart</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="settings-tab">
                <h3>Account Settings</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" defaultValue={user?.name} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user?.email} disabled />
                    <small>Email cannot be changed</small>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue={user?.phone || ''} placeholder="Add phone number" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea rows="3" placeholder="Add your shipping address"></textarea>
                  </div>
                  <button className="save-settings">Save Changes</button>
                </div>

                <div className="notification-settings">
                  <h4>Notification Preferences</h4>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> Email Order Updates
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> WhatsApp Order Updates
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" /> Newsletter & Offers
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;