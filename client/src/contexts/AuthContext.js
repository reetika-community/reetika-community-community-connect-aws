import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    return storedUser && storedToken ? { user: JSON.parse(storedUser), token: storedToken } : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This useEffect is to handle initial loading of auth state,
    // which is already done by the useState initializer.
    // However, if you had asynchronous checks (e.g., validating token with API),
    // this is where you'd put them.
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setAuth({ user: userData, token });
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};