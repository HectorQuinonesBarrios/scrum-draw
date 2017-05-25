'use strict'
const express = require('express'),
      Backlog = require('../models/backlog'),
      Usuario = require('../models/usuario'),
      Tarjeta = require('../models/tarjeta'),
      Proyecto = require('../models/proyecto'),
      ObjectId = require('mongoose').Types.ObjectId,
      log4js = require('log4js'),
      logger = log4js.getLogger();

function kanban(req, res, next) {
  logger.debug('KANBAN');
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if(!usuario) {
      res.redirect('/login');
    } else {
      Proyecto.aggregate([
        {$match: {_id: ObjectId(req.params.id)}},
        {$unwind: '$equipo_desarrollo'},
        {$lookup: {from: 'usuarios', localField: 'scrum_master', foreignField: '_id', as: 'scrum_master_doc'}},
        {$lookup: {from: 'usuarios', localField: 'product_owner', foreignField: '_id', as: 'product_owner_doc'}},
        {$lookup: {from: 'usuarios', localField: 'equipo_desarrollo.usuario_id', foreignField: '_id', as: 'equipo_desarrollo_docs'}},
        {$unwind: '$equipo_desarrollo_docs'},
        {$unwind: '$scrum_master_doc'},
        {$unwind: '$product_owner_doc'},
        {$addFields: {'equipo_desarrollo_docs.rol': '$equipo_desarrollo.rol'}},
        {$group: {_id: '$_id', nombre: {$first: '$nombre'}, fecha_solicitud: {$first: '$fecha_solicitud'}, fecha_arranque: {$first: '$fecha_arranque'}, descripcion: {$first: '$descripcion'}, scrum_master: {$first: '$scrum_master_doc'}, product_owner: {$first: '$product_owner_doc'}, equipo_desarrollo: {$push: '$equipo_desarrollo_docs'}}}
      ], (error, proyecto) => {
        if (error) {
          logger.debug(error);
        } else {
          proyecto = proyecto[0];
          Backlog.aggregate([
            {$match: {'proyecto_id': proyecto._id}},
            {$lookup: {from: 'tarjetas', localField: '_id', foreignField: 'backlog', as: 'tarjetas'}}
          ], (err, backlogs) => {
              if (err) {
                logger.debug(err);
              } else {
                logger.debug(backlogs);
                res.render('kanban/kanban.pug', { usuario, backlogs, proyecto });
              }
          });
        }
      });
    }
  });
}

function backlogs(req, res, next) {
  logger.debug('BACKLOGS');
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if(!usuario) {
      res.redirect('/login');
    } else {
      Proyecto.findOne({_id: req.params.id}, (error, proyecto) => {
        if (err) {
          logger.debug(error);
        } else {
          logger.debug(proyecto);
          Backlog.aggregate([
            {$match: {'proyecto_id': proyecto._id}},
            {$lookup: {from: 'tarjetas', localField: '_id', foreignField: 'backlog', as: 'tarjetas'}}
          ], (err, backlogs) => {
              if (err) {
                logger.debug(err);
              } else {
                res.status(200).json(backlogs);
              }
          });
        }
      });
    }
  });
}

function crear(req, res, next){
  let backlog = new Backlog({
    tipo: req.body.tipo,
  	proyecto_id: req.params.id
  });
  logger.info('CREAR');
  backlog.save((err, object)=>{
    if(err){
      //TODO
      throw err;
    }else {
      res.io.emit('backlogs', object);
      res.status(200).send('ok');
    }
  });
}

function ver(req, res, next){
  logger.debug('Ver Backlog');
  Backlog.findOne({_id: req.params.id}, (err, backlog)=>{
    if(err){
      res.status(404);
    }else {
      res.status(200).json(backlog);
    }
  });
}

function actualizar(req,res,next){
  logger.debug('Actualizar Backlog');
  let backlog = {
    tipo: req.body.tipo
  };
  Backlog.update({_id: req.params.id}, {$set: backlog}, (err, backlog)=>{
    if(err){
      throw err;
    }else {
      next();
    }
  });

}
function borrar(req,res,next){
  logger.debug('Borrar Backlog');
  Backlog.remove({_id: req.params.id}, (err, backlog)=>{
    if(err){
      throw err;
    }else {
      res.io.emit('backlogs', backlog);
      res.sendStatus(200);
    }
  });
}
module.exports = {
  kanban,
  crear,
  ver,
  actualizar,
  borrar,
  backlogs
}
