const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
};

exports.getBootcamp = async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findById(id);
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
};

exports.createBootcamp = async (req, res, next) => {
  const savedBootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: savedBootcamp,
  });
};

exports.updateBootcamp = async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
};

exports.deleteBootcamp = async (req, res, next) => {
  const id = req.params.id;
  await Bootcamp.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: {},
  });
};
