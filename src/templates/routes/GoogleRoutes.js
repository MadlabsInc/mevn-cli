import passport from 'passport';
import { OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';
import UserAuth from '../models/user_schema';
import GoogleKeys from '../../config/Google'
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    GoogleKeys,
    (token, tokenSecret, profile, done) => {
      UserAuth.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    },
  ),
);

let GoogleRoutes = {
  authenticate: () => {
    return passport.authenticate('google', {
      scope: 'https://www.google.com/m8/feeds',
    });
  },

  callback: () => {
    return passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/auth/failed',
    });
  },
};

export default GoogleRoutes;
