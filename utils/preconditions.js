const { isNil } = require('lodash');

const ApiError = require('./ApiError');

exports.ensurePresence = (value, message) => {
  if (isNil(value)) throw new ApiError(400, message);
  return value;
};

exports.ensureNumber = (value, message) => {
  const parsed = Number(value);
  if (isNaN(parsed)) throw new ApiError(400, message);
  return parsed;
};

exports.ensureObjectWithIdExists = async (Model, id, message) => {
  const object = await Model.findById(id);
  if (!object) throw new ApiError(404, message);
};
