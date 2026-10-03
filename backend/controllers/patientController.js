const Patient = require("../models/Patient");

// =======================
// GET ALL PATIENTS
// =======================

exports.getPatients = async (req, res) => {

  try {

    const patients = await Patient.findAll({

      where: {
        doctorId: req.user.id
      },

      order: [["createdAt", "DESC"]]

    });

    res.json(patients);

  }

  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// =======================
// ADD PATIENT
// =======================

exports.addPatient = async (req, res) => {

  try {

    const patient = await Patient.create({

      ...req.body,

      doctorId: req.user.id

    });

    res.status(201).json({

      message: "Patient Added",

      patient

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};

// =======================
// UPDATE PATIENT
// =======================

exports.updatePatient = async (req, res) => {

  try {

    const patient = await Patient.findOne({

      where: {

        id: req.params.id,

        doctorId: req.user.id

      }

    });

    if (!patient) {

      return res.status(404).json({

        message: "Patient not found"

      });

    }

    await patient.update(req.body);

    res.json({

      message: "Patient Updated",

      patient

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};

// =======================
// DELETE PATIENT
// =======================

exports.deletePatient = async (req, res) => {

  try {

    const patient = await Patient.findOne({

      where: {

        id: req.params.id,

        doctorId: req.user.id

      }

    });

    if (!patient) {

      return res.status(404).json({

        message: "Patient not found"

      });

    }

    await patient.destroy();

    res.json({

      message: "Patient Deleted"

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};