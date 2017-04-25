'use strict'
const express = require('express');

function kanban(req, res, next) {
 res.render('kanban/kanban.pug', { title: 'Express' });
}
function  crearTarjeta(req, res, next){
  let tarjeta = new TarjetaSchema ({
    valor: req.body.valor,
  	narrativa: req.body.narrativa,
  	criterios: req.body.criterios,
  	validada: req.body.validada,
  	terminado: req.body.terminado,
  	asignados: [{usuario_id: req.body.asignados}]
  });

tarjeta.save((err,object)=>{
  if(err){
    //TODO
  }
  else{
    //TODO
    next();
  }

});

}

function crearBacklog(req, res, next){
  let backlog = new BacklogSchema ({
    tipo: req.body.tipo,
  	proyecto_id: req.body.proyecto_id,
  	tarjetas: [req.body.tarjetas]
  });
  backlog.save((err,object)=>{
    if(err){
      //TODO
    }else {
      //TODO
    }
  });
}
module.exports = {
  kanban,
  crearTarjeta
}
