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
    Usuario.findOne({"local.email": req.body.email}, (err, usuario) => {
      logger.debug(req.body.email);
       if (err) {
         throw err;
         res.redirect('/login');
       }
        else {
            if (usuario) {
                logger.debug(usuario);

                bcrypt.compare(req.body.password, usuario.local.password, (err, resu) => {
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

function facebook(req, res, next){
  logger.debug('FB LOGIN');
  logger.debug(req.user );
  Usuario.findOne({'facebook.type.facebookID': req.user.id}, (err, usuario)=>{
    if(err) res.redirect('/');
    else {
      if(usuario){
        req.session.usuario = usuario._id;
        res.redirect('/projects');
      } else {
        res.render('users/blank', {usuario: {local: {
          id : req.user.id,
          social: 'facebookID',
          nombre : req.user.name.givenName + ' ' + req.user.name.familyName,
          email : req.user.emails[0].value,
          curp: '',
          rfc: '',
          habilidades: []
        }}});
      }
    }

  });
}
function twitter(req, res, next){
  logger.debug('TW LOGIN');
  logger.debug(req.user);
  Usuario.findOne({'twitter.type.twitterID': req.user.id}, (err, usuario)=>{
    if(err) res.redirect('/');
    else {
      if(usuario){
        req.session.usuario = usuario._id;
        res.redirect('/projects');
      } else {
        res.render('users/blank', {usuario: {local: {
          id : req.user.id,
          social: 'twitterID',
          nombre : req.user.displayName,
          email : req.user.emails[0].value,
          curp: '',
          rfc: '',
          habilidades: []
        }}});
      }
    }

  });
}

function github(req, res, next){
  logger.debug('GH LOGIN');
  logger.debug(req.user);
  Usuario.findOne({'github.type.githubID': req.user.id}, (err, usuario)=>{
    if(err) res.redirect('/');
    else {
      if(usuario){
        req.session.usuario = usuario._id;
        res.redirect('/projects');
      } else {
        res.render('users/blank', {usuario: {local: {
          id : req.user.id,
          social: 'githubID',
          nombre : req.user.displayName,
          email : req.user.emails[0].value,
          curp: '',
          rfc: '',
          habilidades: []
        }}});
      }
    }

  });
}
module.exports = exports = {
  login,
  login_form,
  facebook,
  twitter,
  github
}
