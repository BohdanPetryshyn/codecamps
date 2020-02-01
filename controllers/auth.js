const User = require('../models/User');
const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/messages');

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
    throw new ApiError(401, 'Email or password is missed.');
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
