const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

  createReport,
  getReports,
  getSingleReport,
  updateReport,
  deleteReport,
  getReportCount

} = require("../controllers/reportController");

/* =========================
   CREATE REPORT
========================= */

router.post(
  "/",
  authMiddleware,
  createReport
);

/* =========================
   GET ALL REPORTS
========================= */

router.get(
  "/",
  authMiddleware,
  getReports
);

/* =========================
   REPORT COUNT
========================= */

router.get(
  "/count",
  authMiddleware,
  getReportCount
);

/* =========================
   GET SINGLE REPORT
========================= */

router.get(
  "/:id",
  authMiddleware,
  getSingleReport
);

/* =========================
   UPDATE REPORT
========================= */

router.put(
  "/:id",
  authMiddleware,
  updateReport
);

/* =========================
   DELETE REPORT
========================= */

router.delete(
  "/:id",
  authMiddleware,
  deleteReport
);

module.exports = router;