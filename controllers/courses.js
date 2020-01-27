const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const passErrors = require('../utils/passErrors');
const messages = require('../utils/messages');
const ApiError = require('../utils/ApiError');
const preconditions = require('../utils/preconditions');

exports.getCourses = passErrors(async (req, res) => {
  const courses = await Course.find().populate({
    path: 'bootcamp',
    select: 'name description',
  });

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

exports.getCourse = passErrors(async (req, res) => {
  const id = req.params.id;

  const course = await Course.findById(id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) throw new ApiError(404, messages.courseNotFound(id));

  res.status(200).json({
    success: true,
    data: course,
  });
});

exports.getBootcampCourses = passErrors(async (req, res) => {
  const bootcampId = req.params.id;

  const courses = await Course.find({ bootcamp: bootcampId }).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

exports.createCourse = passErrors(async (req, res) => {
  const bootcampId = req.params.id;
  preconditions.ensureObjectWithIdExists(
    Bootcamp,
    messages.bootcampNotFound(bootcampId)
  );

  const course = {
    ...req.body,
    bootcamp: bootcampId,
  };
  const createdCourse = await Course.create(course);

  res.status(200).json({
    success: true,
    data: createdCourse,
  });
});
