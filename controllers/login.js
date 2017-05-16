'use strict'
const express = require('express'),
      bcrypt = require('bcrypt-nodejs'),
      Usuario = require('../models/usuario'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

function login_form(req, res, next) {
  res.render('login/login_form');
}

function login(req, res, next) {
    logger.debug('LOGIN');
    Usuario.findOne({email: req.body.email}, (err, usuario) => {
       if (err) res.redirect('/login');
        else {
            if (usuario) {
                bcrypt.compare(req.body.password, usuario.password, (err, resu) => {
                    if (resu) {
                        req.session.usuario = usuario._id;
                        res.redirect('/projects');
                    } else {
                        res.redirect('/login');
                    }
                });
            } else {
                res.redirect('/login');
            }
        }
    });
}

module.exports = exports = {
  login,
  login_form
};
