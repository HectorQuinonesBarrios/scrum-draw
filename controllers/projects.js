'use strict'
const express = require('express'),
      Proyecto = require('../models/proyecto'),
      Usuario = require('../models/usuario');

function list (req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    usuario = usuario || {};
    Proyecto.find({}, (err, proyectos) => {
		if (err) {
			throw err;
		} else
			res.render('projects/list.pug', {proyectos, usuario});
			next();
	});
  });
}

module.exports = {
  list
}
