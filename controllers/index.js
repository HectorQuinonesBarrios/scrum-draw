'use strict'
const express = require('express');
const Usuario = require('../models/usuario')
const log4js = require('log4js');
const logger = log4js.getLogger();
//const bcrypt = require('bcrypt-nodejs');

function index(req, res, next) {
  logger.debug('INDEX');
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    usuario = usuario || {nombre: ''};
    res.render('index', { usuario });
  });
}

module.exports = {
  index
}
