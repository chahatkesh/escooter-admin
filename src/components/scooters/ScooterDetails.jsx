// src/components/scooters/ScooterDetails.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Battery,
  MapPin,
  Calendar,
  Clock,
  Activity,
  AlertTriangle,
  ChevronLeft,
  Settings,
  Lock,
  Unlock,
} from "lucide-react";

const ScooterDetails = ({ scooter, onBack }) => {
  // Dummy maintenance history
  const maintenanceHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Regular Maintenance",
      description: "Battery check, brake adjustment",
      technician: "John Smith",
    },
    {
      id: 2,
      date: "2024-01-01",
      type: "Repair",
      description: "Replace front wheel",
      technician: "Mike Johnson",
    },
  ];

  // Dummy ride history
  const rideHistory = [
    {
      id: 1,
      date: "2024-02-01",
      duration: "25 mins",
      distance: "3.5 km",
      user: "User #12345",
    },
    {
      id: 2,
      date: "2024-01-31",
      duration: "15 mins",
      distance: "2.1 km",
      user: "User #12346",
    },
  ];

  const getBatteryColor = (level) => {
    if (level > 70) return "text-green-500";
    if (level > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            Scooter Details - {scooter?.id}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Current Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Battery
                  className={`w-5 h-5 mr-2 ${getBatteryColor(
                    scooter?.battery
                  )}`}
                />
                Battery Level
              </div>
              <span className="font-medium">{scooter?.battery}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </div>
              <span className="font-medium">{scooter?.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Activity className="w-5 h-5 mr-2" />
                Status
              </div>
              <span className="font-medium capitalize">{scooter?.status}</span>
            </div>
            <div className="pt-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Lock className="w-4 h-4 mr-2" />
                Lock
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Maintenance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Maintenance History
            </h3>
            <button className="text-sm text-teal-600 hover:text-teal-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {maintenanceHistory.map((record) => (
              <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    {record.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{record.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Technician: {record.technician}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ride History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Rides
            </h3>
            <button className="text-sm text-teal-600 hover:text-teal-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {rideHistory.map((ride) => (
              <div key={ride.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{ride.user}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(ride.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {ride.duration}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ride.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
        <div className="h-96 bg-gray-100 rounded-lg">
          {/* Map component will be integrated here */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Map View
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScooterDetails;
