import axios from 'axios';
import Cookies from 'js-cookie';
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const login = async (username, password) => {
  try {
    // Step 1: Get CSRF token
    await axios.get('http://localhost:8000/auth/csrf/', {
      withCredentials: true, // ensures cookies are handled
    });

    // Step 2: Get the CSRF token from the cookies
    const csrftoken = Cookies.get('csrftoken');
    console.log('CSRF Token:', csrftoken); // Log the token for debugging
    console.log('Username:', username); // Log the username for debugging
    console.log('Password:', password); // Log the password for debugging

    const response = await axios.post(
      'http://localhost:8000/auth/login/',
      { username, password },
      {
        headers: {
          'X-CSRFToken': csrftoken,  // CSRF token in headers
        },
        withCredentials: true,  // Include cookies for session management
      }
    );
    return response.data;  // Return the login response data
  } catch (error) {
    console.error('Login failed:', error.response || error);  // Handle login error
  }
};
