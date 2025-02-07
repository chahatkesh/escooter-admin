// src/components/bookings/BookingDetails.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  User,
  Bike,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

const BookingDetails = ({ booking, onBack }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: "text-green-600",
      active: "text-blue-600",
      cancelled: "text-red-600",
      pending: "text-yellow-600",
    };
    return colors[status] || "text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Booking Details - {booking?.id}
              </h2>
              <p
                className={`mt-1 font-medium ${getStatusColor(
                  booking?.status
                )}`}>
                {booking?.status.charAt(0).toUpperCase() +
                  booking?.status.slice(1)}
              </p>
            </div>
          </div>
          {booking?.status === "active" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              End Ride
            </motion.button>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Booking Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Start Time
              </div>
              <span className="font-medium">
                {new Date(booking?.startTime).toLocaleString()}
              </span>
            </div>
            {booking?.endTime && (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  End Time
                </div>
                <span className="font-medium">
                  {new Date(booking?.endTime).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Duration
              </div>
              <span className="font-medium">{booking?.duration} mins</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                Distance
              </div>
              <span className="font-medium">{booking?.distance} km</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                Amount
              </div>
              <span className="font-medium">${booking?.amount.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            User Information
          </h3>
          <div className="flex items-center mb-4">
            <img
              src={`/api/placeholder/48/48`}
              alt={booking?.userName}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <div className="text-lg font-medium text-gray-900">
                {booking?.userName}
              </div>
              <div className="text-sm text-gray-500">{booking?.userId}</div>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <User className="w-4 h-4 mr-2" />
              View User Profile
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact User
            </button>
          </div>
        </motion.div>

        {/* Scooter Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Scooter Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Bike className="w-4 h-4 mr-2" />
                Scooter ID
              </div>
              <span className="font-medium">{booking?.scooterId}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </div>
              <span className="font-medium">{booking?.location}</span>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Bike className="w-4 h-4 mr-2" />
              View Scooter Details
            </button>
          </div>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ride Route</h3>
        <div className="h-96 bg-gray-100 rounded-lg">
          {/* Map component will be integrated here */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Map View
          </div>
        </div>
      </motion.div>

      {/* Issues Section */}
      {booking?.status === "completed" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Report Issues
          </h3>
          <button className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report a Problem
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BookingDetails;
