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
    let person = await dbGet.people.byEmail(email, { filter: false });

    if (!person) { return done(null, false, 'User does not exist'); }
    let passwordIsCorrect = await bcrypt.compare((password || ''), person.password);
    if (!passwordIsCorrect) {
      return done(null, false, 'Wrong password');
    }

    // all is well, return successful user
    return done(null, person);
  }
));

module.exports = passport;
