// const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

// USER REGISTRATION
exports.register = async (req, res) => {
  /* GETTING THE DATA FROM THE BODY */
  const { name, surname, email, password } = req.body;

  /* CHECKING IF THE USER ALREADY EXIST */
  const emailExist = await User.findOne({
    email: req.body.email
  });

  if (emailExist) {
    return res.status(400).json({
      success: false,
      message: "The user already exist"
    });
  }

  /* PASSWORD HASHING */
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  /* CREATING THE NEW USER */
  const user = new User({
    name,
    surname,
    email,
    password: hashedPassword
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      success: true,
      id: newUser._id,
      name: `${name} ${surname}`,
      email: email
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err
    });
  }
};

// USER LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // VALIDATION OF THE INPUT
  if (!validEmail(email) || email === "" || password === "") {
    return res.status(400).json({
      success: false,
      message: "Please type in valid credentials"
    });
  }

  const user = await User.findOne({
    email: email
  });

  // HANDLE IF THE USER IS NOT FOUND
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found"
    });
  }

  // DECRYPT THE PASSWORD AND CHECK FOR MATCHES
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Password Incorrect"
    });
  }

  // ISSUE THE TOKEN AND SEND IT BACK TO THE USER
  const token = jwt.sign(
    {
      _id: user.id
    },
    config.params.TOKEN_SECRET
  );

  res
    .status(200)
    .header("w-token", token)
    .cookie("w_token", token)
    .json({
      success: true,
      user,
      token
    });
};

const validEmail = e => {
  const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
};
