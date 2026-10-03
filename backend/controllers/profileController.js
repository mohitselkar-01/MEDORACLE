const User = require("../models/User");

/* =========================
   GET PROFILE
========================= */
exports.getProfile = async (req, res) => {
  try {

    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"]
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch profile"
    });

  }
};


/* =========================
   UPDATE PROFILE
========================= */
exports.updateProfile = async (req, res) => {

  try {

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    user.fullName =
      req.body.fullName ?? user.fullName;

    user.specialization =
      req.body.specialization ?? user.specialization;

    user.phone =
      req.body.phone ?? user.phone;

    user.qualification =
      req.body.qualification ?? user.qualification;

    user.experience =
      req.body.experience ?? user.experience;

    user.hospital =
      req.body.hospital ?? user.hospital;

    user.address =
      req.body.address ?? user.address;

    user.bio =
      req.body.bio ?? user.bio;

    await user.save();

    return res.status(200).json({

      message: "Profile Updated Successfully",

      user

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      message: "Profile Update Failed"

    });

  }

};


/* =========================
   UPLOAD PROFILE IMAGE
========================= */

exports.uploadProfileImage = async (req, res) => {

  try {

    const user = await User.findByPk(req.user.id);

    if (!user) {

      return res.status(404).json({

        message: "Doctor not found"

      });

    }

    if (!req.file) {

      return res.status(400).json({

        message: "No image selected"

      });

    }

    user.profileImage = req.file.filename;

    await user.save();

    return res.status(200).json({

      message: "Profile image uploaded successfully",

      profileImage: user.profileImage,

      user

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      message: "Image upload failed"

    });

  }

};