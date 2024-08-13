const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    // clientID: process.env.CLIENT_ID,
    // clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: "http://localhost:5000/auth/google/callback"
    clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:5000/auth/google/callback",
			scope: ["profile", "email"],
  },
  function (accessToken, refreshToken, profile, callback) {
    console.log(profile._json);
    
    callback(null, profile);
  }
));
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});