const nodemailer = require('nodemailer');

module.exports = async (toEmail, subject, text) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: toEmail,
    subject,
    message: text,
  };

  const info = await transport.sendMail(message);

  console.log(
    `Mail has been sent to ${toEmail}, message id = ${info.messageId}`.blue
  );
};
