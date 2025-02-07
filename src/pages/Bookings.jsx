// src/pages/Bookings.jsx
import React, { useState } from "react";
import BookingList from "../components/bookings/BookingList";
import BookingDetails from "../components/bookings/BookingDetails";
import BookingStats from "../components/bookings/BookingStats";

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState("list"); // 'list' or 'stats'

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
  };

  const handleBack = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      {!selectedBooking && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg ${
                view === "list"
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}>
              Bookings List
            </button>
            <button
              onClick={() => setView("stats")}
              className={`px-4 py-2 rounded-lg ${
                view === "stats"
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}>
              Analytics
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {selectedBooking ? (
        <BookingDetails booking={selectedBooking} onBack={handleBack} />
      ) : (
        <>
          {view === "list" ? (
            <BookingList onBookingSelect={handleBookingSelect} />
          ) : (
            <BookingStats />
          )}
        </>
      )}
    </div>
  );
};

export default Bookings;
