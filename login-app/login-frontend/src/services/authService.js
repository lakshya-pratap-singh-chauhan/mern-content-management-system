import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

const register = (username, password) => {
  return axios.post(API_URL + 'register', { username, password });
};

const login = (username, password) => {
  return axios.post(API_URL + 'login', { username, password })
    .then(response => {
      if (response.data.username) {
        localStorage.setItem("username", response.data.username);  // Ensure correct key used
      }
      if (response.data.token) {
        localStorage.setItem('auth-token', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('username');  // Clear username on logout
  localStorage.removeItem('auth-token');
};

export default {
  register,
  login,
  logout,
};
