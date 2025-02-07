// src/pages/Dashboard.jsx
import React from "react";
import { Users, Bike, DollarSign, Calendar } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentBookings from "../components/dashboard/RecentBookings";

// Dummy data
const stats = [
  {
    title: "Total Users",
    value: "2,847",
    icon: Users,
    trend: 12.5,
    color: "blue",
  },
  {
    title: "Active Scooters",
    value: "432",
    icon: Bike,
    trend: 8.2,
    color: "teal",
  },
  {
    title: "Revenue",
    value: "$28,459",
    icon: DollarSign,
    trend: 15.8,
    color: "purple",
  },
  {
    title: "Total Bookings",
    value: "1,234",
    icon: Calendar,
    trend: -2.4,
    color: "orange",
  },
];

const chartData = [
  { name: "Jan", revenue: 4000, bookings: 2400 },
  { name: "Feb", revenue: 3000, bookings: 1398 },
  { name: "Mar", revenue: 2000, bookings: 9800 },
  { name: "Apr", revenue: 2780, bookings: 3908 },
  { name: "May", revenue: 1890, bookings: 4800 },
  { name: "Jun", revenue: 2390, bookings: 3800 },
];

const recentBookings = [
  {
    id: 1,
    userName: "John Doe",
    duration: 45,
    distance: 5.2,
    amount: 15.5,
    status: "Completed",
  },
  {
    id: 2,
    userName: "Jane Smith",
    duration: 30,
    distance: 3.8,
    amount: 12.75,
    status: "In Progress",
  },
  {
    id: 3,
    userName: "Mike Johnson",
    duration: 60,
    distance: 7.5,
    amount: 22.0,
    status: "Completed",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>
        <div className="lg:col-span-1">
          <RecentBookings bookings={recentBookings} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
