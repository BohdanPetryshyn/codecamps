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
const authorized = require('../middleware/authorized');

const { getBootcampCourses, createCourse } = require('../controllers/courses');

const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(verifyLogin, authorized('publisher'), createBootcamp);

router.route('/within').get(getBootcampsWithin);

router
  .route('/:id')
  .get(getBootcamp)
  .put(verifyLogin, authorized('publisher'), updateBootcamp)
  .delete(verifyLogin, authorized('publisher'), deleteBootcamp);

router
  .route('/:id/courses')
  .get(getBootcampCourses)
  .post(verifyLogin, authorized('publisher'), createCourse);

module.exports = router;
