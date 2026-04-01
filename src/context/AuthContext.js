// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const storedUser = localStorage.getItem('sakhiUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('sakhiUser');
      }
    }
    setIsLoading(false);
  };

  // Sign Up Function
  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('sakhiUsers') || '[]');
      const emailExists = existingUsers.some(u => u.email === userData.email);

      if (emailExists) {
        throw new Error('Email already registered. Please login instead.');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // In real app, hash this!
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=8B4513&color=fff`,
        stats: {
          orders: 0,
          wishlist: [],
          totalSpent: 0
        }
      };

      // Save to localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('sakhiUsers', JSON.stringify(updatedUsers));
      
      // Auto login after signup
      localStorage.setItem('sakhiUser', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Login Function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const users = JSON.parse(localStorage.getItem('sakhiUsers') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Don't store password in session
      const { password: _, ...userWithoutPassword } = foundUser;
      
      localStorage.setItem('sakhiUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsAuthenticated(true);

      return { success: true, user: userWithoutPassword };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('sakhiUser');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Update Profile Function
  const updateProfile = async (updatedData) => {
    setIsLoading(true);
    
    try {
      // Update in users array
      const users = JSON.parse(localStorage.getItem('sakhiUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...updatedData };
        users[userIndex] = updatedUser;
        localStorage.setItem('sakhiUsers', JSON.stringify(users));
        
        // Update current session
        const { password: _, ...userWithoutPassword } = updatedUser;
        localStorage.setItem('sakhiUser', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
      }
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    if (!user) return;
    
    const updatedWishlist = [...(user.stats?.wishlist || []), product];
    updateUserStats({ wishlist: updatedWishlist });
  };

  // Remove from Wishlist
  const removeFromWishlist = (productId) => {
    if (!user) return;
    
    const updatedWishlist = (user.stats?.wishlist || []).filter(p => p.id !== productId);
    updateUserStats({ wishlist: updatedWishlist });
  };

  // Update User Stats
  const updateUserStats = (stats) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      stats: { ...user.stats, ...stats }
    };
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('sakhiUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], stats: updatedUser.stats };
      localStorage.setItem('sakhiUsers', JSON.stringify(users));
    }
    
    // Update current session
    localStorage.setItem('sakhiUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    signup,
    login,
    logout,
    updateProfile,
    addToWishlist,
    removeFromWishlist,
    updateUserStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};