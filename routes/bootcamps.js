const express = require('express');

const {
  getBootcamp,
  getBootcampsWithin,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps');

const { getBootcampCourses, createCourse } = require('../controllers/courses');

const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/within').get(getBootcampsWithin);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router
  .route('/:id/courses')
  .get(getBootcampCourses)
  .post(createCourse);

module.exports = router;
