import "./Navbar.css";
import logo from "../assets/logo.jpeg";

import { NavLink } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  return (

    <nav className="navbar">

      {/* LOGO SECTION */}

      <div className="logo-section">

        <img
          src={logo}
          alt="MEDORACLE Logo"
          className="logo"
        />

        <div className="brand">
          <h1>MEDORACLE</h1>
          <p>AI Clinical Intelligence Platform</p>
        </div>

      </div>

      {/* NAV LINKS */}

      <ul className="nav-links">

        <li>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Home
          </NavLink>

        </li>

        {/* Dashboard sirf login user ke liye */}

        {token && (

          <li>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Dashboard
            </NavLink>

          </li>

        )}

        <li>

          <NavLink
            to="/clinical-ai"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Clinical AI
          </NavLink>

        </li>

        <li>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Reports & History
          </NavLink>

        </li>

        <li>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            About
          </NavLink>

        </li>

      </ul>

      {/* AUTH BUTTONS */}

      {!token && (

        <div className="auth-buttons">

          <NavLink to="/login">

            <button className="login-btn">
              Login
            </button>

          </NavLink>

          <NavLink to="/signup">

            <button className="signup-btn">
              Get Started
            </button>

          </NavLink>

        </div>

      )}

    </nav>

  );

}

export default Navbar;