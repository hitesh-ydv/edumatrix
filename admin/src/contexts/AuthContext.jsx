import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      // Hardcoded admin credentials (replace with real auth in production)
      if (email === 'admin@example.com' && password === 'admin123') {
        const mockToken = 'mock-jwt-token-for-admin';
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setUser({ email, role: 'admin' });
        navigate('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      // In a real app, you would verify the token with your backend
      setUser({ email: 'admin@example.com', role: 'admin' });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);