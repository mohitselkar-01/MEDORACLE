const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  uploadProfileImage
} = require("../controllers/profileController");

/* =========================
   TEST ROUTE
========================= */

router.get("/test", (req, res) => {
  res.json({
    message: "Profile Route Working"
  });
});

/* =========================
   GET PROFILE
========================= */

router.get(
  "/",
  authMiddleware,
  getProfile
);

/* =========================
   UPDATE PROFILE
========================= */

router.put(
  "/",
  authMiddleware,
  updateProfile
);

/* =========================
   UPLOAD PROFILE IMAGE
========================= */

router.post(
  "/upload-image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;