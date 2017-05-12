const express = require('express'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GitHubStrategy = require('passport-github2').Strategy,
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

    const GITHUB_CLIENT_ID = "1af7c256a143b9a09d73",
        GITHUB_CLIENT_SECRET = "3cc7f2bf1cdeb2b11e143d7f4f93f5d5ab656944";
    passport.use(new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/login/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            logger.debug(profile);
        }
    ));
}
