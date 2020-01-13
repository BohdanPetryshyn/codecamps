const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200)
    .json(bootcamps);
};

exports.getBootcamp = async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findById(id);
  res.status(200)
    .json(bootcamp);
};

exports.createBootcamp = async (req, res, next) => {
  const savedBootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: savedBootcamp,
  });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { message: `Updating bootcamp with id=${req.params.id}` },
  });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { message: `Deleting bootcamp with id=${req.params.id}` },
  });
};
