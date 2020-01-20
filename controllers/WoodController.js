const Wood = require("../models/Wood");

exports.createWood = async (req, res) => {
  const wood = new Wood(req.body);

  try {
    const newWood = await wood.save();
    res.status(201).json({
      success: true,
      newWood
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.woods = async (req, res) => {
  try {
    const woods = await Wood.find();
    res.status(201).json({
      success: true,
      woods
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};
