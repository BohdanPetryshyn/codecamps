const jwt = require('jsonwebtoken');

const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

module.exports = passErrors(async (req, res, next) => {
  const token = getBearerToken(req) || req.cookies.token;
  if (!token) {
    throw new ApiError(401, 'Request is not authorized.');
  }

  const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decryptedToken.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(401, 'User not found.');
  }

  console.log('USER: ', user);
  req.user = user;
  next();
});

const getBearerToken = req => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
    return authorizationHeader.split(' ')[1];
  }
};
