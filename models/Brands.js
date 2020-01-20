const mongoose = require("mongoose");

const Brands = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      maxlength: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brands", Brands);
