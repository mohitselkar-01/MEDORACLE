import "./Signup.css";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("doctor");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "",
    password: ""
  });

  useEffect(() => {
    const urlRole = searchParams.get("role");
    if (urlRole && (urlRole === "patient" || urlRole === "doctor")) {
      setRole(urlRole);
    }
  }, [searchParams]);

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
        "http://localhost:5000/api/auth/signup",
        {
          ...formData,
          role
        }
      );

      alert(response.data.message || "Signup Successful! Please Log In.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>
          Create {role === "patient" ? "Patient Account" : "Doctor Account"}
        </h1>

        <p>
          {role === "patient"
            ? "Register for your MEDORACLE Patient Portal"
            : "Join MEDORACLE AI Clinical Intelligence Platform"}
        </p>

        {/* ROLE SELECTION TABS */}
        <div className="signup-role-selector">
          <button
            type="button"
            className={`signup-role-tab ${role === "doctor" ? "active" : ""}`}
            onClick={() => setRole("doctor")}
          >
            👨‍⚕️ Doctor Account
          </button>
          <button
            type="button"
            className={`signup-role-tab ${role === "patient" ? "active" : ""}`}
            onClick={() => setRole("patient")}
          >
            🧑‍🌾 Patient Account
          </button>
        </div>

        <form onSubmit={handleSignup}>
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder={role === "patient" ? "John Doe" : "Dr. John Doe"}
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
                placeholder={role === "patient" ? "patient@email.com" : "doctor@email.com"}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {role === "doctor" && (
              <div className="input-group">
                <label>Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>
            )}

            <div className={`input-group ${role === "patient" ? "full-width" : ""}`}>
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
            Create {role === "patient" ? "Patient Account" : "Doctor Account"}
          </button>
        </form>

        <div className="login-link-container">
          Already have an account?{" "}
          <Link to="/login">
            Log In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
