import "./Login.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
// HANDLE LOGIN

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(

      "http://localhost:5000/api/auth/login",

      formData

    );

    // SAVE TOKEN

    localStorage.setItem(
      "token",
      response.data.token
    );

    // SAVE USER

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // SAVE ROLE

    localStorage.setItem(
      "role",
      response.data.user.role
    );

    alert(response.data.message);

    // REDIRECT

    if (response.data.user.role === "admin") {

  navigate("/admin-dashboard");

}

else {

  navigate("/");   // ya navigate("/") agar Home page chahiye

}

    // NAVBAR REFRESH

    window.location.reload();

  }

  catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

};

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>
          Login to continue to MEDORACLE
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        <div className="signup-link">

          Don’t have an account?

          <Link to="/signup">
            {" "}Sign Up
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;