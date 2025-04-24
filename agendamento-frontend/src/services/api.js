import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // A URL do backend a partir do .env
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Isso permite enviar cookies (se estiver usando) ou tokens
});

// Interceptador para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Token armazenado
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
