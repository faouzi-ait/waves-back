const Guitard = require("../models/Guitard");

exports.createGuitards = async (req, res) => {
  const guitard = new Guitard(req.body);

  try {
    const newGuitard = await guitard.save();
    res.status(201).json({
      success: true,
      newGuitard
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.Guitard = async (req, res) => {
  // 1 FILTERING
  const query = { ...req.query };
  const excludeFields = ["fields", "sort", "page", "limit"];

  excludeFields.forEach(field => delete query[field]);

  // 2 ADVANCED FILTERING TO USE GT, LT, GTE, LTE OPERATORS
  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let finalQuery = Guitard.find(JSON.parse(queryStr));

  try {
    // 3 SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      finalQuery = finalQuery.sort(sortBy);
    } else {
      finalQuery = finalQuery.sort("_id");
    }

    // 4 FIELD LIMITING: ONLY DISPLAY THE SPECIFIED FIELDS
    if (req.query.fields) {
      const field = req.query.fields.split(",").join(" ");
      finalQuery = finalQuery.select(field).select("-__v");
    } else {
      finalQuery = finalQuery.select("-__v");
    }

    // 5 PAGE FILTERING
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 100;
    let skip = (page - 1) * limit;

    // 6 EXECUTING THE QUERY
    const records = await finalQuery
      .limit(limit)
      .skip(skip)
      .populate("brand")
      .populate("woods");

    // 7 COUNT THE DOCUMENTS
    const counts = await finalQuery.countDocuments({});

    res.status(200).json({
      success: true,
      counts,
      records
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};

exports.GuitardByID = async (req, res) => {
  const id = req.params.id;
  try {
    const guitard = await Guitard.findOne({ _id: id })
      .populate("brand")
      .populate("woods");

    res.status(200).json({
      success: true,
      guitard
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
};
