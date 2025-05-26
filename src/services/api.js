import axios from 'axios';

// Base URLs for our services
const AUTH_BASE_URL = 'http://16.24.143.197:8091/api';
const SCOOTER_BASE_URL = 'http://16.24.143.197:8080/api';

// Create axios instances for each service
export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

export const scooterApi = axios.create({
  baseURL: SCOOTER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Token management
const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('Getting token:', token ? 'Token exists' : 'No token');
  return token;
};

// Request interceptors to add auth tokens
authApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Ensure proper Bearer token format and trim any whitespace
      const cleanToken = token.trim();
      config.headers.Authorization = `Bearer ${cleanToken}`;
      // Add admin token header
      config.headers['X-Admin-Token'] = 'true';
      // Add additional headers for debugging
      config.headers['X-Request-Type'] = 'admin';
      console.log('Added token to request headers:', {
        url: config.url,
        tokenLength: cleanToken.length,
        headers: config.headers,
        token: cleanToken // Log the actual token for debugging
      });
    } else {
      console.log('No token available for request:', config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

scooterApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Ensure proper Bearer token format and trim any whitespace
      const cleanToken = token.trim();
      config.headers.Authorization = `Bearer ${cleanToken}`;
      // Add admin token header
      config.headers['X-Admin-Token'] = 'true';
      console.log('Added token to request headers:', {
        url: config.url,
        tokenLength: cleanToken.length,
        headers: config.headers
      });
    } else {
      console.log('No token available for request:', config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptors for error handling
const handleResponse = (response) => {
  console.log('API Response:', {
    url: response.config.url,
    status: response.status,
    data: response.data
  });
  return response;
};

const handleError = (error) => {
  console.error('API Error:', {
    url: error.config?.url,
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  // Handle unauthorized access
  if (error.response?.status === 401) {
    console.log('Unauthorized access, token might be invalid');
    // Don't redirect immediately, let the auth context handle it
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

// Apply error handling interceptors
authApi.interceptors.response.use(handleResponse, handleError);
scooterApi.interceptors.response.use(handleResponse, handleError);

// Auth API services
export const authService = {
  // Admin Authentication
  createAdmin: (adminData) =>
    authApi.post('/admin/create', adminData),

  login: async (credentials) => {
    try {
      const response = await authApi.post('/admin/login', credentials);
      // Store token immediately after successful login
      if (response.data.token) {
        const token = response.data.token.trim();
        localStorage.setItem('token', token);
        console.log('Stored token after login:', {
          tokenLength: token.length,
          token: token // Log the actual token for debugging
        });
      }
      return response;
    } catch (error) {
      console.error('Login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await authApi.get('/admin/me');
      console.log('getCurrentUser response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      return response;
    } catch (error) {
      console.error('getCurrentUser error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  // User management
  getAllUsers: () =>
    authApi.get('/users'),

  getUserById: (userId) =>
    authApi.get(`/users/${userId}`),

  createUser: (userData) =>
    authApi.post('/auth/signup', userData),

  updateUser: (userId, userData) =>
    authApi.put(`/users/${userId}`, userData),

  deleteUser: (userId) =>
    authApi.delete(`/users/${userId}`),

  // OTP Management
  sendOTP: (phoneData) =>
    authApi.post('/auth/send-otp', phoneData),

  verifyOTP: (otpData) =>
    authApi.post('/auth/verify-otp', otpData),
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

  createScooter: (scooterData) =>
    scooterApi.post('/scooters/admin/', scooterData),

  updateScooter: (scooterId, scooterData) =>
    scooterApi.put(`/scooters/admin/${scooterId}`, scooterData),

  updateScooterStatus: (scooterId, status) =>
    scooterApi.put(`/scooters/admin/${scooterId}/status`, { status }),

  deleteScooter: (scooterId) =>
    scooterApi.delete(`/scooters/admin/${scooterId}`),

  // Ride/Booking management
  getAllRides: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    return scooterApi.get(`/rides/all?${params}`);
  },

  getRideById: (rideId) =>
    scooterApi.get(`/rides/${rideId}`),

  endRide: (rideId) =>
    scooterApi.put(`/rides/${rideId}/end`),

  // IoT Management
  getLatestTelemetry: (scooterId) =>
    scooterApi.get(`/iot/telemetry/${scooterId}`),

  getTelemetryHistory: (scooterId, startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);
    return scooterApi.get(`/iot/telemetry/${scooterId}/history?${params}`);
  },

  getMaintenanceRequired: () =>
    scooterApi.get('/iot/maintenance/required'),

  getLowBatteryScooters: () =>
    scooterApi.get('/iot/battery/low'),

  getSystemHealth: () =>
    scooterApi.get('/iot/health'),
};

export default { authService, scooterService };
