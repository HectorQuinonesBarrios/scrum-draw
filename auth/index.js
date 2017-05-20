'use strict';

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
            callbackURL: "http://localhost:3000/login/auth/facebook/callback",
            profileFields: ["id","emails","name"]
        },
        function(accessToken, refreshToken, profile, done) {
            logger.debug(profile);
            Usuario.findOne({'facebook.facebookID': profile.id}, (err, usuario)=>{
              if(err) done(err);
              else {
                if(usuario){
                  logger.debug(usuario);
                  done(null, usuario);
                } else {
                  logger.debug(profile);
                  done(null, profile);
                }
              }
            });
        }
    ));

    const TWITTER_CONSUMER_KEY = "eaq0EKS6UGo3lJCI9VGRchpFh",
        TWITTER_CONSUMER_SECRET = "iOfj0WfdrzMSNlXk1xNHoMHZooJEjIXpveL435oXx4g2dFWGbW";
    passport.use(new TwitterStrategy({
            consumerKey: TWITTER_CONSUMER_KEY,
            consumerSecret: TWITTER_CONSUMER_SECRET,
            userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
            callbackURL: "http://localhost:3000/login/auth/twitter/callback"
        },
        function(token, tokenSecret, profile, done) {
            logger.debug(profile);
            Usuario.findOne({'twitter.twitterID': profile.id}, (err, usuario)=>{
              if(err) done(err);
              else {
                if(usuario){
                  logger.debug(usuario);
                  done(null, usuario);
                } else {
                  logger.debug(profile);
                  done(null, profile);
                }
              }
            });
        }
    ));

    const GITHUB_CLIENT_ID = "1af7c256a143b9a09d73",
        GITHUB_CLIENT_SECRET = "3cc7f2bf1cdeb2b11e143d7f4f93f5d5ab656944";
    passport.use(new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/login/auth/github/callback",
            scope: [ 'user:email' ]
        },
        function(accessToken, refreshToken, profile, done) {
            logger.debug(profile);
            Usuario.findOne({'github.githubID': profile.id}, (err, usuario)=>{
              if(err) done(err);
              else {
                if(usuario){
                  logger.debug(usuario);
                  done(null, usuario);
                } else {
                  logger.debug(profile);
                  done(null, profile);
                }
              }
            });
        }
    ));
}
