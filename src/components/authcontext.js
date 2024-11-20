import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if token exists and validate user on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/users/getUser", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data.user);
                })
                .catch(() => {
                    localStorage.removeItem("token"); // Clear invalid token
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false); // No token, user is not authenticated
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
                email,
                password,
            });
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            setUser(user);

            return user; // Return user data for further actions
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
