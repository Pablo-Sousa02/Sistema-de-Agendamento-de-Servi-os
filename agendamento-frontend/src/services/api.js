import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agendamento-backend.onrender.com/api',  // Ajuste para o URL completo
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
