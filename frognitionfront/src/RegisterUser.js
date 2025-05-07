/* This is a simple registration form that sends a POST request to the server to register a new user.
 * TODO: Customize page to fit style
 */

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import teacher from './teacher.png';
import { useDispatch } from 'react-redux';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', class_name: 'class_1'});
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://django.stargazer-vega.ts.net/auth/register/', formData);
      // dispatch(loginAction(response.data.user)); // Dispatch the user info to Redux
      setMessage('Account Created');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed. Please check your credentials.');
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
          <i className="fas fa-first"></i>
          <input
            type="firstname"
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="input-container">
          <i className="fas fa-last"></i>
          <input
            type="lastname"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="email"
            placeholder="email"
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