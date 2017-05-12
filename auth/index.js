const express = require('express'),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuthStrategy,
  Usuario = require('../models/usuario'),
  log4js = require('log4js'),
  logger = log4js.getLogger();

module.exports = () => {
    const FACEBOOK_APP_ID = "1335013806558485",
      FACEBOOK_APP_SECRET = "07b8b7cc1629df202035471ecdd8e581";
    passport.use(new FacebookStrategy({
<<<<<<< HEAD
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/login/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        Usuario.create({
          facebookId: profile.id
        }, function(err, user) {
          return cb(err, user);
        });
      }
    ));

    const TWITTER_CONSUMER_KEY = "eaq0EKS6UGo3lJCI9VGRchpFh",
      TWITTER_CONSUMER_SECRET = "iOfj0WfdrzMSNlXk1xNHoMHZooJEjIXpveL435oXx4g2dFWGbW";
    passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:3000/login/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        logger.debug(profile);
      }
    ));

    passport.use(new GoogleStrategy({
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({
          googleId: profile.id
        }, function(err, user) {
          return done(err, user);
        });
      }
=======
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/login/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            logger.debug(profile);
            Usuario.create({
                facebookId: profile.id
            }, function(err, user) {
                return cb(err, user);
            });
        }
>>>>>>> 8ef22dc7c040271198253f30bcc3d975435f9237
    ));
}
