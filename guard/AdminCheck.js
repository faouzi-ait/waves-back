const User = require("../models/User");

const admin = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user._id
  });

  if (user.role === 0) {
    return res.status(400).json({
      success: false,
      message: "Only administrators allowed"
    });
  }
  next();
};

module.exports = admin;
