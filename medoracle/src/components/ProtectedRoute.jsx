import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // AGAR LOGIN NAHI HAI

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // AGAR ADMIN ROUTE HAI

  if (adminOnly && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ACCESS ALLOWED

  return children;
}

export default ProtectedRoute;