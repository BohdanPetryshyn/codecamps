const sendEmail = require('./sendEmail');
const ApiError = require('./ApiError');
const messages = require('./messages');

module.exports = async (req, user) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const email = req.body.email;
  const token = user.setResetPasswordToken();

  const resetPasswordUrl = `${protocol}://${host}/api/v1/auth/reset-password?token=${token}`;
  const message = `You requested a password reset.\n To proceed, make a PUT request to \n\n${resetPasswordUrl}`;
  const subject = 'Codecamps - Reset password request';

  try {
    await sendEmail(email, subject, message);
  } catch (err) {
    user.unsetResetPasswordToken();
    throw new ApiError(500, messages.errorSendingEmail(email));
  }
};
