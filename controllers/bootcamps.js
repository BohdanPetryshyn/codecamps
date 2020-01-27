const Bootcamp = require('../models/Bootcamp');
const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/messages');
const preconditions = require('../utils/preconditions');

const EARTH_RADIUS = 6378;

const PARAMETER_NOT_A_NUMBER_MESSAGE =
  'query parameter is absent or not a number.';

exports.getBootcamps = passErrors(async (req, res) => {
  const bootcamps = await Bootcamp.find().populate('courses');
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

exports.getBootcamp = passErrors(async (req, res) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findById(id).populate('courses');

  if (!bootcamp) throw new ApiError(404, messages.bootcampNotFound(id));

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.getBootcampsWithin = passErrors(async (req, res) => {
  const latitude = preconditions.ensureNumber(
    req.query.latitude,
    `latitude ${PARAMETER_NOT_A_NUMBER_MESSAGE}`
  );
  const longitude = preconditions.ensureNumber(
    req.query.longitude,
    `longitude ${PARAMETER_NOT_A_NUMBER_MESSAGE}`
  );
  const radius = preconditions.ensureNumber(
    req.query.radius,
    `radius ${PARAMETER_NOT_A_NUMBER_MESSAGE}`
  );

  const radiusInRadians = radius / EARTH_RADIUS;

  const bootcamps = await Bootcamp.find({
    'location.point': {
      $geoWithin: { $centerSphere: [[longitude, latitude], radiusInRadians] },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
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
  const bootcamp = await Bootcamp.findById(id);

  if (!bootcamp) throw new ApiError(404, messages.bootcampNotFound(id));

  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
