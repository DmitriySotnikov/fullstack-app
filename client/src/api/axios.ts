import { baseURL } from '@/config/api';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Таймаут запросов
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;