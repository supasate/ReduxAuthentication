const authController = require('./controllers/authentication');

module.exports = function(app) {
  app.post('/signup', authController.signup);
};
