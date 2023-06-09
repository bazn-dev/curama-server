const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../services/gateway/user/user.model').model;

module.exports.passportLoader = async function() {
  passport.use(new LocalStrategy({
    usernameField: 'user[login]',
    passwordField: 'user[password]'
  }, (login, password, done) => {
    UserModel.findOne({ login })
      .then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'login or password': 'is invalid' } });
        }

        return done(null, user);
      })
      .catch(done);
  }));
};
