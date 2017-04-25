'use strict'
const express = require('express');
const Proyecto = require('../models/proyecto');
const log4js = require('log4js');
const logger = log4js.getLogger();

function blank(req, res, next) {
  res.render('projects/blank.pug', { title: 'Express' });
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
		equipo_desarrollo: req.body.equipo_desarrollo
//	, equipo_desarrollo: [{
//  		usuario_id: ObjectId, rol: String
//  	}]
  });

	proyecto.save((err, object)=>{
		let code;
		let message;
		if(err){
		  code = 'danger';
		  message = 'No se ha podido crear el proyecto.';
		}else{
		  code = 'success';
		  message = 'Proyecto creado correctamente.';
		}

		res.locals.status = {
		  code,
		  message
		};
		res.redirect('/');
	});
}


module.exports = {
  blank,
  crear
}
