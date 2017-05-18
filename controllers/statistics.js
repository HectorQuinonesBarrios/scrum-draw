'use strict'
const express = require('express'),
      Usuario = require('../models/usuario');

function statistics(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    usuario = usuario || {};
    res.render('projects/statistics.pug', { usuario });
  });
}

module.exports = {
  statistics
}
