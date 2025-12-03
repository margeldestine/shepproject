import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
  }, []);

  const loginUser = (authData) => {
    console.log('loginUser received:', authData); // DEBUG
    setUser(authData);
    localStorage.setItem('user', JSON.stringify(authData));
    
    // CRITICAL: Handle multiple possible field names
    const userIdValue = authData.userId || authData.user_id || authData.id;
    console.log('Extracted userId:', userIdValue); // DEBUG
    
    if (userIdValue) {
      localStorage.setItem('userId', userIdValue.toString());
      console.log('Saved to localStorage:', userIdValue.toString()); // DEBUG
    } else {
      console.error('No userId found in authData:', authData);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedRole');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};