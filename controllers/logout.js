'use strict'
const express = require('express'),
      bcrypt = require('bcrypt-nodejs'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

function logout(req, res, next) {
  req.session.destroy((err) => {
    if(err) console.log(err);
    else res.redirect('/');
  });
}

module.exports = exports = {
    logout
};
