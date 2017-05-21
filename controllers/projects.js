'use strict'
const express = require('express'),
      Proyecto = require('../models/proyecto'),
      Usuario = require('../models/usuario'),
      moment = require('moment'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

function blank(req, res, next) {

  Usuario.find({}, {'local.nombre': 1, 'local.email': 1}, (err, usuarios) => {
    usuarios = usuarios || {};
    res.render('projects/blank.pug', { usuarios });
  });
}

function crear(req, res, next) {
  logger.debug("Crear Proyecto");
	console.log(req.body);
  let proyecto = new Proyecto({
    nombre: req.body.nombre,
  	fecha_solicitud: req.body.fecha_solicitud,
  	fecha_arranque: req.body.fecha_arranque,
  	descripcion: req.body.descripcion,
  	scrum_master: req.body.scrum_master,
  	product_owner: req.body.product_owner,
		equipo_desarrollo: JSON.parse(req.body.equipo_desarrollo)
  });

	proyecto.save((err, object)=>{
		let code;
		let message;
		if(err){
		  code = 'danger';
		  message = 'No se ha podido crear el proyecto.';
      logger.debug(err);
		}else{
		  code = 'success';
		  message = 'Proyecto creado correctamente.';
		}

		res.locals.status = {
		  code,
		  message
		};
		next();
	});
}

function list (req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    usuario = usuario || {};
    Proyecto.find({}, (err, proyectos) => {
		if (err) {
			throw err;
		} else
      console.log(proyectos);
			res.render('projects/list.pug', {proyectos, usuario, moment});
	});
  });
}

module.exports = exports = {
    list,
    blank,
    crear
}
