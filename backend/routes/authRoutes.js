const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const User = require("../models/User");

/* SIGNUP */

router.post("/signup", async (req, res) => {

try {

const {
  fullName,
  email,
  password,
  specialization,
  role
} = req.body;

// CHECK USER

const existingUser = await User.findOne({
  where: { email }
});

if(existingUser){

  return res.status(400).json({
    message: "User already exists"
  });

}

// HASH PASSWORD

const hashedPassword =
  await bcrypt.hash(password, 10);

// CREATE USER

const user = await User.create({

  fullName,
  email,
  password: hashedPassword,
  specialization: specialization || "",
  role: role || "doctor"

});

res.status(201).json({
  message: "Signup Successful",
  user: {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  }
});


}

catch(error){


res.status(500).json({
  message: error.message
});


}

});

/* LOGIN */

router.post("/login", async (req, res) => {

try {


const { email, password } = req.body;

// CHECK USER

const user = await User.findOne({
  where: { email }
});

if(!user){

  return res.status(400).json({
    message: "User not found"
  });

}

// CHECK PASSWORD

const isMatch = await bcrypt.compare(
  password,
  user.password
);

if(!isMatch){

  return res.status(400).json({
    message: "Invalid Credentials"
  });

}

// JWT TOKEN

  const jwtSecret = process.env.JWT_SECRET || "medoracle_default_dev_secret_2026";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    jwtSecret,
    {
      expiresIn: "7d"
    }
  );

res.status(200).json({

  message: "Login Successful",

  token,

 user: {
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  specialization: user.specialization,
  role: user.role,
  isProfileComplete: user.isProfileComplete
}

});


}

catch(error){

res.status(500).json({
  message: error.message
});


}

});

/* CHANGE PASSWORD */

router.put(
  "/change-password",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        oldPassword,
        newPassword
      } = req.body;

      const user = await User.findByPk(req.user.id);

      if (!user) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isMatch) {

        return res.status(400).json({
          message: "Old Password is incorrect"
        });

      }

      const hashedPassword =
        await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;

      await user.save();

      res.json({

        success: true,

        message: "Password Updated Successfully"

      });

    }

    catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

  }
);

module.exports = router;
