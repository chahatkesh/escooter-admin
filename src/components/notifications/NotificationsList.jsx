// src/components/notifications/NotificationsList.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Bike,
  DollarSign,
  Filter,
  Trash,
} from "lucide-react";

// Dummy notifications data
const notificationsData = [
  {
    id: 1,
    type: "booking",
    title: "New Booking Request",
    message: "John Doe has requested a new booking.",
    timestamp: "2024-02-07T10:30:00",
    status: "unread",
    priority: "medium",
    icon: Calendar,
  },
  {
    id: 2,
    type: "user",
    title: "New User Registration",
    message: "A new user has registered on the platform.",
    timestamp: "2024-02-07T09:45:00",
    status: "read",
    priority: "low",
    icon: User,
  },
  {
    id: 3,
    type: "scooter",
    title: "Low Battery Alert",
    message: "Scooter SCT-001 battery level is below 20%.",
    timestamp: "2024-02-07T09:15:00",
    status: "unread",
    priority: "high",
    icon: Bike,
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Failed",
    message: "Payment for booking BK-001 has failed.",
    timestamp: "2024-02-07T08:30:00",
    status: "unread",
    priority: "high",
    icon: DollarSign,
  },
];

const NotificationsList = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-red-600",
      medium: "text-yellow-600",
      low: "text-blue-600",
    };
    return colors[priority] || "text-gray-600";
  };

  const getIconByType = (type) => {
    const icons = {
      booking: Calendar,
      user: User,
      scooter: Bike,
      payment: DollarSign,
      system: AlertTriangle,
      success: CheckCircle,
      info: Info,
    };
    return icons[type] || Bell;
  };

  const filterNotifications = () => {
    let filtered = [...notificationsData];

    if (selectedType !== "all") {
      filtered = filtered.filter((n) => n.type === selectedType);
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter((n) => n.priority === selectedPriority);
    }

    setNotifications(filtered);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, status: "read" }));
    setNotifications(updated);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {notifications.filter((n) => n.status === "unread").length} unread
              notifications
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button
              onClick={markAllAsRead}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              Mark all as read
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-4">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              filterNotifications();
            }}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="all">All Types</option>
            <option value="booking">Bookings</option>
            <option value="user">Users</option>
            <option value="scooter">Scooters</option>
            <option value="payment">Payments</option>
            <option value="system">System</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => {
              setSelectedPriority(e.target.value);
              filterNotifications();
            }}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        {notifications.map((notification) => {
          const Icon = getIconByType(notification.type);
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 ${
                notification.status === "unread" ? "bg-teal-50" : "bg-white"
              }`}>
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-full ${getPriorityColor(
                    notification.priority
                  )} bg-opacity-10`}>
                  <Icon
                    className={`w-6 h-6 ${getPriorityColor(
                      notification.priority
                    )}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-500">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {notifications.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
