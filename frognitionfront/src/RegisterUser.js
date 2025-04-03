/* This is a simple registration form that sends a POST request to the server to register a new user.
 * TODO: Customize page to fit style
 */

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import teacher from './teacher.png';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register/', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="register-container">
    <div className="form-container">
    <img src={teacher} alt="Teacher Icon" style={{ width: 150, height: 150 }} />
      <h2 className="form-title">Create Account</h2>
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
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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

        <button type="submit" className="submit-button">Create Account</button>
      </form>
      <p className="message">{message}</p>
    </div>
  </div>
);
}

export default Register;