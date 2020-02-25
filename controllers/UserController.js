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
      success: false,
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
      message: "User not found, please try again"
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
      _id: user.id,
      email: user.email
    },
    config.params.TOKEN_SECRET
  );

  res
    .status(200)
    .header("w-token", token)
    .cookie("w_token", token)
    .json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.surname,
        isAdmin: user.role === 0 ? false : true
      },
      token
    });
};

exports.list = async (req, res, next) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.updateUserPurchaseHistory = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "The specified user id was not found"
      });
    }

    const newHistoryList = [...user.history, req.body.shoppingCart];

    user.history = newHistoryList;
    user.save(err => {
      if (err) {
        console.error("Error while saving the history");
      }
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

const validEmail = e => {
  const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
};
