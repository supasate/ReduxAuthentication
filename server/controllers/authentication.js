exports.signup = function(req, res, next) {
  console.log(req.body);
  // See if a user with the given email exists

  // If a user with email does exist, return an error

  // If a user with email does NOT exist, create and save user record

  // Respond to request indicating the user was created
  next();
};
