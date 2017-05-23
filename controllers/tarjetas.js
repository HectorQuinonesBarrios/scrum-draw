'use strict'
const express = require('express');
const Tarjeta = require('../models/tarjeta');
const log4js = require('log4js');
const logger = log4js.getLogger();

function crear(req, res, next){
  logger.debug('Crear Tarjeta');
  let tarjeta = new Tarjeta ({
    valor: req.body.valor,
    narrativa: {
  		como: req.body.como,
  		quiero: req.body.quiero,
  		manera: req.body.manera
  	},
  	criterios: {
  		dado: req.body.dado,
  		cuando: req.body.cuando,
  		entonces: req.body.entonces
  	},
    backlog: req.body.backlog
    /*,
  	validada: req.body.validada,
  	terminado: req.body.terminado
    ,asignados: [{usuario_id: req.body.asignados}]*/
  });

tarjeta.save((err,object)=>{
  if(err){
    res.redirect(`/kanban/${req.body.proyecto}`);
  }
  else{
    //TODO
    res.io.emit('backlogs', object);
    res.redirect(`/kanban/${req.body.proyecto}`);
  }

});

}

function ver(req, res, next){
  logger.debug('Ver Tarjeta');
  Tarjeta.findOne({_id: req.params.id}, (err, tarjeta)=>{
    if(err){
      res.status(404);
    }else {
      res.status(200).json(tarjeta);
      next();
    }
  });
}

function actualizar(req, res, next){
  logger.debug('Actualizar Tarjeta');
  logger.debug(req.body);
  let tarjeta = {
//    valor: req.body.valor,
//  	narrativa: req.body.narrativa,
//  	criterios: req.body.criterios,
//  	validada: req.body.validada,
//  	terminado: req.body.terminado,
//  	asignados: [{usuario_id: req.body.asignados}],
    backlog: req.body.backlog_id
  };

Tarjeta.update({_id: req.body.id}, {$set: tarjeta}, (err,tarjeta)=>{
    if(err){
      throw err;
    }else {
      res.io.emit('backlogs', tarjeta);
      res.sendStatus(200);
    }
  });
}

function borrar(req,res,next){
  logger.debug('Borrar Tarjeta');
  Tarjeta.remove({_id: req.body.id}, (err, tarjeta)=>{
    if(err){
      throw err;
    }else {
      res.io.emit('backlogs', tarjeta);
      res.sendStatus(200);
    }
  });
}


module.exports = {
  crear,
  ver,
  actualizar,
  borrar
}
