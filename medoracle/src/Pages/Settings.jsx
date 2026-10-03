import "./Settings.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUserMd,
  FaLock,
  FaBell,
  FaMoon,
  FaSignOutAlt,
  FaEnvelope,
  FaHospital,
  FaPhoneAlt
} from "react-icons/fa";

function Settings() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({

    oldPassword: "",

    newPassword: "",

    confirmPassword: ""

  });

  const [loading, setLoading] = useState(false);

  /* ===========================
        HANDLE CHANGE
  =========================== */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  /* ===========================
      UPDATE PASSWORD
  =========================== */

  const handleUpdatePassword = async (e) => {

    e.preventDefault();

    if (
      form.newPassword !== form.confirmPassword
    ) {

      return alert("Passwords do not match");

    }

    try {

      setLoading(true);

      const res = await axios.put(

        "http://localhost:5000/api/auth/change-password",

        form,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      alert(res.data.message);

      setForm({

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

      });

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Password Update Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  /* ===========================
            LOGOUT
  =========================== */

  const logout = () => {

    if (

      !window.confirm(

        "Are you sure you want to logout?"

      )

    ) return;

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");

    navigate("/");

    window.location.reload();

  };

  return (

    <div className="settings-page">

      <div className="settings-card">

        <div className="settings-header">

          <h2>

            Settings

          </h2>

          <p>

            Manage your MedOracle account and security.

          </p>

        </div>

        {/* ======================
            ACCOUNT
        ====================== */}

        <div className="settings-section">

          <h3>

            <FaUserMd />

            Account Information

          </h3>

          <div className="info-grid">

            <div className="info-box">

              <FaUserMd />

              <div>

                <span>Name</span>

                <h4>

                  {user.fullName || "--"}

                </h4>

              </div>

            </div>

            <div className="info-box">

              <FaEnvelope />

              <div>

                <span>Email</span>

                <h4>

                  {user.email || "--"}

                </h4>

              </div>

            </div>

            <div className="info-box">

              <FaHospital />

              <div>

                <span>Specialization</span>

                <h4>

                  {user.specialization ||

                    "Not Added"}

                </h4>

              </div>

            </div>

            <div className="info-box">

              <FaPhoneAlt />

              <div>

                <span>Role</span>

                <h4>

                  Doctor

                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* ======================
          PASSWORD
        ====================== */}

        <div className="settings-section">

          <h3>

            <FaLock />

            Security

          </h3>

          <form
            className="password-form"
            onSubmit={handleUpdatePassword}
          >

            <input

              type="password"

              name="oldPassword"

              placeholder="Current Password"

              value={form.oldPassword}

              onChange={handleChange}

              required

            />

            <input

              type="password"

              name="newPassword"

              placeholder="New Password"

              value={form.newPassword}

              onChange={handleChange}

              required

            />

            <input

              type="password"

              name="confirmPassword"

              placeholder="Confirm New Password"

              value={form.confirmPassword}

              onChange={handleChange}

              required

            />

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >

              {

                loading

                ?

                "Updating..."

                :

                "Update Password"

              }

            </button>

          </form>

        </div>

        {/* ======================
          PREFERENCES
        ====================== */}

        <div className="settings-section">

          <h3>

            <FaBell />

            Preferences

          </h3>

          <div className="preference-box">

            <div>

              <h4>

                Email Notifications

              </h4>

              <p>

                Coming Soon

              </p>

            </div>

            <input

              type="checkbox"

              disabled

            />

          </div>

          <div className="preference-box">

            <div>

              <h4>

                Dark Mode

              </h4>

              <p>

                Coming Soon

              </p>

            </div>

            <FaMoon
              className="coming-icon"
            />

          </div>

        </div>

        {/* ======================
            LOGOUT
        ====================== */}

        <div className="logout-section">

          <h3>

            Logout

          </h3>

          <p>

            Sign out securely from your account.

          </p>

          <button

            className="logout-btn"

            onClick={logout}

          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;