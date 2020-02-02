const express = require('express');

const {
  register,
  login,
  resetPassword,
  getSelf,
} = require('../controllers/auth');
const verifyLogin = require('../middleware/verifyLogin');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/reset-password').post(resetPassword);

router.route('/self').get(verifyLogin, getSelf);

module.exports = router;
