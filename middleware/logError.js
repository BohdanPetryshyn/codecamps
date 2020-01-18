module.exports = (err, req, res, next) => {
  console.log(err.stack.red);
  next(err);
};
