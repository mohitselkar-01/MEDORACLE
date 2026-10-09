import "./DashboardNavbar.css";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpeg";

import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaCog,
  FaChevronDown,
  FaSignOutAlt
} from "react-icons/fa";

function DashboardNavbar() {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // =========================
  // PROFILE IMAGE
  // =========================

  const profileImage = user.profileImage
    ? `http://localhost:5000/uploads/${user.profileImage}`
    : null;

  // =========================
  // FIRST LETTER
  // =========================

  const firstLetter = user.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "D";

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/", { replace: true });

    window.location.reload();

  };

  return (

    <nav className="dashboard-navbar">

      {/* LEFT */}

      <div className="dashboard-logo-section">

        <img
          src={logo}
          alt="logo"
          className="dashboard-logo"
        />

        <div className="dashboard-brand">

          <h1>MEDORACLE</h1>

          <p>AI Clinical Intelligence Platform</p>

        </div>

      </div>

      {/* CENTER */}

      <ul className="dashboard-links">

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/clinical-ai">Clinical AI</NavLink>
        </li>

        <li>
          <NavLink to="/reports">Reports</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

      </ul>

      {/* RIGHT */}

      <div className="dashboard-right">

        <div className="dashboard-icon">
          <FaSearch />
        </div>

        <div className="dashboard-icon">
          <FaBell />
        </div>

        <div className="dashboard-icon">
          <FaEnvelope />
        </div>

        {/* PROFILE */}

        <div className="dashboard-profile-wrapper">

          <div
            className="dashboard-profile"
            onClick={() => setShowMenu(!showMenu)}
          >

            {
              profileImage ? (

                <img
                  src={profileImage}
                  alt="profile"
                  className="profile-image"
                />

              ) : (

                <div className="profile-avatar">

                  {firstLetter}

                </div>

              )
            }

            <div>

              <h4>

                {user.fullName || (user.role === "patient" ? "Patient" : user.role === "admin" ? "Admin" : "Doctor")}

              </h4>

              <p>

                {user.role === "patient"
                  ? "Patient Portal"
                  : user.role === "admin"
                  ? "System Administrator"
                  : (user.specialization || "Medical Specialist")}

              </p>

            </div>

            <FaChevronDown className="profile-arrow" />

          </div>

          {showMenu && (

            <div className="profile-dropdown">

              <div
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >

                <FaUserCircle />

                <span>My Profile</span>

              </div>

              <div
                className="dropdown-item"
                onClick={() => navigate("/settings")}
              >

                <FaCog />

                <span>Settings</span>

              </div>

              <div
                className="dropdown-item logout-item"
                onClick={logout}
              >

                <FaSignOutAlt />

                <span>Logout</span>

              </div>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}

export default DashboardNavbar;