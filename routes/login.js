const express = require('express');
const router = express.Router();
const passport = require("passport");
const loginController = require('../controllers/login');

/* GET Login/Register page. */
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
}), loginController.facebook);

router.get('/auth/twitter',
    passport.authenticate('twitter', {
        scope: 'include_email'
    }));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/login'
    }), loginController.twitter);

router.get('/auth/github',
    passport.authenticate('github', {
        scope: ['user:email']
    }));

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    loginController.github);
router.get('/', loginController.login_form);
router.post('/', loginController.login);

module.exports = router;
