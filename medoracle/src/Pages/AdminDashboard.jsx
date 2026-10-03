import "./AdminDashboard.css";

function AdminDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="admin-dashboard">

      <div className="admin-container">

        <h1>
          Welcome Admin
        </h1>

        <h2>
          {user?.fullName}
        </h2>

        <p>
          {user?.email}
        </p>

        <div className="admin-cards">

          <div className="admin-card">

            <h3>Total Doctors</h3>

            <p>120+</p>

          </div>

          <div className="admin-card">

            <h3>Total Reports</h3>

            <p>540+</p>

          </div>

          <div className="admin-card">

            <h3>AI Analysis</h3>

            <p>320+</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;