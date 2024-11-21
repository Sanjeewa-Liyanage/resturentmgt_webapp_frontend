import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if token exists and validate user on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");

    // If token exists, validate it and set user
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user); // Successfully set the user
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("token"); // Clear invalid token
          setUser(null); // Clear user data
          setError("Failed to authenticate. Please log in again.");
        })
        .finally(() => setLoading(false)); // End loading state
    } else {
      setLoading(false); // No token, user is not authenticated
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { email, password }
      );
      const { token, user } = response.data;

      // Save token to localStorage and set user
      localStorage.setItem("token", token);
      setUser(user);

      return user; // Return user data
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user data
    setError(null); // Clear error state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
