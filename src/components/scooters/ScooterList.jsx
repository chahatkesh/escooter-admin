// src/components/scooters/ScooterList.jsx
import { useState } from "react";
import { Plus, Search, Battery, Wrench, MapPin, Activity } from "lucide-react";
import PropTypes from "prop-types";

const ScooterList = ({
  scooters,
  isLoading,
  lowBatteryScooters,
  maintenanceRequiredScooters,
  onScooterSelect,
  onAddScooter,
  onEditScooter,
  onMaintenance,
  onViewTelemetry,
  filters,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredScooters = scooters?.filter((scooter) => {
    const matchesSearch = scooter.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = !filters.status || scooter.status === filters.status;
    const matchesBattery =
      !filters.minBattery ||
      scooter.batteryLevel >= parseInt(filters.minBattery);
    const matchesStation =
      !filters.station || scooter.lastStation === filters.station;

    return matchesSearch && matchesStatus && matchesBattery && matchesStation;
  });

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Scooters</h2>
        <button
          onClick={onAddScooter}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Add Scooter
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search scooters..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="in_use">In Use</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>

          <select
            value={filters.minBattery}
            onChange={(e) => onFilterChange({ minBattery: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Battery Levels</option>
            <option value="20">20%+</option>
            <option value="50">50%+</option>
            <option value="80">80%+</option>
          </select>

          <input
            type="text"
            placeholder="Station"
            value={filters.station}
            onChange={(e) => onFilterChange({ station: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading scooters...</div>
      ) : filteredScooters?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No scooters found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScooters?.map((scooter) => {
            const isLowBattery = lowBatteryScooters?.some(
              (s) => s.id === scooter.id
            );
            const needsMaintenance = maintenanceRequiredScooters?.some(
              (s) => s.id === scooter.id
            );

            return (
              <div
                key={scooter.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onScooterSelect(scooter)}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{scooter.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                      scooter.status
                    )}`}>
                    {scooter.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Battery
                      className={`mr-2 ${getBatteryColor(
                        scooter.batteryLevel
                      )}`}
                      size={16}
                    />
                    <span>Battery: {scooter.batteryLevel}%</span>
                    {isLowBattery && (
                      <span className="ml-2 text-red-500 text-xs">
                        (Low Battery)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2" size={16} />
                    <span>Station: {scooter.lastStation}</span>
                  </div>

                  {needsMaintenance && (
                    <div className="flex items-center text-sm text-red-500">
                      <Wrench className="mr-2" size={16} />
                      <span>Maintenance Required</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditScooter(scooter);
                    }}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMaintenance(scooter);
                    }}
                    className="px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 rounded">
                    Maintenance
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewTelemetry(scooter);
                    }}
                    className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded">
                    <Activity size={16} className="inline-block" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

ScooterList.propTypes = {
  scooters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      batteryLevel: PropTypes.number.isRequired,
      lastStation: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  lowBatteryScooters: PropTypes.array,
  maintenanceRequiredScooters: PropTypes.array,
  onScooterSelect: PropTypes.func.isRequired,
  onAddScooter: PropTypes.func.isRequired,
  onEditScooter: PropTypes.func.isRequired,
  onMaintenance: PropTypes.func.isRequired,
  onViewTelemetry: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    status: PropTypes.string,
    minBattery: PropTypes.string,
    station: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ScooterList;
