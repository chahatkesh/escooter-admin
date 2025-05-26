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

      if (!token) {
        console.log("No token found, user not authenticated");
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      // Trim the token to ensure no whitespace issues
      const cleanToken = token.trim();
      localStorage.setItem("token", cleanToken);

      console.log("Making getCurrentUser request with token");
      const response = await authService.getCurrentUser();
      console.log("getCurrentUser response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.data) {
        console.log("User data received, setting authenticated state");
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        console.log("No user data in response, clearing token");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        headers: error.response?.headers,
      });

      // Only remove token if it's an auth error
      if (error.response?.status === 401) {
        console.log("401 error received, removing token");
        localStorage.removeItem("token");
      }
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
      console.log("Login response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      const { token, admin } = response.data;

      if (token) {
        console.log("Token received, storing in localStorage");
        // Token is already stored by the API service
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
      console.error("Login failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        headers: error.response?.headers,
      });
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
