const mongoose = require("mongoose");

const Guitards = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      maxlength: 100
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: true
    },
    shipping: {
      required: true,
      type: Boolean
    },
    available: {
      required: true,
      type: Boolean
    },
    woods: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Woods",
      required: true
    },
    frets: {
      required: true,
      type: Number
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },
    publish: {
      required: true,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Guitards", Guitards);
