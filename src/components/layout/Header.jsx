// src/components/layout/Header.jsx
import React, { useState } from "react";
import { Menu, Bell, Sun, Moon, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Add theme implementation logic here
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
    // Add language switching logic here
  };

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </motion.button>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-teal-700">
                E-Scooter Admin
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100">
              <Globe className="h-5 w-5 text-gray-600" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100">
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-600" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center focus:outline-none">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Admin User
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
