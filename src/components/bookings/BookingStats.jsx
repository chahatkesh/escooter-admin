// src/components/bookings/BookingStats.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Clock, TrendingUp, Users, DollarSign } from "lucide-react";

// Dummy data
const dailyData = [
  { day: "Mon", bookings: 45, revenue: 450 },
  { day: "Tue", bookings: 52, revenue: 520 },
  { day: "Wed", bookings: 48, revenue: 480 },
  { day: "Thu", bookings: 70, revenue: 700 },
  { day: "Fri", bookings: 65, revenue: 650 },
  { day: "Sat", bookings: 85, revenue: 850 },
  { day: "Sun", bookings: 75, revenue: 750 },
];

const hourlyData = [
  { hour: "00:00", active: 10 },
  { hour: "03:00", active: 5 },
  { hour: "06:00", active: 15 },
  { hour: "09:00", active: 40 },
  { hour: "12:00", active: 35 },
  { hour: "15:00", active: 45 },
  { hour: "18:00", active: 30 },
  { hour: "21:00", active: 20 },
];

const BookingStats = () => {
  const stats = [
    {
      title: "Total Bookings",
      value: "440",
      trend: "+12.5%",
      icon: Clock,
      color: "blue",
    },
    {
      title: "Active Rides",
      value: "28",
      trend: "+5.2%",
      icon: TrendingUp,
      color: "teal",
    },
    {
      title: "Unique Users",
      value: "325",
      trend: "+8.1%",
      icon: Users,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: "$4,400",
      trend: "+15.3%",
      icon: DollarSign,
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
                <p className="text-sm mt-2 text-green-600">
                  {stat.trend} from last week
                </p>
              </div>
              <div
                className={`p-3 rounded-full bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Bookings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daily Bookings & Revenue
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="bookings"
                  fill="#008080"
                  name="Bookings"
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill="#9333ea"
                  name="Revenue ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Hourly Active Rides Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Active Rides by Hour
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#008080"
                  strokeWidth={2}
                  name="Active Rides"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingStats;
