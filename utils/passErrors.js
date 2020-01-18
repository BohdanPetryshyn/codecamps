const passErrors = controller => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (err) {
    next(err);
  }
};

module.exports = passErrors;
