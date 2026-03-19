import axios from 'axios';

const API = axios.create({ baseURL: 'http://44.222.209.204:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => API.post('/signup', data);
export const login  = (data) => API.post('/login', data);
export const getMe  = ()     => API.get('/auth/me');

export default API;
