const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {

  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "doctor"
  },

  specialization: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  phone: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  qualification: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  experience: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  hospital: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  address: {
    type: DataTypes.TEXT,
    defaultValue: ""
  },

  bio: {
    type: DataTypes.TEXT,
    defaultValue: ""
  },

  profileImage: {
    type: DataTypes.STRING,
    defaultValue: null
  }

},
{
  timestamps: true
});

module.exports = User;