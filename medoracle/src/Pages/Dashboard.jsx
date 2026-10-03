import "./Dashboard.css";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import {
  FaThLarge,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserInjured,
  FaFileMedical,
  FaRegClock,
  FaChevronLeft,
  FaChevronRight,
  FaHeartbeat,
  FaStar
} from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [doctor, setDoctor] = useState({});
  const [stats, setStats] = useState({});

  const [recentPatients, setRecentPatients] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [recentAIInstances, setRecentAIInstances] = useState([]);
  const [weeklyReports, setWeeklyReports] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDoctor(res.data.doctor || {});
      setStats(res.data.stats || {});

      setRecentPatients(res.data.recentPatients || []);
      setRecentReports(res.data.recentReports || []);

      setPendingAppointments(
        res.data.pendingAppointmentList || []
      );

      setRecentAIInstances(
        res.data.recentAIInstances || []
      );

      setWeeklyReports(
        res.data.weeklyReports || []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        Loading Dashboard...
      </div>
    );

  }  

    return (

    <div className="dashboard-layout">

      {/* ===========================
              SIDEBAR
      =========================== */}

      <div className="sidebar">

        <div className="doctor-profile">

         <img
  src={
    doctor?.profileImage
      ? `http://localhost:5000/uploads/${doctor.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  }
  alt="Doctor"
/>

          <h2>

            {doctor?.fullName
              ? `Dr. ${doctor.fullName}`
              : "Dr. Doctor"}

          </h2>

          <p>

            {doctor?.specialization || "Clinical Specialist"}

          </p>

        </div>

        <ul className="sidebar-menu">

          <li
            className={
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }
            onClick={() => navigate("/dashboard")}
          >
            <FaThLarge />
            <span>Dashboard</span>
          </li>

          <li
            className={
              location.pathname === "/appointments"
                ? "active"
                : ""
            }
            onClick={() => navigate("/appointments")}
          >
            <FaCalendarAlt />
            <span>Appointments</span>
          </li>

          <li
            className={
              location.pathname === "/clinical-ai"
                ? "active"
                : ""
            }
            onClick={() => navigate("/clinical-ai")}
          >
            <FaFileMedical />
            <span>Clinical AI</span>
          </li>

          <li
            className={
              location.pathname === "/patients"
                ? "active"
                : ""
            }
            onClick={() => navigate("/patients")}
          >
            <FaUserInjured />
            <span>Patients</span>
          </li>

          <li
            className={
              location.pathname === "/reports"
                ? "active"
                : ""
            }
            onClick={() => navigate("/reports")}
          >
            <FaFileMedical />
            <span>Reports</span>
          </li>

          <li
            className={
              location.pathname === "/profile"
                ? "active"
                : ""
            }
            onClick={() => navigate("/profile")}
          >
            <FaUser />
            <span>Profile</span>
          </li>

          <li
            className={
              location.pathname === "/settings"
                ? "active"
                : ""
            }
            onClick={() => navigate("/settings")}
          >
            <FaCog />
            <span>Settings</span>
          </li>

          <li
            className="logout"
            onClick={logout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </li>

        </ul>

      </div>

      {/* ===========================
            MAIN CONTENT
      =========================== */}

      <div className="dashboard-main">

        {/* ===========================
              WELCOME BAR
        =========================== */}

        <div className="welcome-bar">

          <div className="welcome-left">

            <h1>

              Hello Dr. {doctor?.fullName || "Doctor"}

            </h1>

            <p>

              Welcome back to MEDORACLE AI Clinical Intelligence Platform

            </p>

          </div>

          <div className="welcome-right">

            <div className="mini-status">

              <div className="mini-icon green">

                +

              </div>

              <div>

                <h4>

                  New Report

                </h4>

                <p>

                  Create Report

                </p>

              </div>

            </div>

            <div className="mini-status">

              <div className="mini-icon purple">

                AI

              </div>

              <div>

                <h4>

                  Clinical AI

                </h4>

                <p>

                  Ready

                </p>

              </div>

            </div>

            <div className="mini-status">

              <div className="mini-icon blue">

                📅

              </div>

              <div>

                <h4>

                  Today

                </h4>

                <p>

                  {new Date().toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    }
                  )}

                </p>

              </div>

            </div>

            <div className="mini-status">

              <div className="mini-icon pink">

                ❤

              </div>

              <div>

                <h4>

                  Status

                </h4>

                <p>

                  Operational

                </p>

              </div>

            </div>

          </div>

        </div> 

        {/* ===========================
        TOP CARDS
=========================== */}

<div className="stats-grid">

  <div className="stats-card">

    <div className="stats-icon cyan">

      <FaUserInjured />

    </div>

    <div>

      <h4>Total Patients</h4>

      <h2>{stats.totalPatients || 0}</h2>

      <p>Registered Patients</p>

    </div>

  </div>

  <div className="stats-card">

    <div className="stats-icon purple">

      <FaCalendarAlt />

    </div>

    <div>

      <h4>Appointments</h4>

      <h2>{stats.totalAppointments || 0}</h2>

      <p>Total Bookings</p>

    </div>

  </div>

  <div className="stats-card">

    <div className="stats-icon green">

      <FaHeartbeat />

    </div>

    <div>

      <h4>AI Instances</h4>

      <h2>{stats.aiReports || 0}</h2>

      <p>Clinical AI Generated</p>

    </div>

  </div>

  <div className="stats-card">

    <div className="stats-icon blue">

      <FaFileMedical />

    </div>

    <div>

      <h4>Reports</h4>

      <h2>{stats.totalReports || 0}</h2>

      <p>Generated Reports</p>

    </div>

  </div>

</div>

{/* ===========================
      MAIN GRID START
=========================== */}

<div className="main-grid">

{/* ===========================
      TODAY PATIENTS
=========================== */}

<div className="glass-card patient-table">

  <div className="card-header">

    <h3>Today's Patients</h3>

    <button onClick={() => navigate("/patients")}>

      View All

    </button>

  </div>

  <div className="table-head">

    <span>NAME</span>

    <span>DIAGNOSIS</span>

    <span>TIME</span>

  </div>

  <div className="patient-scroll">

  {

    recentPatients.length > 0 ?

    recentPatients.map((patient) => (

      <div
        className="patient-row"
        key={patient.id}
      >

        <div className="patient-name">

          <div className="avatar">

            {patient.patientName?.substring(0,2).toUpperCase()}

          </div>

          <h4>

            {patient.patientName}

          </h4>

        </div>

        <p>

          {patient.disease || "Clinical AI"}

        </p>

        <span>

          {

            new Date(patient.createdAt).toLocaleTimeString(

              "en-IN",

              {

                hour:"2-digit",

                minute:"2-digit"

              }

            )

          }

        </span>

      </div>

    ))

    :

    <div
      style={{
        padding:"35px",
        textAlign:"center",
        color:"#64748b"
      }}
    >

      No Patients Found

    </div>

  }
  
  </div>


</div>

{/* ===========================
      LATEST PATIENT
=========================== */}

<div className="glass-card next-patient">

  <h3>

    Latest Patient

  </h3>

  {

    recentPatients.length > 0 ?

    <>

<div className="next-profile">

  <img

    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"

    alt="patient"

  />

  <h2>
    {recentPatients[0].patientName}
  </h2>

  <p>
    {recentPatients[0].disease || "Clinical AI Analysis"}
  </p>

</div>

      <div className="patient-info">

        <div>

          <FaUser />

          <span>Age</span>

          <h4>

            {recentPatients[0].age || "--"}

          </h4>

        </div>

        <div>

          <FaRegClock />

          <span>Time</span>

          <h4>

            {

              new Date(

                recentPatients[0].createdAt

              ).toLocaleTimeString(

                "en-IN",

                {

                  hour:"2-digit",

                  minute:"2-digit"

                }

              )

            }

          </h4>

        </div>

        <div>

          <FaStar />

          <span>Status</span>

          <h4 className="critical">

            Active

          </h4>

        </div>

      </div>

      <button

        className="patient-btn"

        onClick={() => navigate("/patients")}

      >

        View Details

      </button>

    </>

    :

    <div
      style={{
        padding:"40px",
        textAlign:"center",
        color:"#64748b"
      }}
    >

      No Patient Available

    </div>

  }

</div>

{/* =========================
      CALENDAR
========================= */}

<div className="glass-card calendar-card">

  <div className="calendar-top">

    <h3>Calendar</h3>

  </div>

  <div className="calendar-box">

    <div className="calendar-header">

      <button>

        <FaChevronLeft />

      </button>

      <h2>

        {new Date().toLocaleString("default", {
          month: "long",
          year: "numeric"
        })}

      </h2>

      <button>

        <FaChevronRight />

      </button>

    </div>

    <div className="week-days">

      {

        ["SUN","MON","TUE","WED","THU","FRI","SAT"].map(day=>(

          <span key={day}>

            {day}

          </span>

        ))

      }

    </div>

    <div className="calendar-grid">

      {

        Array.from({ length: 35 }, (_, i) => {

          const today = new Date().getDate();

          const number = i + 1;

          return (

            <div

              key={i}

              className={
                number === today
                  ? "calendar-date active"
                  : "calendar-date"
              }

            >

              {number <= 31 ? number : ""}

            </div>

          );

        })

      }

    </div>

  </div>

</div>

{/* =========================
      AI INSIGHTS
========================= */}

<div className="bottom-card">

  <div className="bottom-header">

    <h3>

      AI Insights

    </h3>

    <button className="week-btn">

      Live

    </button>

  </div>

  <div className="insight-list">

    <div className="insight-item">

      <div>

        <h4>

          Total Patients

        </h4>

        <p>

          {stats.totalPatients || 0} patients registered.

        </p>

      </div>

    </div>

    <div className="insight-item">

      <div>

        <h4>

          AI Instances

        </h4>

        <p>

          {stats.aiReports || 0} AI analyses completed.

        </p>

      </div>

    </div>

    <div className="insight-item">

      <div>

        <h4>

          Reports Generated

        </h4>

        <p>

          {stats.totalReports || 0} clinical reports generated.

        </p>

      </div>

    </div>

    <div className="insight-item">

      <div>

        <h4>

          Pending Appointments

        </h4>

        <p>

          {stats.pendingAppointments || 0} appointments waiting.

        </p>

      </div>

    </div>

    <div className="insight-item">

      <div>

        <h4>

          Confirmed Appointments

        </h4>

        <p>

          {stats.confirmedAppointments || 0} appointments confirmed.

        </p>

      </div>

    </div>

  </div>

</div>

{/* =========================
      APPOINTMENT REQUESTS
========================= */}

<div className="bottom-card">

  <div className="bottom-header">

    <h3>Appointment Requests</h3>

    <button
      className="week-btn"
      onClick={() => navigate("/appointments")}
    >
      View All
    </button>

  </div>

  <div className="appointment-list">

    {pendingAppointments.length === 0 ? (

      <div
        style={{
          padding: "35px",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        No Pending Appointments
      </div>

    ) : (

      pendingAppointments.map((appointment) => (

        <div
          className="request-card"
          key={appointment.id}
        >

          <div className="request-left">

            <div className="request-avatar">

              {(appointment.patientName || "P")
                .substring(0, 2)
                .toUpperCase()}

            </div>

            <div className="request-info">

              <h4>

                {appointment.patientName}

              </h4>

              <p>

                {appointment.disease ||
                  "General Consultation"}

              </p>

              <small>
                
                🕒 {appointment.appointmentTime}

              </small>

            </div>

          </div>

          <div className="appointment-actions">

            <button
              className="approve-btn"
              onClick={async () => {

                try {

                  await axios.patch(

                    `http://localhost:5000/api/appointments/approve-add-patient/${appointment.id}`,

                    {},

                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }

                  );

                  fetchDashboard();

                } catch (err) {

                  console.log(err);

                }

              }}
            >

              Approve

            </button>

            <button
              className="add-patient-btn"
              onClick={() => navigate("/patients")}
            >

              View

            </button>

          </div>

        </div>

      ))

    )}

  </div>

</div>

{/* =========================
      RECENT REPORTS
========================= */}

<div className="bottom-card">

  <div className="bottom-header">

    <h3>

      Recent Reports

    </h3>

    <button

      className="week-btn"

      onClick={() => navigate("/reports")}

    >

      View All

    </button>

  </div>

  <div className="appointment-list">

    {

      recentReports.length > 0 ?

      recentReports.map((report) => (

        <div

          className="request-card"

          key={report.id}

        >

          <div className="request-left">

            <div className="request-avatar">

              {

                report.patientName

                  ?.substring(0,2)

                  .toUpperCase()

              }

            </div>

            <div className="request-info">

              <h4>

                {report.patientName}

              </h4>

              <p>

                {

                  report.doctorDiagnosis ||

                  report.disease ||

                  "Clinical Report"

                }

              </p>

            </div>

          </div>

          <span
            style={{
              color:"#16a34a",
              fontWeight:700
            }}
          >

            Completed

          </span>

        </div>

      ))

      :

      <div
        style={{
          padding:"35px",
          textAlign:"center",
          color:"#64748b"
        }}
      >

        No Reports Available

      </div>

    }

  </div>

</div>



</div>
</div>
</div>


);

}

export default Dashboard;


