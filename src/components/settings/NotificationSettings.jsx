// src/components/settings/NotificationSettings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, AlertTriangle } from "lucide-react";

const notificationCategories = [
  {
    id: "bookings",
    title: "Booking Notifications",
    description:
      "Notifications about new bookings, cancellations, and completions",
    channels: ["email", "push", "sms"],
  },
  {
    id: "payments",
    title: "Payment Notifications",
    description: "Updates about payments, refunds, and billing issues",
    channels: ["email", "push"],
  },
  {
    id: "maintenance",
    title: "Maintenance Alerts",
    description: "Alerts about scooter maintenance and repairs",
    channels: ["email", "push"],
  },
  {
    id: "reports",
    title: "Report Updates",
    description: "Daily and weekly report summaries",
    channels: ["email"],
  },
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    bookings: {
      email: true,
      push: true,
      sms: false,
    },
    payments: {
      email: true,
      push: false,
      sms: false,
    },
    maintenance: {
      email: true,
      push: true,
      sms: false,
    },
    reports: {
      email: true,
      push: false,
      sms: false,
    },
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleToggle = (category, channel) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel],
      },
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    // Save notification settings
    setIsDirty(false);
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "email":
        return Mail;
      case "push":
        return Bell;
      case "sms":
        return MessageSquare;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Notification Settings
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Manage your notification preferences for different types of alerts
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {notificationCategories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-900">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.description}
                </p>
              </div>

              <div className="space-y-3">
                {category.channels.map((channel) => {
                  const Icon = getChannelIcon(channel);
                  return (
                    <div
                      key={channel}
                      className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700 capitalize">
                          {channel} Notifications
                        </span>
                      </div>
                      <motion.label
                        className="relative inline-flex items-center cursor-pointer"
                        whileTap={{ scale: 0.95 }}>
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[category.id][channel]}
                          onChange={() => handleToggle(category.id, channel)}
                        />
                        <div
                          className={`
                          w-11 h-6 rounded-full peer 
                          peer-checked:after:translate-x-full 
                          after:content-[''] 
                          after:absolute 
                          after:top-[2px] 
                          after:left-[2px] 
                          after:bg-white 
                          after:rounded-full 
                          after:h-5 
                          after:w-5 
                          after:transition-all
                          ${
                            settings[category.id][channel]
                              ? "bg-teal-600 after:border-white"
                              : "bg-gray-200 after:border-gray-300"
                          }
                        `}></div>
                      </motion.label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        {isDirty && (
          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Save Changes
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
