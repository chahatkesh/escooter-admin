// src/components/promotions/PromotionsList.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Calendar,
  Users,
  Tag,
  Clock,
  MoreVertical,
  Edit,
  Trash,
} from "lucide-react";

// Dummy data
const promotionsData = [
  {
    id: "PROMO-001",
    title: "First Ride Free",
    code: "FIRST100",
    type: "discount",
    value: 100,
    unit: "percent",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    usageLimit: 1000,
    usedCount: 450,
    status: "active",
  },
  {
    id: "PROMO-002",
    title: "Weekend Special",
    code: "WEEKEND25",
    type: "discount",
    value: 25,
    unit: "percent",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    usageLimit: 500,
    usedCount: 125,
    status: "scheduled",
  },
  // Add more dummy data...
];

const PromotionsList = ({ onEdit, onAdd }) => {
  const [promotions, setPromotions] = useState(promotionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActions, setShowActions] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = promotionsData.filter(
      (promo) =>
        promo.title.toLowerCase().includes(term) ||
        promo.code.toLowerCase().includes(term)
    );
    setPromotions(filtered);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      scheduled: "bg-blue-100 text-blue-800",
      expired: "bg-gray-100 text-gray-800",
      paused: "bg-yellow-100 text-yellow-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const getUsagePercentage = (used, limit) => {
    return (used / limit) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Promotions</h2>
          <div className="mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAdd}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Promotion
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                  promo.status
                )}`}>
                {promo.status}
              </span>
            </div>

            {/* Promotion Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {promo.title}
              </h3>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Tag className="w-4 h-4 mr-1" />
                <span className="font-mono">{promo.code}</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    Valid until {new Date(promo.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{promo.usedCount} used</span>
                </div>
                <span className="text-gray-500">
                  {promo.usageLimit - promo.usedCount} remaining
                </span>
              </div>

              {/* Usage Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full"
                    style={{
                      width: `${getUsagePercentage(
                        promo.usedCount,
                        promo.usageLimit
                      )}%`,
                    }}></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end">
              <div className="relative">
                <button
                  onClick={() =>
                    setShowActions(showActions === promo.id ? null : promo.id)
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>

                {showActions === promo.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={() => onEdit(promo)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center">
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsList;
