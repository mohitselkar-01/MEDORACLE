const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

addAppointment,
getAppointments,
getAppointment,
updateAppointment,
deleteAppointment,
updateStatus,
approveAppointment

} = require("../controllers/appointmentController");
/* =========================
   GET ALL
========================= */

router.get(
"/",
authMiddleware,
getAppointments
);

/* =========================
   GET SINGLE
========================= */

router.get(
"/:id",
authMiddleware,
getAppointment
);

/* =========================
   CREATE
========================= */

router.post(
"/",
authMiddleware,
addAppointment
);

/* =========================
   UPDATE
========================= */

router.put(
"/:id",
authMiddleware,
updateAppointment
);

/* =========================
   DELETE
========================= */

router.delete(
"/:id",
authMiddleware,
deleteAppointment
);

/* =========================
   UPDATE STATUS
========================= */

router.patch(
"/status/:id",
authMiddleware,
updateStatus
);

/* =========================
 APPROVE + ADD PATIENT
========================= */

router.patch(
"/approve-add-patient/:id",
authMiddleware,
approveAppointment
);

module.exports = router;