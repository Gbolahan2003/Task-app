import axios from 'axios';
import { URL } from '../routes';

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true, // Ensure this is necessary for your use case
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
