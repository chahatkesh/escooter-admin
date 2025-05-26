// src/routes/index.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Scooters from "../pages/Scooters";
import Bookings from "../pages/Bookings";
import Layout from "../components/layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* All routes are now public and wrapped with Layout */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />
      <Route
        path="/scooters"
        element={
          <Layout>
            <Scooters />
          </Layout>
        }
      />
      <Route
        path="/bookings"
        element={
          <Layout>
            <Bookings />
          </Layout>
        }
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
