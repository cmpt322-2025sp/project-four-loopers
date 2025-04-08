import axios from 'axios';
import Cookies from 'js-cookie';

export const login = async (username, password) => {
  // First, get CSRF cookie
  await axios.get('http://localhost:8000/auth/csrf/', {
    withCredentials: true, // ensures cookies are handled
  });

  // Then get the token from cookies
  const csrftoken = Cookies.get('csrftoken');
  console.log('CSRF Token:', csrftoken); // Log the token for debugging

  const response = await axios.post(
    'http://localhost:8000/auth/login/',
    { username, password },
    {
      headers: {
        'X-CSRFToken': csrftoken,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const logout = async () => {
  // Optional: re-fetch CSRF before logout
  await axios.get('/api/csrf/', { withCredentials: true });
  const csrftoken = Cookies.get('csrftoken');

  await axios.post(
    '/api/logout/',
    {},
    {
      headers: {
        'X-CSRFToken': csrftoken,
      },
      withCredentials: true,
    }
  );
};

