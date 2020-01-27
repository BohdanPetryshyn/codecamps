const Course = require('../models/Course');
const passErrors = require('../utils/passErrors');

exports.getCourses = passErrors(async (req, res, next) => {
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

exports.getBootcampCourses = passErrors(async (req, res, next) => {
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
