import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import ClinicalAI from "./Pages/ClinicalAI";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Reports from "./Pages/Reports";
import Patients from "./Pages/Patients";
import Appointments from "./Pages/Appointments";
import About from "./Pages/About";

import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {

  const token = localStorage.getItem("token");

  return (
    <>

      {/* Navbar */}
      {token ? <DashboardNavbar /> : <Navbar />}

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= USER ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clinical-ai"
          element={
            <ProtectedRoute>
              <ClinicalAI />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />


        <Route path="/about" element={<About />} />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Footer sirf public pages par dikhana ho to baad me condition laga sakte hain */}
      <Footer />

    </>
  );
}

function App() {

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

}

export default App;