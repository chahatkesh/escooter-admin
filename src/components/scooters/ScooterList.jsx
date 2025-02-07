// src/components/scooters/ScooterList.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Battery, MapPin, Settings, Plus } from "lucide-react";

// Dummy data
const scootersData = [
  {
    id: "SCT-001",
    model: "X-1000",
    status: "available",
    battery: 85,
    location: "Downtown West",
    lastMaintenance: "2024-01-15",
    totalRides: 128,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "SCT-002",
    model: "X-1000",
    status: "in-use",
    battery: 45,
    location: "Central Park",
    lastMaintenance: "2024-01-20",
    totalRides: 156,
    coordinates: { lat: 40.7829, lng: -73.9654 },
  },
  // Add more dummy data...
];

const ScooterList = ({ onScooterSelect, onAddScooter }) => {
  const [scooters, setScooters] = useState(scootersData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = scootersData.filter(
      (scooter) =>
        scooter.id.toLowerCase().includes(term) ||
        scooter.location.toLowerCase().includes(term)
    );
    setScooters(filtered);
  };

  const getBatteryColor = (level) => {
    if (level > 70) return "text-green-500";
    if (level > 30) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusBadge = (status) => {
    const styles = {
      available: "bg-green-100 text-green-800",
      "in-use": "bg-blue-100 text-blue-800",
      maintenance: "bg-orange-100 text-orange-800",
      offline: "bg-gray-100 text-gray-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Scooters</h2>
          <div className="mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddScooter}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Scooter
            </motion.button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search scooters..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </motion.button>
        </div>
      </div>

      {/* Scooter Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scooters.map((scooter) => (
          <motion.div
            key={scooter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onScooterSelect(scooter)}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-800">
                {scooter.id}
              </span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                  scooter.status
                )}`}>
                {scooter.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Battery
                    className={`w-4 h-4 mr-2 ${getBatteryColor(
                      scooter.battery
                    )}`}
                  />
                  <span>{scooter.battery}%</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>{scooter.model}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{scooter.location}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Last Maintenance:{" "}
                  {new Date(scooter.lastMaintenance).toLocaleDateString()}
                </span>
                <span>{scooter.totalRides} rides</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {scooters.length} scooters
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled>
              Previous
            </button>
            <button
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScooterList;
