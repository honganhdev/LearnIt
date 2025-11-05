import apiClient from './apiClient';

const authService = {
  async login(credentials) {
    return await apiClient.post('/auth/login', credentials);
  },

  async register(credentials) {
    return await apiClient.post('/auth/register', credentials);
  },

  async checkAuth() {
    return await apiClient.get('/auth');
  },
};

export default authService;
