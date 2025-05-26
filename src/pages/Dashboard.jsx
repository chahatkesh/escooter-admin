// src/pages/Dashboard.jsx
import { Bike, DollarSign, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { scooterService } from "../services/api";
import StatCard from "../components/dashboard/StatCard";
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* API Testing Panel for Development */}
      <ApiTestPanel />
    </div>
  );
};

export default Dashboard;
