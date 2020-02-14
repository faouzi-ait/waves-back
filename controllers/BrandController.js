const Brands = require("../models/Brands");

exports.createBrand = async (req, res) => {
  const brand = new Brands(req.body);

  try {
    const newProduct = await brand.save();
    res.status(201).json({
      success: true,
      newProduct
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.brands = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.status(200).json({
      success: "success",
      brands
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};
