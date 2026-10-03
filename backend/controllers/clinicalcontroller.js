const ClinicalAI = require("../models/ClinicalAI");
const Report = require("../models/Report");
const generateSecondOpinion = require("../services/aiService");

const generateClinicalOpinion = async (req, res) => {

  try {

    const {

      patientId,

      patientName,

      age,

      gender,

      symptoms,

      history,

      medications,

      doctorDiagnosis

    } = req.body;

    /* =========================
       AI RESPONSE
    ========================= */

    const aiResponse = await generateSecondOpinion({

      patientName,

      age,

      gender,

      symptoms,

      history,

      medications,

      doctorDiagnosis

    });

    /* =========================
       SAVE IN CLINICAL AI TABLE
    ========================= */

    const savedData = await ClinicalAI.create({

      doctorId: req.user.id,

      patientId,

      patientName,

      age,

      gender,

      symptoms,

      history,

      medications,

      doctorDiagnosis,

      aiResponse

    });

    /* =========================
       SAVE IN REPORT TABLE
    ========================= */

   await Report.create({

  doctorId: req.user.id,

  patientId,

  patientName,

  age,

  gender,

  symptoms,

  diagnosis: doctorDiagnosis,

  prescription: "AI Recommendation",

  notes: aiResponse,

  reportDate: new Date()

});

    /* =========================
       RESPONSE
    ========================= */

    res.status(201).json({

      success: true,

      message: "Clinical AI Response Generated Successfully",

      data: savedData

    });

  }

  catch (error) {

    console.log("========== ERROR ==========");
    console.log(error);
    console.log("===========================");

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  generateClinicalOpinion
};