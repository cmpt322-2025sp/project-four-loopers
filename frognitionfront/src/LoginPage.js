// src/LoginPage.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Register.css'; // Reuse your nice CSS
import teacher from './teacher.png'; // Reuse the teacher image

const loginAction = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', formData);
      dispatch(loginAction(response.data.user)); // Dispatch the user info to Redux
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <img src={teacher} alt="Teacher Icon" style={{ width: 150, height: 150 }} />
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">Login</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default LoginPage;
