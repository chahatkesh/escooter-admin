import axios from 'axios';

// Base URLs for our services
const AUTH_BASE_URL = 'http://16.24.143.197:8091/api';
const SCOOTER_BASE_URL = 'http://16.24.143.197:8080/api';

// Create axios instances for each service
export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scooterApi = axios.create({
  baseURL: SCOOTER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple response interceptor for basic error handling
const handleResponse = (response) => {
  return response;
};

const handleError = (error) => {
  console.error('API Error:', error);
  return Promise.reject(error);
};

// Apply basic error handling interceptors
authApi.interceptors.response.use(handleResponse, handleError);
scooterApi.interceptors.response.use(handleResponse, handleError);

// Auth API services
export const authService = {
  // Authentication
  login: (credentials) =>
    authApi.post('/admin/login', credentials),

  getCurrentUser: () =>
    authApi.get('/admin/me'),

  // User management
  getAllUsers: () =>
    authApi.get('/users'),

  getUserById: (userId) =>
    authApi.get(`/users/${userId}`),

  createUser: (userData) =>
    authApi.post('/auth/signup', userData),
};

// Scooter API services
export const scooterService = {
  // Scooter management
  getAllScooters: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.minBattery) params.append('minBattery', filters.minBattery);

    return scooterApi.get(`/scooters/?${params}`);
  },

  getScooterById: (scooterId) =>
    scooterApi.get(`/scooters/${scooterId}`),

  getScootersByStation: (stationId) =>
    scooterApi.get(`/scooters/station/${stationId}`),

  createScooter: (scooterData) =>
    scooterApi.post('/scooters/admin/', scooterData),

  updateScooterStatus: (scooterId, status) =>
    scooterApi.put(`/scooters/admin/${scooterId}/status`, { status }),

  updateScooterStation: (scooterId, station) =>
    scooterApi.put(`/scooters/admin/${scooterId}/station`, { station }),

  updateMaintenanceStatus: (scooterId, status, maintenanceNote) =>
    scooterApi.put(`/scooters/admin/${scooterId}/maintenance`, {
      status,
      maintenanceNote
    }),

  deleteScooter: (scooterId) =>
    scooterApi.delete(`/scooters/admin/${scooterId}`),

  // Ride management
  getAllRides: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    return scooterApi.get(`/rides/all?${params}`);
  },

  // IoT Admin Routes
  getLatestTelemetry: (scooterId) =>
    scooterApi.get(`/iot/telemetry/${scooterId}`),

  getTelemetryHistory: (scooterId, startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);

    return scooterApi.get(`/iot/telemetry/${scooterId}/history?${params}`);
  },

  scheduleMaintenance: (scooterId, reason) =>
    scooterApi.post(`/iot/maintenance/${scooterId}`, { reason }),

  getMaintenanceRequired: () =>
    scooterApi.get('/iot/maintenance/required'),

  getLowBatteryScooters: () =>
    scooterApi.get('/iot/battery/low'),

  getSystemHealth: () =>
    scooterApi.get('/iot/health'),
};

export default { authService, scooterService };
