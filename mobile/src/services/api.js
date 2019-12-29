import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // Android
  // baseURL: 'http://192.168.25.5:3333',
});

export default api;
