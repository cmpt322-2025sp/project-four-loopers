import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup'; 
import './LoginPage.css';
import subwayLogo from './Subway_2016_logo.png';
import { useDispatch } from "react-redux";
import authSlice from './auth';

function LoginPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("https://django.stargazer-vega.ts.net/auth/login/", {
        username,
        password,
      });

      dispatch(
        authSlice.actions.setAuthTokens({
          token: response.data.access,
          refreshToken: response.data.refresh,
        })
      );
      dispatch(authSlice.actions.setAccount(response.data.user));

      navigate("/map"); 
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleLogin(values.username, values.password);
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required("Username is required"),
      password: Yup.string().trim().required("Password is required"),
    }),
  });

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">
          Welcome Back! 🐸
        </h1>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="input-group">
            <input
              className="login-input"
              id="username"
              type="username"
              placeholder="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && (
              <div className="error-message">{formik.errors.username}</div>
            )}
          </div>
          <div className="input-group">
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          {message && (
            <div className="error-message text-center">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <span>
                <span className="loading-spinner"></span>
                {" Loading..."}
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="subway-login-button"
            onClick={() => alert("Subway authentication coming soon... 🥪")}
          >
            <img src={subwayLogo} alt="Subway Logo" className="subway-logo" />
            Gonne be here a while? Grab a sandwich!
          </button>

          <div className="register-link-container">
            <span className="register-text">New user? </span>
            <Link 
              to="/register" 
              className="register-link"
            >
              Register here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
