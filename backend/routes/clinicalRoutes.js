const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  generateClinicalOpinion,
} = require("../controllers/clinicalcontroller");

// Generate Clinical AI Report (Only Logged-in Doctor)

router.post(
  "/",
  authMiddleware,
  generateClinicalOpinion
);

module.exports = router;