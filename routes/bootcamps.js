const express = require('express');

const {
  getBootcamp,
  getBootcampsWithin,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps');
const verifyLogin = require('../middleware/verifyLogin');

const { getBootcampCourses, createCourse } = require('../controllers/courses');

const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(verifyLogin, createBootcamp);

router.route('/within').get(getBootcampsWithin);

router
  .route('/:id')
  .get(getBootcamp)
  .put(verifyLogin, updateBootcamp)
  .delete(verifyLogin, deleteBootcamp);

router
  .route('/:id/courses')
  .get(getBootcampCourses)
  .post(verifyLogin, createCourse);

module.exports = router;
