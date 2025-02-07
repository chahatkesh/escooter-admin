import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from "lucide-react";

// Dummy data remains the same...
const paymentData = [
  {
    id: "PAY-001",
    userId: "USR-123",
    userName: "John Doe",
    amount: 15.5,
    method: "Credit Card",
    status: "successful",
    date: "2024-02-06T10:30:00",
    cardLast4: "4242",
  },
  {
    id: "PAY-002",
    userId: "USR-124",
    userName: "Jane Smith",
    amount: 12.75,
    method: "Debit Card",
    status: "failed",
    date: "2024-02-06T11:00:00",
    cardLast4: "1234",
  },
];

const PaymentReport = () => {
  const [payments, setPayments] = useState(paymentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const getStatusColor = (status) => {
    const colors = {
      successful: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const StatusIcon = ({ status, className }) => {
    const icons = {
      successful: CheckCircle,
      failed: XCircle,
      pending: AlertTriangle,
    };
    const Icon = icons[status] || CheckCircle;
    return <Icon className={className} />;
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterPayments(term, dateRange);
  };

  const filterPayments = (term, dates) => {
    let filtered = paymentData.filter(
      (payment) =>
        payment.id.toLowerCase().includes(term) ||
        payment.userName.toLowerCase().includes(term) ||
        payment.userId.toLowerCase().includes(term)
    );

    if (dates.start && dates.end) {
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.date);
        return (
          paymentDate >= new Date(dates.start) &&
          paymentDate <= new Date(dates.end)
        );
      });
    }

    setPayments(filtered);
  };

  // Calculate summary metrics
  const summary = {
    totalAmount: payments.reduce(
      (sum, p) => sum + (p.status === "successful" ? p.amount : 0),
      0
    ),
    successfulCount: payments.filter((p) => p.status === "successful").length,
    failedCount: payments.filter((p) => p.status === "failed").length,
    pendingCount: payments.filter((p) => p.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Payments</p>
              <h3 className="text-2xl font-semibold mt-1">
                ${summary.totalAmount.toFixed(2)}
              </h3>
            </div>
            <div className="bg-teal-50 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </motion.div>

        {[
          {
            label: "Successful",
            count: summary.successfulCount,
            color: "green",
            status: "successful",
          },
          {
            label: "Failed",
            count: summary.failedCount,
            color: "red",
            status: "failed",
          },
          {
            label: "Pending",
            count: summary.pendingCount,
            color: "yellow",
            status: "pending",
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <h3 className="text-2xl font-semibold mt-1">{item.count}</h3>
              </div>
              <div className={`bg-${item.color}-50 p-3 rounded-full`}>
                <StatusIcon
                  status={item.status}
                  className={`h-6 w-6 text-${item.color}-600`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rest of the component remains the same... */}
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => {
                  const newRange = { ...dateRange, start: e.target.value };
                  setDateRange(newRange);
                  filterPayments(searchTerm, newRange);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span>to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => {
                  const newRange = { ...dateRange, end: e.target.value };
                  setDateRange(newRange);
                  filterPayments(searchTerm, newRange);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.userId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.method} •••• {payment.cardLast4}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        payment.status
                      )}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
