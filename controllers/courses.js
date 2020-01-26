const Course = require('../models/Course');
const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/messages');
const preconditions = require('../utils/preconditions');

exports.getCourses = passErrors((req, res, next) => {
  const courses = Course.find();
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
