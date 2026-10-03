const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define("Appointment", {

  patientName: {

    type: DataTypes.STRING,

    allowNull: false

  },

  age: {

    type: DataTypes.INTEGER,

    allowNull: false

  },

  gender: {

    type: DataTypes.STRING,

    allowNull: false

  },

  phone: {

    type: DataTypes.STRING

  },

  appointmentDate: {

    type: DataTypes.DATEONLY,

    allowNull: false

  },

  appointmentTime: {

    type: DataTypes.STRING,

    allowNull: false

  },

  disease: {

    type: DataTypes.STRING

  },

  status: {

    type: DataTypes.ENUM(

      "Pending",

      "Confirmed",

      "Completed",

      "Cancelled"

    ),

    defaultValue: "Pending"

  },

  notes: {

    type: DataTypes.TEXT

  },

  doctorId: {

    type: DataTypes.INTEGER,

    allowNull: false

  }

});

module.exports = Appointment;