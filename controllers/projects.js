'use strict'
const express = require('express'),
      Proyecto = require('../models/proyecto'),
      Usuario = require('../models/usuario'),
      Backlog = require('../models/backlog'),
      moment = require('moment/min/moment.min'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

const aggregatePipeline = usuario => {
    return [
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
    ]
}

function blank(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
        res.redirect('/login');
    } else {
      Usuario.find({}, {'local.nombre': 1, 'local.email': 1}, (err, usuarios) => {
        usuarios = usuarios || {};
        let proyecto = {
          nombre: '',
          fecha_solicitud: '',
          fecha_arranque: '',
          descripcion: '',
          scrum_master: '',
          product_owner: '',
          equipo_desarrollo: []
        }
        res.render('projects/blank.pug', { usuario, usuarios, proyecto, moment });
      });
    }
  });
}

function actualizar(req, res, next) {
    Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
        if (!usuario) {
            res.redirect('/login');
        } else {
            let code,
                message;
            Proyecto.update({_id: req.params.id}, {
              $set: {
                nombre: req.body.nombre,
                fecha_solicitud: req.body.fecha_solicitud,
                fecha_arranque: req.body.fecha_arranque,
                descripcion: req.body.descripcion,
                scrum_master: req.body.scrum_master,
                product_owner: req.body.product_owner,
                equipo_desarrollo: JSON.parse(req.body.equipo_desarrollo)
              }
            }, (err, resu) => {
              if (err) {
                code = 'danger';
                message = 'No se ha podido editar el proyecto.';
                logger.debug(err);
              } else {
                code = 'success';
                message = 'Proyecto editado correctamente.';
              }
              res.locals.status = {
                code,
                message
              };
              res.redirect('/projects');
            });
        }
    });
}

function editar(req, res, next) {
    Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
        if (!usuario) {
            res.redirect('/login');
        } else {
            Usuario.find({}, {'local.nombre': 1, 'local.email': 1}, (err, usuarios) => {
                usuarios = usuarios || [];
                Proyecto.findOne({_id: req.params.id}, (error, proyecto) => {
                    if (error) {
                        logger.debug(error);
                    } else {
                        res.render('projects/edit.pug', { usuario, usuarios, proyecto, moment });
                    }
                });
            });
        }
    });
}

function crear(req, res, next) {
    logger.debug('Crear Proyecto');
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
              proyecto_id: proyecto._id
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
            res.io.emit('nuevo', proyecto)
            next();
          });
		}
	});
}

function list(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
        res.redirect('/login');
    } else {
        Proyecto.aggregate(aggregatePipeline(usuario), (err, proyectos) => {
          if (err) {
              logger.debug(err);
              throw err;
          }
            res.render('projects/list.pug', {proyectos, usuario});
        });
    }
  });
}

function borrar(req, res, next) {
    Usuario.findOne({
        _id: req.session.usuario
    }, (err, usuario) => {
        if (!usuario) {
            res.redirect('/login');
        } else {
            logger.info(req.params.id);
            Proyecto.remove({
                _id: req.params.id
            }, (err, object) => {
                if (err) {
                    throw err;
                } else {
                    res.io.emit('nuevo', object);
                    res.sendStatus(200);

                }

            });
        }
    });
}
function socket(req, res, next){
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
        res.redirect('/login');
    } else {
        Proyecto.aggregate(aggregatePipeline(usuario), (err, proyectos) => {
          if (err) {
              logger.debug(err);
              throw err;
          }
            res.status(200).json(proyectos);
        });
    }
  });
}

module.exports = exports = {
  list,
  blank,
  crear,
  editar,
  actualizar,
  socket,
  borrar
}
