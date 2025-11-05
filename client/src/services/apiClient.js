import axios from 'axios';
import { apiUrl } from '../contexts/constants';

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learn');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors consistently
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorResponse = {
      success: false,
      message: error.response?.data?.message || error.message || 'Server Error',
    };

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error);
    }

    return Promise.resolve(errorResponse);
  }
);

export default apiClient;
