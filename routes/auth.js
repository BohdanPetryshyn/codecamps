const express = require('express');

const { register, login, getSelf } = require('../controllers/auth');
const verifyLogin = require('../middleware/verifyLogin');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/self').get(verifyLogin, getSelf);

module.exports = router;
