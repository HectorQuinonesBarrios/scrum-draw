'use strict'
const express = require('express'),
      Proyecto = require('../models/proyecto'),
      Usuario = require('../models/usuario'),
      Backlog = require('../models/backlog'),
      moment = require('moment'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

function blank(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
        res.render('login/login_form');
    } else {
      Usuario.find({}, {'local.nombre': 1, 'local.email': 1}, (err, usuarios) => {
        usuarios = usuarios || {};
        res.render('projects/blank.pug', { usuario, usuarios });
      });
    }
  });
}

function crear(req, res, next) {
    logger.debug("Crear Proyecto");
    let proyecto = new Proyecto({
      nombre: req.body.nombre,
      fecha_solicitud: req.body.fecha_solicitud,
      fecha_arranque: req.body.fecha_arranque,
      descripcion: req.body.descripcion,
      scrum_master: req.body.scrum_master,
      product_owner: req.body.product_owner,
      equipo_desarrollo: JSON.parse(req.body.equipo_desarrollo)
    });
    let code,
        message;
	proyecto.save((err, proyecto)=>{
		if(err || !proyecto) {
		  code = 'danger';
		  message = 'No se ha podido crear el proyecto.';
          logger.debug(err);
          res.locals.status = {
            code,
            message
          };
          next();
		}else{
          let backlog = new Backlog({
              tipo: 'Product Backlog',
              proyecto_id: proyecto._id,
              tarjetas: []
            });
          backlog.save((error, object)=>{
            if(error || !object){
              code = 'danger';
              message = 'No se ha podido crear el proyecto.';
              logger.debug(error);
            }else {
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
	});
}

function list(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
        res.render('login/login_form');
    } else {
        Proyecto.aggregate([
            {$match: {$or: [{'scrum_master': usuario._id}, {'product_owner': usuario._id}, {'equipo_desarrollo.usuario_id': {$in: [usuario._id]}}]}},
            {$unwind: '$equipo_desarrollo'},
            {$lookup: {from: 'usuarios', localField: 'scrum_master', foreignField: '_id', as: 'scrum_master_doc'}},
            {$lookup: {from: 'usuarios', localField: 'product_owner', foreignField: '_id', as: 'product_owner_doc'}},
            {$lookup: {from: 'usuarios', localField: 'equipo_desarrollo.usuario_id', foreignField: '_id', as: 'equipo_desarrollo_docs'}},
            {$unwind: '$equipo_desarrollo_docs'},
            {$unwind: '$scrum_master_doc'},
            {$unwind: '$product_owner_doc'},
            {$addFields: {'equipo_desarrollo_docs.rol': '$equipo_desarrollo.rol'}},
            {$group: {_id: '$_id', nombre: {$first: '$nombre'}, fecha_solicitud: {$first: '$fecha_solicitud'}, fecha_arranque: {$first: '$fecha_arranque'}, descripcion: {$first: '$descripcion'}, scrum_master: {$first: '$scrum_master_doc'}, product_owner: {$first: '$product_owner_doc'}, equipo_desarrollo: {$push: '$equipo_desarrollo_docs'}}}
        ],(err, proyectos) => {
          if (err) {
              console.log(err);
              throw err;
          }
            console.log(proyectos);
            res.render('projects/list.pug', {proyectos, usuario, moment});
        });
    }
//    Proyecto.find({}, (err, proyectos) => {
//		if (err) {
//			throw err;
//		} else
//      console.log(proyectos);
//      res.render('projects/list.pug', {proyectos, usuario, moment});
//	});
  });
}

module.exports = exports = {
    list,
    blank,
    crear
}
