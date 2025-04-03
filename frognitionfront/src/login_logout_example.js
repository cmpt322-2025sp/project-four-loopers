import axios from 'axios';


const login = async (username, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
      username,
      password,
    }, {
      withCredentials: true, // Ensures cookies are sent with the request
    });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
};

// Check AdditionLevel.js for correct usage of fetch() with this implementation
// Important: use 'withCredentials: true' for all axios requests, as the cookies are responsible for maintaining the session


const logout = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/logout/',
      {}, // No body needed
      {
        withCredentials: true, // Ensures cookies are sent
      }
    );
    console.log('Logout successful:', response.data);
  } catch (error) {
    console.error('Logout failed:', error.response?.data || error.message);
  }
};