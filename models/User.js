const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true
    },
    surname: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true
    },
    email: {
      type: String,
      min: 4,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    },
    cart: {
      type: Array,
      default: []
    },
    history: {
      type: Array,
      default: []
    },
    role: {
      type: Number,
      default: 0
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
