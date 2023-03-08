import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${baseUrl}/api`,
});

export default api;