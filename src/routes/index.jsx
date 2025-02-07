// src/routes/index.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Scooters from "../pages/Scooters";
import Bookings from "../pages/Bookings";
import Reports from "../pages/Reports";
import Promotions from "../pages/Promotions";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notification";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/scooters" element={<Scooters />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
