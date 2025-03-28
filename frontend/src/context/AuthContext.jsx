
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "../hooks/use-toast";
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          api.setToken(token);
          const userData = await api.getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.login(email, password);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      return response.user;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await api.register(userData);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      toast({
        title: "Registration successful",
        description: `Welcome, ${response.user.name}!`,
      });
      return response.user;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const updatedUser = await api.updateProfile(userData);
      setUser(updatedUser);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      return updatedUser;
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast({
        variant: "destructive",
        title: "Update failed",
        description: message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    api.clearToken();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
