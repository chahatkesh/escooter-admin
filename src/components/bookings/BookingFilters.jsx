// src/components/bookings/BookingFilters.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Filter, Calendar, DollarSign, Clock, MapPin } from "lucide-react";

const BookingFilters = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    dateRange: {
      start: "",
      end: "",
    },
    priceRange: {
      min: "",
      max: "",
    },
    duration: {
      min: "",
      max: "",
    },
    location: "",
    status: [],
  });

  const handleChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleStatusToggle = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Filter Bookings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) =>
                  handleChange("dateRange", {
                    ...filters.dateRange,
                    start: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) =>
                  handleChange("dateRange", {
                    ...filters.dateRange,
                    end: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 mr-2" />
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) =>
                  handleChange("priceRange", {
                    ...filters.priceRange,
                    min: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) =>
                  handleChange("priceRange", {
                    ...filters.priceRange,
                    max: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              Duration (minutes)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min"
                value={filters.duration.min}
                onChange={(e) =>
                  handleChange("duration", {
                    ...filters.duration,
                    min: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.duration.max}
                onChange={(e) =>
                  handleChange("duration", {
                    ...filters.duration,
                    max: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["active", "completed", "cancelled", "pending"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className={`px-4 py-2 rounded-lg border ${
                    filters.status.includes(status)
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800">
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApply}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingFilters;
