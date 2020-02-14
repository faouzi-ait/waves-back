const Wood = require("../models/Wood");

exports.woods = async (req, res) => {
  try {
    const records = await Wood.find();
    res.status(200).json({
      success: "success",
      records
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.createWood = async (req, res) => {
  const wood = new Wood(req.body);

  try {
    const newWood = await wood.save();
    res.status(201).json({
      success: "success",
      newWood
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};
