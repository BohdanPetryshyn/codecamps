const express = require('express');

const { getCourses, getCourse } = require('../controllers/courses');
const verifyLogin = require('../middleware/verifyLogin');

const router = express.Router();

router.route('/').get(getCourses);

router.route('/:id').get(getCourse);

module.exports = router;
