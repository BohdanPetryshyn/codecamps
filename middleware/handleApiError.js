const ApiError = require('../utils/ApiError');

const handleApiError = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code)
      .json({
        success: false,
        data: {
          message: err.message
        }
      })
  }
  next(err);
}

module.exports = handleApiError;
