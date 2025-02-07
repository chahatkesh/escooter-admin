// src/components/bookings/BookingList.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  User,
  Bike,
  DollarSign,
  ChevronDown,
} from "lucide-react";

// Dummy data
const bookingsData = [
  {
    id: "BK-001",
    userId: "USR-123",
    userName: "John Doe",
    scooterId: "SCT-456",
    startTime: "2024-02-06T10:30:00",
    endTime: "2024-02-06T11:15:00",
    duration: 45,
    distance: 5.2,
    amount: 15.5,
    status: "completed",
    location: "Central Park",
  },
  {
    id: "BK-002",
    userId: "USR-124",
    userName: "Jane Smith",
    scooterId: "SCT-457",
    startTime: "2024-02-06T11:00:00",
    endTime: null,
    duration: 0,
    distance: 0,
    amount: 0,
    status: "active",
    location: "Downtown West",
  },
  // Add more dummy bookings...
];

const BookingList = ({ onBookingSelect }) => {
  const [bookings, setBookings] = useState(bookingsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterBookings(term, filterStatus);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    filterBookings(searchTerm, status);
  };

  const filterBookings = (term, status) => {
    let filtered = bookingsData.filter(
      (booking) =>
        booking.id.toLowerCase().includes(term) ||
        booking.userName.toLowerCase().includes(term) ||
        booking.scooterId.toLowerCase().includes(term)
    );

    if (status !== "all") {
      filtered = filtered.filter((booking) => booking.status === status);
    }

    setBookings(filtered);
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scooter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <motion.tr
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "#f9fafb" }}
                onClick={() => onBookingSelect(booking)}
                className="cursor-pointer">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(booking.startTime).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={`/api/placeholder/32/32`}
                      alt={booking.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.userName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.userId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {booking.scooterId}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {formatDuration(booking.duration)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.distance} km
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ${booking.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                      booking.status
                    )}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-500">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {bookings.length} bookings
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

export default BookingList;
