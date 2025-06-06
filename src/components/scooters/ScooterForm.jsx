// src/components/scooters/ScooterForm.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const ScooterForm = ({ scooter, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "available",
    batteryLevel: 100,
    lastStation: "",
    location: "",
  });

  useEffect(() => {
    if (scooter) {
      setFormData({
        name: scooter.name || "",
        status: scooter.status || "available",
        batteryLevel: scooter.batteryLevel || 100,
        lastStation: scooter.lastStation || "",
        location: scooter.location || "",
      });
    }
  }, [scooter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "batteryLevel" ? parseInt(value) || 0 : value,
    }));
  };

  const validateLocation = (location) => {
    const coords = location.split(",").map((coord) => parseFloat(coord.trim()));
    return coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateLocation(formData.location)) {
      alert(
        "Please enter a valid location in the format: latitude,longitude (e.g., 40.7128,-74.0060)"
      );
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {scooter ? "Edit Scooter" : "Add New Scooter"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter scooter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Battery Level (%)
            </label>
            <input
              type="number"
              name="batteryLevel"
              value={formData.batteryLevel}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Station
            </label>
            <input
              type="text"
              name="lastStation"
              value={formData.lastStation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter station name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (lat,long)
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter location (e.g., 40.7128,-74.0060)"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {scooter ? "Update Scooter" : "Add Scooter"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

ScooterForm.propTypes = {
  scooter: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    batteryLevel: PropTypes.number,
    lastStation: PropTypes.string,
    location: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ScooterForm;
