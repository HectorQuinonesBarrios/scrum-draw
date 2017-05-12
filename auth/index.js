const express = require('express'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    Usuario = require('../models/usuario'),
    log4js = require('log4js'),
    logger = log4js.getLogger();

module.exports = () => {
    const FACEBOOK_APP_ID = "1335013806558485",
        FACEBOOK_APP_SECRET = "07b8b7cc1629df202035471ecdd8e581";
    passport.use(new FacebookStrategy({
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
    ));
}
