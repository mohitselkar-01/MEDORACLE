const Report = require("../models/Report");

/* =========================
   CREATE REPORT
========================= */

exports.createReport = async (req, res) => {

  try {

   const report = await Report.create({

patientId: req.body.patientId,

patientName: req.body.patientName,

age: req.body.age,

gender: req.body.gender,

symptoms: req.body.symptoms,

diagnosis: req.body.diagnosis,

prescription: req.body.prescription,

notes: req.body.notes,

reportDate: req.body.reportDate,

doctorId: req.user.id

});

    res.status(201).json({

      message: "Report Created Successfully",

      report

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


/* =========================
   GET ALL REPORTS
========================= */

exports.getReports = async (req, res) => {

  try {

    const reports = await Report.findAll({

      where: {

        doctorId: req.user.id

      },

      order: [

        ["createdAt", "DESC"]

      ]

    });

    res.status(200).json(reports);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


/* =========================
   GET SINGLE REPORT
========================= */

exports.getSingleReport = async (req, res) => {

  try {

    const report = await Report.findOne({

      where: {

        id: req.params.id,

        doctorId: req.user.id

      }

    });

    if (!report) {

      return res.status(404).json({

        message: "Report Not Found"

      });

    }

    res.status(200).json(report);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


/* =========================
   UPDATE REPORT
========================= */

exports.updateReport = async (req, res) => {

  try {

    const report = await Report.findOne({

      where: {

        id: req.params.id,

        doctorId: req.user.id

      }

    });

    if (!report) {

      return res.status(404).json({

        message: "Report Not Found"

      });

    }

    await report.update(req.body);

    res.status(200).json({

      message: "Report Updated Successfully",

      report

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


/* =========================
   DELETE REPORT
========================= */

exports.deleteReport = async (req, res) => {

  try {

    const report = await Report.findOne({

      where: {

        id: req.params.id,

        doctorId: req.user.id

      }

    });

    if (!report) {

      return res.status(404).json({

        message: "Report Not Found"

      });

    }

    await report.destroy();

    res.status(200).json({

      message: "Report Deleted Successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


/* =========================
   REPORT COUNT
========================= */

exports.getReportCount = async (req, res) => {

  try {

    const totalReports = await Report.count({

      where: {

        doctorId: req.user.id

      }

    });

    res.status(200).json({

      totalReports

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};