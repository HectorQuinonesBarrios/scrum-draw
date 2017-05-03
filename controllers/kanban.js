'use strict'
const express = require('express'),
      Backlog = require('../models/backlog'),
      Usuario = require('../models/usuario'),
      log4js = require('log4js'),
      logger = log4js.getLogger();

function kanban(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    usuario = usuario || {};
    res.render('kanban/kanban.pug', { usuario });
  });
}

function crear(req, res, next){
  let backlog = new BacklogSchema ({
    tipo: req.body.tipo,
  	proyecto_id: req.body.proyecto_id,
  	Backlogs: [req.body.Backlogs]
  });
  Backlog.save((err,object)=>{
    if(err){
      //TODO

      throw err;
    }else {
      //TODO
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
    valor: req.body.valor,
  	narrativa: req.body.narrativa,
  	criterios: req.body.criterios,
  	validada: req.body.validada,
  	terminado: req.body.terminado,
  	asignados: [{usuario_id: req.body.asignados}]
  };
  Backlog.update({_id:req.params.id},{$set: backlog},(err,backlog)=>{
    if(err){
      throw err;
    }else {
      next();
    }
  });

}
function borrar(req,res,next){
  logger.debug('Borrar Backlog');
  Backlog.remove({_id:req.params.id},(err,backlog)=>{
    if(err){
      throw err;
    }else {
      next();
    }
  });
}
module.exports = {
  kanban,
  crear,
  ver,
  actualizar,
  borrar
}
