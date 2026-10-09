const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const sequelize = require("./config/db");

// Models
require("./models/User");
require("./models/ClinicalAI");
require("./models/Patient");
require("./models/Appointment");
require("./models/Report");

// Routes
const authRoutes = require("./routes/authRoutes");
const clinicalRoutes = require("./routes/clinicalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const patientRoutes = require("./routes/patientRoutes");
const reportRoutes = require("./routes/reportRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   STATIC FILES
========================= */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/clinical", clinicalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use("/api/reports", reportRoutes);

/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
  res.send("MEDORACLE Backend Running");
});

/* =========================
   START SERVER
========================= */

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`✅ Database Connected & Synced (${sequelize.getDialect().toUpperCase()})`);
  } catch (err) {
    console.error("❌ Database Connection/Sync Error:", err.message);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();