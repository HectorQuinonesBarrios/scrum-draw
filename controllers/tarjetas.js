'use strict'
const express = require('express');
const Tarjeta = require('../models/tarjeta');
const log4js = require('log4js');
const logger = log4js.getLogger();

function crear(req, res, next){
  logger.debug('Crear Tarjeta');
  let tarjeta = new Tarjeta({
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

  tarjeta.save((err, obj)=>{
    if(err){
      logger.info(err);
      res.status(500).send(err);
    } else {
      res.io.emit('backlogs', obj);
      res.status(200).send('ok');
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
  let tarjeta = req.body.valor? {
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
  } : {backlog: req.body.backlog};

  console.log(tarjeta);

  Tarjeta.update({_id: req.body._id}, {$set: tarjeta}, (err, tarjeta)=>{
    if(err){
      console.log(err);
      throw err;
    }else {
      res.io.emit('backlogs', tarjeta);
      res.sendStatus(200);
    }
  });
}

function borrar(req,res,next){
  logger.debug('Borrar Tarjeta');
  logger.info(req.params.id);
  Tarjeta.remove({_id: req.params.id}, (err, tarjeta)=>{
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
