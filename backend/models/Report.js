const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Report = sequelize.define("Report", {

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

  symptoms: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  diagnosis: {
    type: DataTypes.TEXT
  },

  prescription: {
    type: DataTypes.TEXT
  },

  notes: {
    type: DataTypes.TEXT
  },

  reportDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },

  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  patientId:{

type:DataTypes.INTEGER,

allowNull:false

}
  

});

module.exports = Report;