const Course = require('../models/Course');
const passErrors = require('../utils/passErrors');

exports.getCourses = passErrors((req, res, next) => {
  const courses = Course.find();
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

exports.getBootcampCourses = passErrors((req, res, next) => {
  const bootcampId = req.params.bootcampId;

  const courses = Course.find({bootcamp: bootcampId});

   res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  })
});
