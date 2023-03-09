import { appOptions } from '@/config/env';
import axios from 'axios';

const api = axios.create({
  baseURL: `${appOptions.baseUrl}/api`,
});

export default api;