// src/pages/Dashboard.jsx
import { Users, Bike, DollarSign, Calendar, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { scooterService, authService } from "../services/api";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentBookings from "../components/dashboard/RecentBookings";
import ApiTestPanel from "../components/dashboard/ApiTestPanel";

const Dashboard = () => {
  // Fetch scooter data
  const { data: scootersData, isLoading: isLoadingScooters } = useQuery({
    queryKey: ["scooters-summary"],
    queryFn: async () => {
      try {
        const response = await scooterService.getAllScooters();
        return response.data;
      } catch (error) {
        console.error("Error fetching scooters:", error);
        return [];
      }
    },
  });

  // Fetch rides data
  const { data: ridesData, isLoading: isLoadingRides } = useQuery({
    queryKey: ["rides-summary"],
    queryFn: async () => {
      try {
        const response = await scooterService.getAllRides();
        return response.data;
      } catch (error) {
        console.error("Error fetching rides:", error);
        return [];
      }
    },
  });

  // Calculate stats based on API data
  const scootersCount = scootersData?.length || 0;
  const activeScooters =
    scootersData?.filter((s) => s.status === "available")?.length || 0;

  const totalRides = ridesData?.length || 0;

  // Calculate estimated revenue (assuming $2 base + $0.25 per minute)
  const revenue =
    ridesData?.reduce((total, ride) => {
      // Calculate ride duration in minutes (assuming there's start and end times)
      const duration = ride.duration || 15; // default to 15 minutes if duration not available
      return total + (2 + duration * 0.25);
    }, 0) || 0;

  // Create stat cards data
  const stats = [
    {
      title: "Total Scooters",
      value: isLoadingScooters ? "Loading..." : scootersCount.toString(),
      icon: Bike,
      trend: 0,
      color: "blue",
    },
    {
      title: "Available Scooters",
      value: isLoadingScooters ? "Loading..." : activeScooters.toString(),
      icon: Bike,
      trend: 0,
      color: "teal",
    },
    {
      title: "Estimated Revenue",
      value: isLoadingRides ? "Loading..." : `$${revenue.toFixed(2)}`,
      icon: DollarSign,
      trend: 0,
      color: "purple",
    },
    {
      title: "Total Rides",
      value: isLoadingRides ? "Loading..." : totalRides.toString(),
      icon: Calendar,
      trend: 0,
      color: "orange",
    },
  ];

  // Generate chart data from ride information
  const generateChartData = () => {
    if (!ridesData || ridesData.length === 0) {
      // Return placeholder data if no rides are available
      return [
        { name: "Jan", revenue: 0, bookings: 0 },
        { name: "Feb", revenue: 0, bookings: 0 },
        { name: "Mar", revenue: 0, bookings: 0 },
        { name: "Apr", revenue: 0, bookings: 0 },
        { name: "May", revenue: 0, bookings: 0 },
        { name: "Jun", revenue: 0, bookings: 0 },
      ];
    }

    // Group rides by month
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyData = {};

    // Initialize all months
    months.forEach((month) => {
      monthlyData[month] = { revenue: 0, bookings: 0 };
    });

    // Process rides data
    ridesData.forEach((ride) => {
      const date = new Date(ride.startTime);
      const month = months[date.getMonth()];

      // Calculate revenue for this ride (using the same formula as before)
      const duration = ride.duration || 15;
      const rideRevenue = 2 + duration * 0.25;

      // Add to the appropriate month
      if (monthlyData[month]) {
        monthlyData[month].bookings += 1;
        monthlyData[month].revenue += rideRevenue;
      }
    });

    // Convert to array format and only keep the last 6 months
    return Object.entries(monthlyData)
      .map(([name, data]) => ({ name, ...data }))
      .slice(0, 6);
  };

  const chartData = isLoadingRides ? [] : generateChartData();

  // Format recent bookings from rides data
  const recentBookings = ridesData?.slice(0, 5).map((ride) => ({
    id: ride.id || ride._id,
    userName: ride.userId || "User",
    duration: ride.duration || 0,
    distance: ride.distance || 0,
    amount: ride.amount || 0,
    status: ride.status || "Completed",
  })) || [
    {
      id: 1,
      userName: "Loading data...",
      duration: 0,
      distance: 0,
      amount: 0,
      status: "Loading",
    },
  ];

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

      {/* API Testing Panel for Development */}
      <ApiTestPanel />
    </div>
  );
};

export default Dashboard;
