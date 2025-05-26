// src/App.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Routes from "./routes";

function App() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle redirects based on authentication state
  useEffect(() => {
    if (!loading) {
      // If not logged in and not on the login page, redirect to login
      if (!isAuthenticated && location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }

      // If logged in and on the login page, redirect to dashboard
      if (isAuthenticated && location.pathname === "/login") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  return <Routes />;
}

export default App;
