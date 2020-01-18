const handleError = (err, req, res, next) => {
  res.status(500)
    .json({
      success: false,
      data: {
        message: err.message
      }
    })
  next(err);
}

module.exports = handleError;
