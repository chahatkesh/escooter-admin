// src/components/scooters/ScooterForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Bike, Battery, MapPin, Bolt } from "lucide-react";

const ScooterForm = ({ scooter, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: scooter?.id || "",
    model: scooter?.model || "",
    battery: scooter?.battery || 100,
    location: scooter?.location || "",
    status: scooter?.status || "available",
    lastMaintenance:
      scooter?.lastMaintenance || new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = "Scooter ID is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (formData.battery < 0 || formData.battery > 100) {
      newErrors.battery = "Battery must be between 0 and 100";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {scooter ? "Edit Scooter" : "Add New Scooter"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Scooter ID Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Bike className="w-4 h-4 mr-2" />
                Scooter ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.id ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter scooter ID"
              />
              {errors.id && (
                <p className="mt-1 text-sm text-red-500">{errors.id}</p>
              )}
            </div>

            {/* Model Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Bolt className="w-4 h-4 mr-2" />
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.model ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter scooter model"
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-500">{errors.model}</p>
              )}
            </div>

            {/* Battery Level Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Battery className="w-4 h-4 mr-2" />
                Battery Level (%)
              </label>
              <input
                type="number"
                name="battery"
                value={formData.battery}
                onChange={handleChange}
                min="0"
                max="100"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.battery ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.battery && (
                <p className="mt-1 text-sm text-red-500">{errors.battery}</p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.location ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="available">Available</option>
                <option value="in-use">In Use</option>
                <option value="maintenance">Maintenance</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Last Maintenance Date Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">
                Last Maintenance Date
              </label>
              <input
                type="date"
                name="lastMaintenance"
                value={formData.lastMaintenance}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800">
              Cancel
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              {scooter ? "Save Changes" : "Add Scooter"}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ScooterForm;
