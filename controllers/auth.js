const User = require('../models/User');
const passErrors = require('../utils/passErrors');

exports.register = passErrors(async (req, res) => {
  await User.create(req.body);
  res.status(200).json({ success: true });
});
