import { useState } from "react";
import { motion } from "framer-motion";
import { X, Battery, Activity, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { scooterService } from "../../services/api";

const TelemetryPanel = ({ scooter, onClose }) => {
  const [timeRange, setTimeRange] = useState("24h");

  // Fetch latest telemetry data
  const { data: latestTelemetry, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["telemetry", scooter._id, "latest"],
    queryFn: async () => {
      try {
        const response = await scooterService.getLatestTelemetry(scooter._id);
        return response.data;
      } catch (error) {
        console.error("Error fetching latest telemetry:", error);
        return null;
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch telemetry history
  const { data: telemetryHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["telemetry", scooter._id, "history", timeRange],
    queryFn: async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - parseInt(timeRange));

        const response = await scooterService.getTelemetryHistory(
          scooter._id,
          startDate.toISOString(),
          endDate.toISOString()
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching telemetry history:", error);
        return [];
      }
    },
  });

  const renderTelemetryCard = (title, value, icon, color) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
        <span className={`text-lg font-semibold ${color}`}>{value}</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Scooter Telemetry</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Current Status</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md">
              <option value="1">Last Hour</option>
              <option value="24">Last 24 Hours</option>
              <option value="168">Last Week</option>
            </select>
          </div>

          {isLoadingLatest ? (
            <div className="text-center py-4">Loading current status...</div>
          ) : latestTelemetry ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTelemetryCard(
                "Battery Level",
                `${latestTelemetry.batteryLevel}%`,
                <Battery className="w-5 h-5 text-blue-500" />,
                "text-blue-600"
              )}
              {renderTelemetryCard(
                "Speed",
                `${latestTelemetry.speed || 0} km/h`,
                <Activity className="w-5 h-5 text-green-500" />,
                "text-green-600"
              )}
              {renderTelemetryCard(
                "Last Update",
                new Date(latestTelemetry.timestamp).toLocaleTimeString(),
                <Clock className="w-5 h-5 text-gray-500" />,
                "text-gray-600"
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-red-500">
              No telemetry data available
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">History</h3>
          {isLoadingHistory ? (
            <div className="text-center py-4">Loading history...</div>
          ) : telemetryHistory && telemetryHistory.length > 0 ? (
            <div className="space-y-4">
              {telemetryHistory.map((record, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Time</span>
                      <p className="font-medium">
                        {new Date(record.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Battery</span>
                      <p className="font-medium">{record.batteryLevel}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Speed</span>
                      <p className="font-medium">{record.speed || 0} km/h</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No history data available
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

TelemetryPanel.propTypes = {
  scooter: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TelemetryPanel;
