let passport      = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let dbGet         = require('../db-get');
let bcrypt        = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user.uuid);
});

passport.deserializeUser(async (uuid, done) => {
  let person = await dbGet.person.byId(uuid);
  done(null, person);
});

passport.use('local-signup', new LocalStrategy(
  {
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true,
  },
  async (req, email, password, done) => {
    let person = await dbGet.person.byEmail(email);

    if (person) { return done(null, false); }
  }
));

passport.use('local-login',
  new LocalStrategy({
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true
  },
  async (req, email, password, done) => {
    let person = await dbGet.person.byEmail(email);

    if (!person) { return done(null, false); }
    let passwordIsCorrect = await bcrypt.compare((password || ''), person.password);
    if (!passwordIsCorrect) {
      req.flash('error', "That's not your password.");
      return done(null, false);
    }

    // all is well, return successful user
    return done(null, person);
  }
));

module.exports = passport;
