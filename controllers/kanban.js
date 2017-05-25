'use strict'
const express = require('express'),
      Backlog = require('../models/backlog'),
      Usuario = require('../models/usuario'),
      Tarjeta = require('../models/tarjeta'),
      Proyecto = require('../models/proyecto'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

function kanban(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if(!usuario) {
      res.render('login/login_form');
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
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if(!usuario) {
      res.render('login/login_form');
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
      next();
    }
  });
}

function ver(req, res, next){
  logger.debug('Ver Backlog');
  Backlog.findOne({_id:req.params.id}, (err, backlog)=>{
    if(err){
      res.status(404);
    }else {
      res.status(200).json(backlog);
      next();
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
