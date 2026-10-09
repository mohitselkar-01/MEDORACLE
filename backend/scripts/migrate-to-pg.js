/**
 * MEDORACLE Data Migration Utility (SQLite -> PostgreSQL)
 *
 * Copies existing records from local SQLite (backend/database.sqlite)
 * into a configured PostgreSQL database (via DATABASE_URL).
 *
 * Does NOT overwrite or delete the SQLite database.
 * Run with: DATABASE_URL="postgres://..." node scripts/migrate-to-pg.js
 */

require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { Sequelize, DataTypes } = require("sequelize");

const sqliteDbPath = path.join(__dirname, "../database.sqlite");

async function migrate() {
  const targetUrl = process.env.DATABASE_URL;
  if (!targetUrl) {
    console.error("❌ ERROR: DATABASE_URL environment variable is required to migrate to PostgreSQL.");
    console.error("Example: DATABASE_URL=postgres://user:pass@host:5432/medoracle node scripts/migrate-to-pg.js");
    process.exit(1);
  }

  if (!fs.existsSync(sqliteDbPath)) {
    console.error("❌ ERROR: SQLite database file not found at:", sqliteDbPath);
    process.exit(1);
  }

  console.log("==========================================");
  console.log("MEDORACLE DATA MIGRATION: SQLite -> PostgreSQL");
  console.log("==========================================");

  // Source DB (SQLite)
  const sourceDb = new Sequelize({
    dialect: "sqlite",
    storage: sqliteDbPath,
    logging: false
  });

  // Target DB (PostgreSQL)
  const isSsl = process.env.DB_SSL !== "false";
  const targetDb = new Sequelize(targetUrl, {
    dialect: "postgres",
    logging: false,
    dialectOptions: isSsl ? { ssl: { require: true, rejectUnauthorized: false } } : {}
  });

  try {
    await sourceDb.authenticate();
    console.log("✅ Connected to source SQLite database.");

    await targetDb.authenticate();
    console.log("✅ Connected to target PostgreSQL database.");

    // Define models for target DB
    const User = targetDb.define("User", {
      fullName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: "doctor" },
      specialization: { type: DataTypes.STRING, defaultValue: "" },
      phone: { type: DataTypes.STRING, defaultValue: "" },
      qualification: { type: DataTypes.STRING, defaultValue: "" },
      experience: { type: DataTypes.STRING, defaultValue: "" },
      hospital: { type: DataTypes.STRING, defaultValue: "" },
      address: { type: DataTypes.TEXT, defaultValue: "" },
      bio: { type: DataTypes.TEXT, defaultValue: "" },
      profileImage: { type: DataTypes.STRING, defaultValue: null }
    }, { timestamps: true });

    const Patient = targetDb.define("Patient", {
      patientName: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      phone: { type: DataTypes.STRING },
      bloodGroup: { type: DataTypes.STRING },
      disease: { type: DataTypes.STRING },
      symptoms: { type: DataTypes.TEXT },
      address: { type: DataTypes.TEXT },
      status: { type: DataTypes.STRING, defaultValue: "Active" },
      doctorId: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });

    const Appointment = targetDb.define("Appointment", {
      patientName: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      appointmentDate: { type: DataTypes.DATEONLY, allowNull: false },
      appointmentTime: { type: DataTypes.STRING, allowNull: false },
      disease: { type: DataTypes.STRING },
      status: {
        type: DataTypes.ENUM("Pending", "Confirmed", "Completed", "Cancelled"),
        defaultValue: "Pending"
      },
      notes: { type: DataTypes.TEXT },
      doctorId: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });

    const ClinicalAI = targetDb.define("ClinicalAI", {
      doctorId: { type: DataTypes.INTEGER, allowNull: false },
      patientId: { type: DataTypes.INTEGER, allowNull: false },
      patientName: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      symptoms: { type: DataTypes.TEXT, allowNull: false },
      history: { type: DataTypes.TEXT },
      medications: { type: DataTypes.TEXT },
      doctorDiagnosis: { type: DataTypes.TEXT },
      aiResponse: { type: DataTypes.TEXT("long") }
    }, { timestamps: true });

    const Report = targetDb.define("Report", {
      patientName: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      symptoms: { type: DataTypes.TEXT, allowNull: false },
      diagnosis: { type: DataTypes.TEXT },
      prescription: { type: DataTypes.TEXT },
      notes: { type: DataTypes.TEXT },
      reportDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      doctorId: { type: DataTypes.INTEGER, allowNull: false },
      patientId: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });

    // Sync schema in PostgreSQL
    console.log("⏳ Synchronizing PostgreSQL schema...");
    await targetDb.sync();
    console.log("✅ PostgreSQL schema synced.");

    // Migrate Users
    const [users] = await sourceDb.query("SELECT * FROM Users");
    console.log(`📦 Found ${users.length} Users in SQLite.`);
    for (const u of users) {
      const existing = await User.findByPk(u.id);
      if (!existing) {
        await User.create(u);
      }
    }
    console.log(`✅ Users migrated successfully.`);

    // Migrate Patients
    const [patients] = await sourceDb.query("SELECT * FROM Patients");
    console.log(`📦 Found ${patients.length} Patients in SQLite.`);
    for (const p of patients) {
      const existing = await Patient.findByPk(p.id);
      if (!existing) {
        await Patient.create(p);
      }
    }

    // Migrate Appointments
    const [appointments] = await sourceDb.query("SELECT * FROM Appointments");
    console.log(`📦 Found ${appointments.length} Appointments in SQLite.`);
    for (const a of appointments) {
      const existing = await Appointment.findByPk(a.id);
      if (!existing) {
        await Appointment.create(a);
      }
    }
    console.log(`✅ Appointments migrated successfully.`);

    // Migrate ClinicalAIs
    const [clinical] = await sourceDb.query("SELECT * FROM ClinicalAIs");
    console.log(`📦 Found ${clinical.length} ClinicalAI records in SQLite.`);
    for (const c of clinical) {
      const existing = await ClinicalAI.findByPk(c.id);
      if (!existing) {
        await ClinicalAI.create(c);
      }
    }

    // Migrate Reports
    const [reports] = await sourceDb.query("SELECT * FROM Reports");
    console.log(`📦 Found ${reports.length} Reports in SQLite.`);
    for (const r of reports) {
      const existing = await Report.findByPk(r.id);
      if (!existing) {
        await Report.create(r);
      }
    }

    // Update Postgres sequences so subsequent inserts start at max(id)+1
    const tables = ["Users", "Patients", "Appointments", "ClinicalAIs", "Reports"];
    for (const table of tables) {
      try {
        await targetDb.query(`
          SELECT setval(
            pg_get_serial_sequence('"${table}"', 'id'),
            COALESCE((SELECT MAX(id) FROM "${table}"), 0) + 1,
            false
          );
        `);
      } catch (seqErr) {
        // Non-fatal if sequence name differs
      }
    }

    console.log("🎉 Data migration complete! All SQLite records are now safely in PostgreSQL.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err.message);
    process.exit(1);
  } finally {
    await sourceDb.close();
    await targetDb.close();
  }
}

migrate();
