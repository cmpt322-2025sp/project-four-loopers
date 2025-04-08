import axios from 'axios';

const getCSRFToken = async () => {
  try {
    // Request CSRF token from Django
    const response = await axios.get('http://127.0.0.1:8000/auth/csrf-token/');
    const csrfToken = response.data.csrf_token;
    console.log('CSRF Token fetched:', csrfToken);  // Log token to confirm it's correct
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw new Error('Failed to fetch CSRF token');
  }
};

const login = async (username, password) => {
  try {
    // Get CSRF token before making login request
    const csrfToken = await getCSRFToken();
    console.log('Sending CSRF token in login request:', csrfToken);  // Log token to confirm

    // Make the login request with CSRF token in header
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/login/',  // Replace with your login endpoint
      { username, password },
      {
        headers: {
          'X-CSRFToken': csrfToken,  // CSRF token header
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response || error);  // Log error details
    throw new Error('Login failed');
  }
};

export{ login, getCSRFToken };