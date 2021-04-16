const passport = require('passport');
const local = require('./localStrategy');
const { User } = require('../models');
require('dotenv').config();


module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.identify);
  });

  passport.deserializeUser(async (identify, done) => {
    try {
      const user = await User.findOne({ where: { identify } })
      done(null, user)
    } catch (error) {
      done(error)
    }
  });

  local();
};