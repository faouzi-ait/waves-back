const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

module.exports = function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied, You must be logged in to view these resources"
    });
  }

  try {
    const verified = jwt.verify(token, config.params.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
  next();
};
