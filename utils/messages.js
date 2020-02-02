exports.bootcampNotFound = id => `Bootcamp with id=${id} can't be found.`;

exports.courseNotFound = id => `Course with id=${id} can't be found.`;

exports.invalidCredentials = () => `Invalid credentials.`;

exports.noUserWithSpecifiedEmail = email =>
  `No user with email ${email} found.`;

exports.errorSendingEmail = email => `Error sending email to ${email}.`;
