// auth.js
import axios from 'axios';

const login = async (username, password) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/login/',
      { username, password },
      { withCredentials: true }
    );
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/logout/',
      {},
      { withCredentials: true }
    );
    console.log('Logout successful:', response.data);
  } catch (error) {
    console.error('Logout failed:', error.response?.data || error.message);
  }
};

export { login, logout };
