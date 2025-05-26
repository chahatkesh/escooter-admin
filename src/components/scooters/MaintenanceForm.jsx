import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const MaintenanceForm = ({ scooter, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    reason: "",
    priority: "medium",
    scheduledDate: "",
    notes: "",
  });

  useEffect(() => {
    if (scooter) {
      setFormData({
        reason: "",
        priority: "medium",
        scheduledDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  }, [scooter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the data according to API requirements
    const submitData = {
      reason: formData.reason,
      priority: formData.priority,
      scheduledDate: new Date(formData.scheduledDate).toISOString(),
      maintenanceNote: formData.notes,
    };
    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    if (!validateDate(value)) {
      alert("Please select a future date");
      return;
    }
    handleChange(e);
  };

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
        className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule Maintenance</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scooter ID
            </label>
            <input
              type="text"
              value={scooter?._id || ""}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Maintenance
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter reason for maintenance"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Date
            </label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter any additional notes"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Schedule Maintenance
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

MaintenanceForm.propTypes = {
  scooter: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MaintenanceForm;
