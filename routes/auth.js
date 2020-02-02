const express = require('express');

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getSelf,
} = require('../controllers/auth');
const verifyLogin = require('../middleware/verifyLogin');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgot-password').post(forgotPassword);

router.route('/reset-password').put(resetPassword);

router.route('/self').get(verifyLogin, getSelf);

module.exports = router;
