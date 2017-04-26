'use strict'
const express = require('express');
const Tarjeta = require('../models/tarjeta');
const log4js = require('log4js');
const logger = log4js.getLogger();

function  crearTarjeta(req, res, next){
  logger.debug('Crear Tarjeta');
  let tarjeta = new TarjetaSchema ({
    valor: req.body.valor,
  	narrativa: req.body.narrativa,
  	criterios: req.body.criterios,
  	validada: req.body.validada,
  	terminado: req.body.terminado,
  	asignados: [{usuario_id: req.body.asignados}]
  });

Tarjeta.save((err,object)=>{
  if(err){
    //TODO
  }
  else{
    //TODO
    next();
  }

});

}

function verTarjeta(req, res, next){
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

function actualizarTarjeta(req, res, next){
  logger.debug('Actualizar Tarjeta');
  let tarjeta = {
    valor: req.body.valor,
  	narrativa: req.body.narrativa,
  	criterios: req.body.criterios,
  	validada: req.body.validada,
  	terminado: req.body.terminado,
  	asignados: [{usuario_id: req.body.asignados}]
  };
  Tarjeta.update({_id:req.params.id}, {$set: tarjeta}, (err,tarjeta)=>{
    if(err){
      throw err;
    }else {
      next();
    }
  });

}
function borrarTarjeta(req,res,next){
  logger.debug('Borrar Tarjeta');
  Tarjeta.remove({_id: req.body.id}, (err, tarjeta)=>{
    if(err){
      throw err;
    }else {
      next();
    }
  });
}


module.exports = {
  crearTarjeta,
  verTarjeta,
  actualizarTarjeta,
  borrarTarjeta
}
