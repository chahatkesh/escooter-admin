// src/components/scooters/ScooterDetails.jsx
import { useState } from "react";
import {
  ArrowLeft,
  Battery,
  MapPin,
  Clock,
  Wrench,
  Activity,
  Edit,
} from "lucide-react";
import PropTypes from "prop-types";

const ScooterDetails = ({
  scooter,
  onBack,
  onMaintenance,
  onViewTelemetry,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "in_use":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBatteryColor = (level) => {
    if (level <= 20) return "text-red-500";
    if (level <= 50) return "text-yellow-500";
    return "text-green-500";
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span className="font-medium">{scooter.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                  scooter.status
                )}`}>
                {scooter.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Battery Level</span>
              <div className="flex items-center">
                <Battery
                  className={`mr-2 ${getBatteryColor(scooter.batteryLevel)}`}
                  size={16}
                />
                <span>{scooter.batteryLevel}%</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Station</span>
              <div className="flex items-center">
                <MapPin className="mr-2 text-gray-500" size={16} />
                <span>{scooter.lastStation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Rides</span>
              <span className="font-medium">{scooter.totalRides || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Maintenance</span>
              <span className="font-medium">
                {scooter.lastMaintenance
                  ? new Date(scooter.lastMaintenance).toLocaleDateString()
                  : "Never"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Location Update</span>
              <span className="font-medium">
                {scooter.lastLocationUpdate
                  ? new Date(scooter.lastLocationUpdate).toLocaleString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        {scooter.recentActivity?.length > 0 ? (
          <div className="space-y-3">
            {scooter.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-500" size={16} />
                  <span>{activity.description}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Maintenance History</h3>
        {scooter.maintenanceHistory?.length > 0 ? (
          <div className="space-y-3">
            {scooter.maintenanceHistory.map((record, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <Wrench className="mr-2 text-orange-500" size={16} />
                    <span className="font-medium">{record.type}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{record.description}</p>
                {record.notes && (
                  <p className="text-gray-500 text-sm mt-1">{record.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No maintenance history available</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onMaintenance(scooter)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
          <Wrench className="mr-2" size={16} />
          Schedule Maintenance
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="mr-2" size={20} />
          Back to List
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewTelemetry(scooter)}
            className="flex items-center px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded">
            <Activity className="mr-1" size={16} />
            View Telemetry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              Details
            </button>
            <button
              onClick={() => setActiveTab("maintenance")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "maintenance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              Maintenance
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "details"
            ? renderDetailsTab()
            : renderMaintenanceTab()}
        </div>
      </div>
    </div>
  );
};

ScooterDetails.propTypes = {
  scooter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    batteryLevel: PropTypes.number.isRequired,
    lastStation: PropTypes.string.isRequired,
    totalRides: PropTypes.number,
    lastMaintenance: PropTypes.string,
    lastLocationUpdate: PropTypes.string,
    recentActivity: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
      })
    ),
    maintenanceHistory: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        notes: PropTypes.string,
      })
    ),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMaintenance: PropTypes.func.isRequired,
  onViewTelemetry: PropTypes.func.isRequired,
};

export default ScooterDetails;
