import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup'; 

function LoginPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  
  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("/auth/login/", {
        username,
        password,
      });

      const { token, user } = response.data;

      // Save token and user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));  // Store user info

      setMessage("");
      // Redirect to addition level or dashboard
      navigate("/addition");  // Replace with your target route, e.g. "/dashboard"
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Username is required"),
      password: Yup.string().trim().required("Password is required"),
    }),
  });

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && <div>{formik.errors.email}</div>}
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && <div>{formik.errors.password}</div>}
          </div>
          <div className="text-danger text-center my-2" hidden={false}>
            {message}
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
