// src/pages/Scooters.jsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import ScooterList from "../components/scooters/ScooterList";
import ScooterDetails from "../components/scooters/ScooterDetails";
import ScooterForm from "../components/scooters/ScooterForm";
import MaintenanceForm from "../components/scooters/MaintenanceForm";
import TelemetryPanel from "../components/scooters/TelemetryPanel";
import { scooterService } from "../services/api";

const Scooters = () => {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [scooterToEdit, setScooterToEdit] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    minBattery: "",
    station: "",
  });

  // Fetch all scooters with filters
  const { data: scooters, isLoading } = useQuery({
    queryKey: ["scooters", filters],
    queryFn: async () => {
      try {
        const response = await scooterService.getAllScooters(filters);
        return response.data;
      } catch (error) {
        console.error("Error fetching scooters:", error);
        return [];
      }
    },
  });

  // Fetch low battery scooters
  const { data: lowBatteryScooters } = useQuery({
    queryKey: ["low-battery-scooters"],
    queryFn: async () => {
      try {
        const response = await scooterService.getLowBatteryScooters();
        return response.data;
      } catch (error) {
        console.error("Error fetching low battery scooters:", error);
        return [];
      }
    },
  });

  // Fetch maintenance required scooters
  const { data: maintenanceRequiredScooters } = useQuery({
    queryKey: ["maintenance-required-scooters"],
    queryFn: async () => {
      try {
        const response = await scooterService.getMaintenanceRequired();
        return response.data;
      } catch (error) {
        console.error("Error fetching maintenance required scooters:", error);
        return [];
      }
    },
  });

  const handleScooterSelect = (scooter) => {
    setSelectedScooter(scooter);
  };

  const handleAddScooter = () => {
    setScooterToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditScooter = (scooter) => {
    setScooterToEdit(scooter);
    setIsFormOpen(true);
  };

  const handleMaintenance = (scooter) => {
    setSelectedScooter(scooter);
    setIsMaintenanceFormOpen(true);
  };

  const handleViewTelemetry = (scooter) => {
    setSelectedScooter(scooter);
    setIsTelemetryOpen(true);
  };

  const handleDeleteScooter = async (scooterId) => {
    try {
      await scooterService.deleteScooter(scooterId);
      queryClient.invalidateQueries(["scooters"]);
    } catch (error) {
      console.error("Error deleting scooter:", error);
    }
  };

  const queryClient = useQueryClient();

  const handleFormSubmit = async (scooterData) => {
    try {
      if (scooterToEdit) {
        // Update existing scooter
        await scooterService.updateScooter(scooterToEdit._id, scooterData);
      } else {
        // Create new scooter
        await scooterService.createScooter(scooterData);
      }
      queryClient.invalidateQueries(["scooters"]);
      setIsFormOpen(false);
      setScooterToEdit(null);
    } catch (error) {
      console.error("Error saving scooter:", error);
      alert(
        error.response?.data?.message ||
          "Error saving scooter. Please try again."
      );
    }
  };

  const handleMaintenanceSubmit = async (maintenanceData) => {
    try {
      // Schedule the maintenance
      await scooterService.scheduleMaintenance(
        selectedScooter._id,
        maintenanceData
      );

      // Update scooter status to maintenance
      await scooterService.updateScooterStatus(
        selectedScooter._id,
        "maintenance"
      );

      // Invalidate all relevant queries
      queryClient.invalidateQueries(["scooters"]);
      queryClient.invalidateQueries(["maintenance-required-scooters"]);
      setIsMaintenanceFormOpen(false);
    } catch (error) {
      console.error("Error scheduling maintenance:", error);
      alert(
        error.response?.data?.message ||
          "Error scheduling maintenance. Please try again."
      );
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setScooterToEdit(null);
  };

  const handleMaintenanceClose = () => {
    setIsMaintenanceFormOpen(false);
  };

  const handleTelemetryClose = () => {
    setIsTelemetryOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-6">
      {selectedScooter ? (
        <ScooterDetails
          scooter={selectedScooter}
          onBack={() => setSelectedScooter(null)}
          onMaintenance={handleMaintenance}
          onViewTelemetry={handleViewTelemetry}
          onDelete={handleDeleteScooter}
        />
      ) : (
        <ScooterList
          scooters={scooters}
          isLoading={isLoading}
          lowBatteryScooters={lowBatteryScooters}
          maintenanceRequiredScooters={maintenanceRequiredScooters}
          onScooterSelect={handleScooterSelect}
          onAddScooter={handleAddScooter}
          onEditScooter={handleEditScooter}
          onMaintenance={handleMaintenance}
          onViewTelemetry={handleViewTelemetry}
          onDelete={handleDeleteScooter}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      <AnimatePresence>
        {isFormOpen && (
          <ScooterForm
            scooter={scooterToEdit}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        )}
        {isMaintenanceFormOpen && (
          <MaintenanceForm
            scooter={selectedScooter}
            onClose={handleMaintenanceClose}
            onSubmit={handleMaintenanceSubmit}
          />
        )}
        {isTelemetryOpen && (
          <TelemetryPanel
            scooter={selectedScooter}
            onClose={handleTelemetryClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scooters;
