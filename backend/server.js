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
   CORS CONFIGURATION
========================= */

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
];

const envOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
      .map((o) => o.trim().replace(/\/+$/, ""))
      .filter(Boolean)
  : [];

const allowedOrigins = Array.from(
  new Set([...defaultAllowedOrigins, ...envOrigins])
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, uptime probes)
      if (!origin) return callback(null, true);

      // In development, allow localhost or specified origins
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      // In production, check against allowedOrigins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

/* =========================
   STATIC FILES
========================= */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   HEALTH & STATUS ROUTES
========================= */

app.get("/health", async (req, res) => {
  let dbStatus = "unknown";
  let dbDialect = "unknown";
  let dbError = null;

  try {
    await sequelize.authenticate();
    dbStatus = "connected";
    dbDialect = sequelize.getDialect();
  } catch (err) {
    dbStatus = "disconnected";
    dbError = err.message;
  }

  const isHealthy = dbStatus === "connected";

  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "unhealthy",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      dialect: dbDialect,
      ...(dbError && { error: dbError })
    }
  });
});

app.get("/", (req, res) => {
  res.json({
    name: "MEDORACLE Backend API",
    status: "running",
    version: "1.0.0"
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/clinical", clinicalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reports", reportRoutes);

/* =========================
   ERROR HANDLING MIDDLEWARE
========================= */

app.use((err, req, res, next) => {
  console.error("❌ Request Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

/* =========================
   START SERVER
========================= */

const startServer = async () => {
  try {
    console.log("⏳ Initializing database connection...");
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(
      `✅ Database Connected & Synced (${sequelize.getDialect().toUpperCase()})`
    );
  } catch (err) {
    console.error("❌ Fatal Database Connection/Sync Error:", err.message);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  const HOST = "0.0.0.0";

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  });
};

startServer();