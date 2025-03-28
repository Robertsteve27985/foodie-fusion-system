
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class Api {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Set token for authenticated requests
  setToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  // Clear token on logout
  clearToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Auth methods
  async login(email, password) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async getUserProfile() {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  async updateProfile(userData) {
    const response = await this.client.put('/auth/profile', userData);
    return response.data;
  }

  // Food methods
  async getFoods() {
    const response = await this.client.get('/foods');
    return response.data;
  }

  async getFood(id) {
    const response = await this.client.get(`/foods/${id}`);
    return response.data;
  }

  async getFoodsByCategory(category) {
    const response = await this.client.get(`/foods/category/${category}`);
    return response.data;
  }

  async getPopularFoods() {
    const response = await this.client.get('/foods/filter/popular');
    return response.data;
  }

  // Order methods
  async createOrder(orderData) {
    const response = await this.client.post('/orders', orderData);
    return response.data;
  }

  async getUserOrders() {
    const response = await this.client.get('/orders/user');
    return response.data;
  }

  async getOrder(id) {
    const response = await this.client.get(`/orders/${id}`);
    return response.data;
  }
}

export default new Api();
