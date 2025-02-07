// src/components/reports/RevenueReport.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Download,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

// Dummy data
const monthlyData = [
  { month: "Jan", revenue: 12500, rides: 2500, users: 1200 },
  { month: "Feb", revenue: 15000, rides: 3000, users: 1400 },
  { month: "Mar", revenue: 18000, rides: 3600, users: 1600 },
  { month: "Apr", revenue: 16000, rides: 3200, users: 1500 },
  { month: "May", revenue: 21000, rides: 4200, users: 1800 },
];

const RevenueReport = () => {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const metrics = [
    {
      title: "Total Revenue",
      value: "$82,500",
      trend: "+15.3%",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      title: "Total Rides",
      value: "16,500",
      trend: "+12.1%",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Active Users",
      value: "1,800",
      trend: "+8.5%",
      icon: Users,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Revenue Report
          </h2>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span>to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{metric.title}</p>
                <h3 className="text-2xl font-semibold mt-2">{metric.value}</h3>
                <p
                  className={`text-sm mt-2 ${
                    metric.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {metric.trend} from last month
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${metric.color.replace(
                  "text",
                  "bg"
                )}-50`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#008080"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Rides & Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Rides & Users
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rides" fill="#008080" name="Rides" />
                <Bar dataKey="users" fill="#9333ea" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RevenueReport;
