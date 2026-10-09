import "./Login.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("doctor");
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
        {
          ...formData,
          requestedRole: selectedRole
        }
      );

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // SAVE ROLE
      const userRole = response.data.user.role || selectedRole;
      localStorage.setItem("role", userRole);

      alert(response.data.message || `${userRole.toUpperCase()} Login Successful!`);

      // REDIRECT BASED ON ROLE
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

      // NAVBAR REFRESH
      window.location.reload();
    } catch (error) {
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
        <p>Login to your MEDORACLE Account</p>

        {/* ROLE SELECTION TABS */}
        <div className="role-selector">
          <button
            type="button"
            className={`role-tab ${selectedRole === "doctor" ? "active" : ""}`}
            onClick={() => setSelectedRole("doctor")}
          >
            👨‍⚕️ Doctor Login
          </button>
          <button
            type="button"
            className={`role-tab ${selectedRole === "patient" ? "active" : ""}`}
            onClick={() => setSelectedRole("patient")}
          >
            🧑‍🌾 Patient Login
          </button>
          <button
            type="button"
            className={`role-tab ${selectedRole === "admin" ? "active" : ""}`}
            onClick={() => setSelectedRole("admin")}
          >
            🔐 Admin Login
          </button>
        </div>

        <div className="role-badge">
          Logging in as: <strong>{selectedRole.toUpperCase()}</strong>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder={
                selectedRole === "patient"
                  ? "patient@email.com"
                  : selectedRole === "admin"
                  ? "admin@medoracle.com"
                  : "doctor@email.com"
              }
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

          <button type="submit" className="login-submit">
            Log In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </button>
        </form>

        <div className="signup-link">
          Don’t have an account?{" "}
          <Link to={`/signup?role=${selectedRole}`}>
            Sign Up as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;