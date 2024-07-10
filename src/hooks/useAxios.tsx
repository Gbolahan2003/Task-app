import axios from 'axios';
import { useEffect, useState } from 'react';
import { URL } from '../routes';

const useAxios = () => {
  const [axiosInstance] = useState(() => {
    const instance = axios.create({
      baseURL: URL, // Adjust as necessary
      withCredentials: true,
    });

    instance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  });

  return axiosInstance;
};

export default useAxios;
