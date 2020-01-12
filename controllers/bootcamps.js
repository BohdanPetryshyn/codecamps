exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { message: "Getting all bootcamps" } });
};

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { message: `Getting bootcamp with id=${req.params.id}` }
  });
};

exports.createBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { message: "Creating a bootcamp" } });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { message: `Updating bootcamp with id=${req.params.id}` }
  });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { message: `Deleting bootcamp with id=${req.params.id}` }
  });
};
