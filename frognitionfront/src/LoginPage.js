import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔹 Import useNavigate
import { login, logout } from './auth';
import './Register.css';
import teacher from './teacher.png';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 🔹 Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      setMessage('Login successful!');
      await wait(10000); 
      navigate('/addition'); //redirect to additionlevel 
    } catch (err) {
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <img src={teacher} alt="Teacher Icon" style={{ width: 150, height: 150 }} />
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin}>
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
};

export default LoginPage;