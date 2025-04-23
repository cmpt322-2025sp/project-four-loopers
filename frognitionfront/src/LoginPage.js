import React, { useState } from 'react';
import { useNavigate,useHistory } from 'react-router-dom'; // 🔹 Import useNavigate
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useFormik } from "formik";


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));

}
function LoginPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  
const handleLogin = async (username, password) => {
  try {
    const response = await axios.post("/auth/login/", {
      username,
      password,
    });

    const { token, user} = response.data;

    localStorage.setItem("token",token);
    dispatch({type: "LOGIN_SUCCESS", payload: user});

    setMessage("");
    //TODO: redirecting to additionLEVEL PLACEHOLDER FOR NOW
    history.push("/addition");
  } catch (error) {
    if (axios.isAxiosError?.(error)) {
      if (error.response) {
        setMessage(error.response.data.message || "Login failed.");
      } else {
        setMessage("No response from server.");

      }
    } else {
      setMessage("Unexpected error occurred.");

    }
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
      email: Yup.string().trim().required("Le nom d'utilisateur est requis"),
      password: Yup.string().trim().required("Le mot de passe est requis"),
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
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
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

export default Login;






// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login(formData.username, formData.password);
//       setMessage('Login successful!');
//       await wait(10000); 
//       navigate('/addition'); //redirect to additionlevel 
//     } catch (err) {
//       setMessage('Login failed. Check your credentials.');
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="form-container">
//         <img src={teacher} alt="Teacher Icon" style={{ width: 150, height: 150 }} />
//         <h2 className="form-title">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="input-container">
//             <i className="fas fa-user"></i>
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="input-field"
//             />
//           </div>

//           <div className="input-container">
//             <i className="fas fa-lock"></i>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="input-field"
//             />
//           </div>

//           <button type="submit" className="submit-button">Login</button>
//         </form>

//         <p className="message">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;