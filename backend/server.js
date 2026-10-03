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
    console.log("✅ Database Connected (MySQL)");
  } catch (err) {
    console.log("⚠️ MySQL connection failed. Initializing SQLite fallback...");
    try {
      const { Sequelize } = require("sequelize");
      const sqliteSequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(__dirname, "database.sqlite"),
        logging: false
      });

      const User = require("./models/User");
      const ClinicalAI = require("./models/ClinicalAI");
      const Patient = require("./models/Patient");
      const Appointment = require("./models/Appointment");
      const Report = require("./models/Report");

      const models = [User, ClinicalAI, Patient, Appointment, Report];
      for (const model of models) {
        if (model.sequelize) {
          model.sequelize = sqliteSequelize;
        }
      }
      await sqliteSequelize.sync();
      console.log("✅ Database Connected & Synced (SQLite Fallback)");
    } catch (sqliteErr) {
      console.log("⚠️ SQLite fallback notice:", sqliteErr.message);
    }
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();