'use strict'
const express = require('express');
const Proyecto = require('../models/proyecto');
const log4js = require('log4js');
const logger = log4js.getLogger();

function blank(req, res, next) {
  res.render('projects/blank.pug', { title: 'Express' });
}

function crear(req, res, next){
  logger.debug("Crear");
/*
  let proyecto = new Proyecto({
    nombre: req.body.nombre,
  	fecha_solicitud: req.body.fecha_solicitud,
  	fecha_arranque: req.body.fecha_arranque,
  	descripcion: req.body.descripcion,
  	scrum_master: ObjectId,
  	product_owner: ObjectId,
  	equipo_desarrollo: [{
  		usuario_id: ObjectId, rol: String
  	}]
  });*/
}


module.exports = {
  blank
}
