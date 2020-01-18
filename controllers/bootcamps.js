const Bootcamp = require('../models/Bootcamp');
const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/messages');

exports.getBootcamps = passErrors(async (req, res) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

exports.getBootcamp = passErrors(async (req, res) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findById(id);

  if (!bootcamp) throw new ApiError(404, messages.bootcampNotFound(id));

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.createBootcamp = passErrors(async (req, res) => {
  const savedBootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: savedBootcamp,
  });
});

exports.updateBootcamp = passErrors(async (req, res) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!bootcamp) throw new ApiError(404, messages.bootcampNotFound(id));

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.deleteBootcamp = passErrors(async (req, res) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndDelete(id);

  if (!bootcamp) throw new ApiError(404, messages.bootcampNotFound(id));

  res.status(200).json({
    success: true,
    data: {},
  });
});
