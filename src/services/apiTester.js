import { authService, scooterService } from './api';

/**
 * API Testing Utility for Barq Scooter Admin Panel
 * This utility helps test all backend integrations and authentication flows
 */

class ApiTester {
  constructor() {
    this.testResults = [];
    this.adminToken = null;
    this.userToken = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const result = { timestamp, message, type };
    this.testResults.push(result);
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Test Scooter Management APIs
  async testScooterManagement() {
    try {
      // Test GET /scooters/
      const scootersResponse = await this.testEndpoint('GET', '/scooters/');
      if (!scootersResponse.success) return false;

      // Test GET /scooters/{id}
      const scooterId = scootersResponse.data[0]?.id;
      if (scooterId) {
        const scooterResponse = await this.testEndpoint('GET', `/scooters/${scooterId}`);
        if (!scooterResponse.success) return false;
      }

      // Test POST /scooters/
      const newScooter = {
        name: `Test Scooter ${Date.now()}`,
        status: 'available',
        batteryLevel: 100,
        lastStation: 'Test Station',
      };
      const createResponse = await this.testEndpoint('POST', '/scooters/', newScooter);
      if (!createResponse.success) return false;

      // Test PUT /scooters/{id}
      if (createResponse.data?.id) {
        const updateResponse = await this.testEndpoint(
          'PUT',
          `/scooters/${createResponse.data.id}`,
          { status: 'maintenance' }
        );
        if (!updateResponse.success) return false;
      }

      return true;
    } catch (error) {
      this.log(`Scooter Management Test Error: ${error.message}`, 'error');
      return false;
    }
  }

  // Test Ride Management APIs
  async testRideManagement() {
    try {
      // Test GET /rides/
      const ridesResponse = await this.testEndpoint('GET', '/rides/');
      if (!ridesResponse.success) return false;

      // Test GET /rides/{id}
      const rideId = ridesResponse.data[0]?.id;
      if (rideId) {
        const rideResponse = await this.testEndpoint('GET', `/rides/${rideId}`);
        if (!rideResponse.success) return false;
      }

      return true;
    } catch (error) {
      this.log(`Ride Management Test Error: ${error.message}`, 'error');
      return false;
    }
  }

  // Test IoT Management APIs
  async testIoTManagement() {
    try {
      // Test GET /scooters/{id}/telemetry
      const scootersResponse = await this.testEndpoint('GET', '/scooters/');
      if (!scootersResponse.success) return false;

      const scooterId = scootersResponse.data[0]?.id;
      if (scooterId) {
        const telemetryResponse = await this.testEndpoint(
          'GET',
          `/scooters/${scooterId}/telemetry`
        );
        if (!telemetryResponse.success) return false;
      }

      return true;
    } catch (error) {
      this.log(`IoT Management Test Error: ${error.message}`, 'error');
      return false;
    }
  }

  // Run all tests
  async runAllTests() {
    this.log('Starting Complete API Integration Tests', 'info');
    this.testResults = [];

    const testSuite = [
      { name: 'Scooter Management', test: () => this.testScooterManagement() },
      { name: 'Ride Management', test: () => this.testRideManagement() },
      { name: 'IoT Management', test: () => this.testIoTManagement() },
    ];

    const results = {};

    for (const { name, test } of testSuite) {
      this.log(`\n=== ${name} ===`, 'info');
      try {
        results[name] = await test();
        if (results[name]) {
          this.log(`✅ ${name} - PASSED`, 'success');
        } else {
          this.log(`❌ ${name} - FAILED`, 'error');
        }
      } catch (error) {
        results[name] = false;
        this.log(`❌ ${name} - ERROR: ${error.message}`, 'error');
      }

      // Add delay between tests
      await this.delay(1000);
    }

    // Summary
    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    this.log(`\n=== TEST SUMMARY ===`, 'info');
    this.log(`Passed: ${passed}/${total}`, passed === total ? 'success' : 'error');

    Object.entries(results).forEach(([name, passed]) => {
      this.log(`${passed ? '✅' : '❌'} ${name}`, passed ? 'success' : 'error');
    });

    return { results, testResults: this.testResults };
  }

  // Generate test report
  generateReport() {
    const passed = this.testResults.filter(r => r.type === 'success').length;
    const failed = this.testResults.filter(r => r.type === 'error').length;
    const total = this.testResults.length;

    return {
      summary: {
        total,
        passed,
        failed,
        success_rate: total > 0 ? ((passed / total) * 100).toFixed(2) : 0
      },
      logs: this.testResults
    };
  }

  // Helper method to test an endpoint
  async testEndpoint(method, endpoint, data = null) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: data ? JSON.stringify(data) : undefined
      });

      const responseData = await response.json();
      const success = response.ok;

      this.testResults.push({
        endpoint,
        method,
        success,
        status: response.status,
        response: responseData
      });

      return {
        success,
        data: responseData
      };
    } catch (error) {
      this.log(`Error testing ${method} ${endpoint}: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }
}

// Export for use in components
export default ApiTester;

// Utility functions for manual testing
export const testAdminLogin = async (email = 'admin@barqscoot.com', password = 'AdminPass123') => {
  try {
    const response = await authService.login({ email, password });
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const testCreateAdmin = async (email = 'admin@barqscoot.com', password = 'AdminPass123') => {
  try {
    const response = await authService.createAdmin({ email, password });
    console.log('Admin created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Admin creation failed:', error.response?.data || error.message);
    throw error;
  }
};

export const testGetScooters = async () => {
  try {
    const response = await scooterService.getAllScooters();
    console.log('Scooters retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get scooters failed:', error.response?.data || error.message);
    throw error;
  }
};
