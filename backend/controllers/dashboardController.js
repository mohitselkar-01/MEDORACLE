const User = require("../models/User");
const ClinicalAI = require("../models/ClinicalAI");
const Report = require("../models/Report");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

exports.getDashboard = async (req, res) => {

  try {

    const doctorId = req.user.id;

    /* ===========================
            DOCTOR DETAILS
    =========================== */

    const doctor = await User.findByPk(doctorId, {
      attributes: [
        "id",
        "fullName",
        "email",
        "specialization",
        "profileImage"
      ]
    });

    /* ===========================
            TOTAL COUNTS
    =========================== */

    const totalPatients = await Patient.count({
      where: { doctorId }
    });

    const aiReports = await ClinicalAI.count({
      where: { doctorId }
    });

    const totalReports = await Report.count({
      where: { doctorId }
    });

    const totalAppointments = await Appointment.count({
      where: { doctorId }
    });

    const pendingAppointments = await Appointment.count({
      where: {
        doctorId,
        status: "Pending"
      }
    });

    const confirmedAppointments = await Appointment.count({
      where: {
        doctorId,
        status: "Confirmed"
      }
    });

    /* ===========================
            TODAY AI CASES
    =========================== */

    const today = new Date().toISOString().split("T")[0];

    let todayPatients = 0;

    try {

      todayPatients = await ClinicalAI.count({
        where: {
          doctorId,
          createdAt: today
        }
      });

    } catch (err) {

      todayPatients = 0;

    }

    /* ===========================
            RECENT PATIENTS
    =========================== */

    const recentPatients = await Patient.findAll({

      where: {
        doctorId
      },

      order: [
        ["createdAt", "DESC"]
      ],

      limit: 5

    });

    /* ===========================
            RECENT REPORTS
    =========================== */

    const recentReports = await Report.findAll({

      where: {
        doctorId
      },

      order: [
        ["createdAt", "DESC"]
      ],

      limit: 5

    });

    /* ===========================
        PENDING APPOINTMENTS
    =========================== */

    const pendingAppointmentList = await Appointment.findAll({

      where: {
        doctorId,
        status: "Pending"
      },

      order: [
        ["appointmentDate", "ASC"],
        ["appointmentTime", "ASC"]
      ],

      limit: 5

    });

    /* ===========================
        RECENT AI INSTANCES
    =========================== */

    const recentAIInstances = await ClinicalAI.findAll({

      where: {
        doctorId
      },

      order: [
        ["createdAt", "DESC"]
      ],

      limit: 5

    });

    /* ===========================
            WEEKLY REPORTS
    =========================== */

    const weeklyReports = [0, 0, 0, 0, 0, 0, 0];

    recentPatients.forEach((item) => {

      const day = new Date(item.createdAt).getDay();

      weeklyReports[day]++;

    });

    /* ===========================
            RESPONSE
    =========================== */

    res.status(200).json({

      doctor,

      stats: {

        totalPatients,

        todayPatients,

        aiReports,

        totalReports,

        totalAppointments,

        pendingAppointments,

        confirmedAppointments

      },

      recentPatients,

      recentReports,

      pendingAppointmentList,

      recentAIInstances,

      weeklyReports

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};