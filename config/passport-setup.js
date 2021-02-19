const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/donation'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    //extract profile.emails[0].values,profile.id,profile.displayName
  })
);

// keys.psql.dbURI