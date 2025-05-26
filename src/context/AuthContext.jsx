import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      console.log("Checking auth, token exists:", !!token);

      if (token) {
        const response = await authService.getCurrentUser();
        console.log("Auth check successful:", response.data);
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        console.log("No token found, user not authenticated");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      console.log("Attempting login with credentials:", {
        email: credentials.email,
      });
      const response = await authService.login(credentials);
      console.log("Login response:", response.data);

      const { token, admin } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(admin);
        setIsAuthenticated(true);
        console.log("Login successful, user authenticated");
        return { success: true };
      } else {
        console.error("No token received in response");
        setError("No token received");
        return { success: false, error: "No token received" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
