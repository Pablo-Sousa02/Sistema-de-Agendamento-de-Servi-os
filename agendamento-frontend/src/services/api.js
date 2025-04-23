import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ajuste se necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
