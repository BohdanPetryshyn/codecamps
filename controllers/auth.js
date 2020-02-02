const User = require('../models/User');
const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/messages');
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail');

exports.register = passErrors(async (req, res) => {
  const user = await User.create(req.body);

  const token = user.signJwt();

  res
    .status(200)
    .cookie('token', token, cookieOptions())
    .json({ success: true, token });
});

exports.login = passErrors(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email or password is missed.');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, messages.invalidCredentials());
  }

  const correctCredentials = await user.checkPassword(password);
  if (!correctCredentials) {
    throw new ApiError(401, messages.invalidCredentials());
  }

  const token = user.signJwt();

  res
    .status(200)
    .cookie('token', token, cookieOptions())
    .json({
      success: true,
      token,
    });
});

exports.forgotPassword = passErrors(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, 'Email is missed.');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, messages.noUserWithSpecifiedEmail(email));
  }

  await sendResetPasswordEmail(req, user);

  res.status(200).json({
    success: true,
  });
});

exports.resetPassword = passErrors(async (req, res) => {
  const password = req.body.password;
  if (!password) {
    throw new ApiError(400, 'New password is missed');
  }

  const token = req.query.token;
  if (!token) {
    throw new ApiError(401, 'Reset password token is missed.');
  }

  const user = await User.getByResetPasswordToken(token);
  if (!user) {
    throw new ApiError(401, 'Reset password token is invalid or expired.');
  }

  user.password = password;
  user.save();

  res.status(200).json({
    success: true,
  });
});

exports.getSelf = passErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

const cookieOptions = () => ({
  expires: cookieExpires(),
  httpOnly: true,
});

const cookieExpires = () =>
  new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN);
