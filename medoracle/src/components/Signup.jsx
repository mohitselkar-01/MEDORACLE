import "./Signup.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "",
    password: ""
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        formData
      );

      alert(response.data.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create Doctor Account</h1>

        <p>Join MEDORACLE AI Clinical Intelligence Platform</p>

        <form onSubmit={handleSignup}>
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Dr. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="doctor@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Specialization</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="signup-submit">
            Create Account
          </button>
        </form>

        <div className="login-link-container" style={{ marginTop: "24px", textAlign: "center", color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0f4c81", fontWeight: "600", textDecoration: "none" }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
