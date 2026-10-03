const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ClinicalAI = sequelize.define("ClinicalAI", {

  // Logged-in Doctor ID
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

patientId:{

type:DataTypes.INTEGER,

allowNull:false

},

  // Patient Name
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Patient Age
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Gender
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Symptoms
  symptoms: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  // Past Medical History
  history: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Current Medications
  medications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Doctor Diagnosis
  doctorDiagnosis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // AI Generated Report
  aiResponse: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },

}, {
  timestamps: true
});

module.exports = ClinicalAI;