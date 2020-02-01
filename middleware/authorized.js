const passErrors = require('../utils/passErrors');
const ApiError = require('../utils/ApiError');

module.exports = (...authorizedRoles) => passErrors((req, res, next) => {
  const currentUserRole = req.user.role;

  if(!authorizedRoles.includes(currentUserRole)) {
    throw new ApiError(403, `User role ${currentUserRole} isn't authorized to commit this action.`);
  }

  next();
});
