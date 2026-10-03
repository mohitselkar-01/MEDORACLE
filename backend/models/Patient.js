const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Patient = sequelize.define("Patient", {

  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  gender: {
    type: DataTypes.STRING
  },

  age: {
    type: DataTypes.INTEGER
  },

  phone: {
    type: DataTypes.STRING
  },

  bloodGroup: {
    type: DataTypes.STRING
  },

  disease: {
    type: DataTypes.STRING
  },

  symptoms: {
    type: DataTypes.TEXT
  },

  address: {
    type: DataTypes.TEXT
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Active"
  }

});

// Relation
User.hasMany(Patient, {
  foreignKey: "doctorId",
  onDelete: "CASCADE"
});

Patient.belongsTo(User, {
  foreignKey: "doctorId"
});

module.exports = Patient;