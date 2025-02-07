// src/components/users/UserDetails.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';

const UserDetails = ({ user }) => {
  // Dummy user data
  const userData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City, Country',
    joinDate: '2024-01-15',
    totalRides: 15,
    totalSpent: 234.50,
    lastRide: '2024-02-01',
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '4242' },
      { id: 2, type: 'Mastercard', last4: '8888' }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'Ride Completed',
        date: '2024-02-01',
        details: '15 min ride - $8.50'
      },
      {
        id: 2,
        type: 'Payment Added',
        date: '2024-01-28',
        details: 'Added Mastercard ending in 8888'
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={`/api/placeholder/80/80`}
            alt={userData.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {userData.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {userData.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Member Since
              </div>
              <span className="font-medium">{new Date(userData.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Total Rides
              </div>
              <span className="font-medium">{userData.totalRides}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <CreditCard className="w-4 h-4 mr-2" />
                Total Spent
              </div>
              <span className="font-medium">${userData.totalSpent.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {userData.paymentMethods.map(method => (
              <div key={method.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{method.type} •••• {method.last4}</span>
                </div>
                <button className="text-sm text-teal-600 hover:text-teal-700">Remove</button>
              </div>
            ))}
            <button className="w-full mt-4 px-4 py-2 text-sm text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50">
              Add Payment Method
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {userData.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start justify-between p-4 bg-white rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{activity.type}</h4>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDetails;