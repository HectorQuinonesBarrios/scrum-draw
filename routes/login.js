const express = require('express');
const router = express.Router();
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy
const loginController = require('../controllers/login');

/* GET Login/Register page. */
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/', loginController.login_form);
router.post('/', loginController.login);

module.exports = router;
