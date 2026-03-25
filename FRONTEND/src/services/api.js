// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:3000/api' });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const signup = (data) => API.post('/signup', data);
// export const login = (data) => API.post('/login', data);
// export const getMe = () => API.get('/auth/me');
// export const askAI = (query) => API.post('/ai', { query });

// export default API;

import axios from 'axios';

// --- UPDATED BASE URL ---
// We changed this from localhost:3000 to your EC2 Public IP and Port 5000
const API = axios.create({ 
  baseURL: 'http://100.27.206.165:5000/api' 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API ENDPOINTS ---
// Note: Your server.js has app.post('/signup') and app.post('/login') 
// without the '/api' prefix in some routes. 
// If your backend routes are app.use('/api/auth', authRoutes), 
// then these should match:

export const signup = (data) => API.post('/auth/signup', data); // Check if prefix is /auth
export const login = (data) => API.post('/auth/login', data);   
export const getMe = () => API.get('/auth/me');
export const askAI = (query) => API.post('/ai/simplify', { query }); // Updated to match your ai.js route
export const extractKeyword = (content) => API.post('/ai/keyword', { content });

export default API;