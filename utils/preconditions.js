const { isNil } = require('lodash');

const ApiError = require('./ApiError');

exports.ensurePresence = (value, message) => {
  if (isNil(value)) throw new ApiError(400, message);
  return value;
};
