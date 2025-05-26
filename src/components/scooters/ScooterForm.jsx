// src/components/scooters/ScooterForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Bike, Battery, MapPin, Bolt } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scooterService } from "../../services/api";

const ScooterForm = ({ scooter, onClose, onSubmit }) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: scooter?.name || scooter?.id || "",
    model: scooter?.model || "X-1000",
    batteryLevel: scooter?.batteryLevel || scooter?.battery || 100,
    location: scooter?.location || "40.7128,-74.0060",
    lastStation: scooter?.lastStation || "",
    status: scooter?.status || "available",
    lastMaintenance:
      scooter?.lastMaintenance || new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  // Mutation for creating or updating a scooter
  const mutation = useMutation({
    mutationFn: (data) => {
      if (scooter?._id || scooter?.id) {
        // Update existing scooter
        return scooterService.updateScooterStatus(
          scooter._id || scooter.id,
          data.status
        );
      } else {
        // Create new scooter
        return scooterService.createScooter(data);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["scooters"] });
      if (onSubmit) onSubmit(formData);
      onClose();
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Scooter name is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (formData.batteryLevel < 0 || formData.batteryLevel > 100) {
      newErrors.batteryLevel = "Battery must be between 0 and 100";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData);
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
            {/* Scooter Name Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Bike className="w-4 h-4 mr-2" />
                Scooter Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter scooter name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
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
                name="batteryLevel"
                value={formData.batteryLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.batteryLevel ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.batteryLevel && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.batteryLevel}
                </p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Location Coordinates
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.location ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter coordinates (e.g. 40.7128,-74.0060)"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Last Station Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Last Station
              </label>
              <input
                type="text"
                name="lastStation"
                value={formData.lastStation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter station ID (e.g. NYC-001)"
              />
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
