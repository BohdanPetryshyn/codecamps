const User = require('../models/User');
const passErrors = require('../utils/passErrors');

exports.register = passErrors(async (req, res) => {
  const user = await User.create(req.body);

  const token = user.signJwt();

  res.status(200).json({ success: true, token });
});
