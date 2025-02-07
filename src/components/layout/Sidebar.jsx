// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Bike,
  Calendar,
  ChartBar,
  Gift,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/users", icon: Users, label: "Users" },
  { path: "/scooters", icon: Bike, label: "Scooters" },
  { path: "/bookings", icon: Calendar, label: "Bookings" },
  { path: "/reports", icon: ChartBar, label: "Reports" },
  { path: "/promotions", icon: Gift, label: "Promotions" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  const MenuItem = ({ icon: Icon, label, path }) => {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 text-gray-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors duration-200 ${
            isActive ? "bg-teal-50 text-teal-700" : ""
          }`
        }>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Icon className="h-5 w-5" />
        </motion.div>
        <span className="ml-3">{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img
          src="https://image.shutterstock.com/image-vector/electric-scooter-icon-electro-bike-250nw-2461240665.jpg"
          alt="Logo"
          className="h-12"
        />
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.path} {...item} />
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200 w-full">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <LogOut className="h-5 w-5" />
          </motion.div>
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
