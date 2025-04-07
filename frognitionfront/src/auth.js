// auth.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Base URL for all requests
  withCredentials: true, // Send cookies with requests
});

let csrfToken = ''; // Variable to store the CSRF token

// Function to fetch CSRF token from the server
const getCSRFToken = async () => {
  try {
    const response = await api.get('/auth/csrf-cookie/'); // Sends a request to a specific endpoint to get a cookie
    csrfToken = response.headers['x-csrftoken'] || ''; // Extract CSRF token from response headers or cookies
  } catch (error) {
    console.error('Error getting CSRF token:', error);
  }
};

const login = async (username, password) => {
  await getCSRFToken(); // Ensure the CSRF token is fetched before login
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/login/',
      { username, password },
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrfToken, // Include the CSRF token in the header
        },
      }
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
