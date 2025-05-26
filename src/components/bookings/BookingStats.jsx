// src/components/bookings/BookingStats.jsx
import React, { useState } from "react";
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
import {
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Loader,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { scooterService } from "../../services/api";

// Process API data for the chart
const processDailyData = (rides) => {
  if (!rides || !rides.length) return [];

  // Group by day of week
  const dayMap = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  const dailyStats = {};

  // Initialize all days of week
  Object.values(dayMap).forEach((day) => {
    dailyStats[day] = { bookings: 0, revenue: 0 };
  });

  // Process rides data
  rides.forEach((ride) => {
    const date = new Date(ride.startTime);
    const day = dayMap[date.getDay()];

    if (!dailyStats[day]) {
      dailyStats[day] = { bookings: 0, revenue: 0 };
    }

    dailyStats[day].bookings++;
    dailyStats[day].revenue += ride.amount || 0;
  });

  // Convert to array format for charts
  return Object.entries(dailyStats).map(([day, data]) => ({
    day,
    bookings: data.bookings,
    revenue: data.revenue,
  }));
};

// Process hourly distribution data
const processHourlyData = (rides) => {
  if (!rides || !rides.length) return [];

  // Group by hour of day (every 3 hours)
  const hourGroups = {
    "00:00": 0,
    "03:00": 0,
    "06:00": 0,
    "09:00": 0,
    "12:00": 0,
    "15:00": 0,
    "18:00": 0,
    "21:00": 0,
  };

  // Process rides data
  rides.forEach((ride) => {
    const date = new Date(ride.startTime);
    const hour = date.getHours();
    const group = `${Math.floor(hour / 3) * 3}`.padStart(2, "0") + ":00";

    if (hourGroups[group] !== undefined) {
      hourGroups[group]++;
    }
  });

  // Convert to array format for charts
  return Object.entries(hourGroups).map(([hour, active]) => ({
    hour,
    active,
  }));
};

const BookingStats = () => {
  const [timeRange, setTimeRange] = useState("week"); // "week", "month", "year"

  // Fetch ride data from API
  const {
    data: ridesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rides-stats", timeRange],
    queryFn: async () => {
      try {
        // In a real implementation, you would pass the timeRange to filter
        const response = await scooterService.getAllRides({});
        return response.data || [];
      } catch (err) {
        console.error("Error fetching ride stats:", err);
        return [];
      }
    },
  });

  // Process chart data when API data is available
  const dailyData = processDailyData(ridesData || []);
  const hourlyData = processHourlyData(ridesData || []);

  // Calculate summary statistics
  const totalBookings = ridesData?.length || 0;
  const activeRides =
    ridesData?.filter((ride) => ride.status === "active")?.length || 0;

  // Calculate unique users (based on userId)
  const uniqueUsers = ridesData
    ? new Set(ridesData.map((ride) => ride.userId)).size
    : 0;

  // Calculate total revenue
  const totalRevenue =
    ridesData?.reduce((sum, ride) => sum + (ride.amount || 0), 0) || 0;

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings.toString(),
      trend: "", // We would calculate this if we had historical data
      icon: Clock,
      color: "blue",
    },
    {
      title: "Active Rides",
      value: activeRides.toString(),
      trend: "",
      icon: TrendingUp,
      color: "teal",
    },
    {
      title: "Unique Users",
      value: uniqueUsers.toString(),
      trend: "",
      icon: Users,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      trend: "",
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
