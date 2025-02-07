// src/pages/Reports.jsx
import React, { useState } from "react";
import RevenueReport from "../components/reports/RevenueReport";
import PaymentReport from "../components/reports/PaymentReport";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "revenue"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}>
            Revenue Report
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "payments"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}>
            Payment Report
          </button>
        </div>
      </div>

      {/* Report Content */}
      {activeTab === "revenue" ? <RevenueReport /> : <PaymentReport />}
    </div>
  );
};

export default Reports;
