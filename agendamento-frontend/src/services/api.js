import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ajuste se seu backend estiver rodando em outra porta
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;