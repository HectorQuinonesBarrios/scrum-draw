'use strict'
const express = require('express'),
      moment = require('moment'),
      Proyecto = require('../models/proyecto'),
      Usuario = require('../models/usuario');

function list (req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    usuario = usuario || {};
    Proyecto.find({}, (err, proyectos) => {
		if (err) {
			throw err;
		} else
      //proyectos.fecha_solicitud = moment(proyectos.fecha_solicitud).format('DD-MM-YYYY');
      //proyectos.fecha_arranque = moment(proyectos.fecha_arranque).format('DD-MM-YYYY');
      console.log(proyectos);
			res.render('projects/list.pug', {proyectos, usuario});
	});
  });
}

module.exports = {
  list
}
