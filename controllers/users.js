'use strict'
const express = require('express');
const Usuario = require('../models/usuario')
const log4js = require('log4js');
const logger = log4js.getLogger();

function blank(req, res, next) {
  res.render('users/blank');
}
function crearUsuario(req, res, next){
  logger.debug("Crear");
  let usuario = new UsuarioSchema ({
    nombre: req.body.nombre,
  	fecha_nacimiento: req.body.fecha_nacimiento,
  	curp: req.body.curp,
  	rfc: req.body.rfc,
  	domicilio: req.body.domicilio,
  	habilidades: [{nombre: req.body.habilidad, rank: req.body.rango}]
  });
  Usuario.save((err,object)=>{
    let code = '';
    let message = '';
    if(err){
      code = 'danger';
      message = 'Error al crear el usuario';
    }else{
      code = 'success';
      message = 'Usuario creado correctamente';
    }
    res.locals.status = {
      code:code,
      message:message
    };
    next();
  });
}


function verUsuario(req, res, next){
  logger.debug("Ver Usuario");
  logger.info(req.params.id);
  Usuario.findOne({_id:req.params.id}, (err, usuario)=>{
  //  res.render('users/show', {'user':user});
  if(err){
    //TODO
    throw err;
  }else {
    res.status(200).json({status:"success"});
    next();
  }

  });
}


function actualizarUsuario(req, res, next){
  logger.debug("Actualizar Usuario");
  let usuario = {
    nombre: req.body.nombre,
  	fecha_nacimiento: req.body.fecha_nacimiento,
  	curp: req.body.curp,
  	rfc: req.body.rfc,
  	domicilio: req.body.domicilio,
  	habilidades: [{nombre: req.body.habilidad, rank: req.body.rango}]
  };
  Usuario.update({_id:req.params.id},{$set:usuario}, (err,usuario) =>{
    next();
  });

}

function borrarUsuario(req, res, next){
  logger.debug("Borrar Usuario");
  Usuario.remove({_id:req.params.id},(err, usuario)=>{
    next();
  });
}

module.exports = {
  blank,
  crearUsuario,
  verUsuario,
  actualizarUsuario,
  borrarUsuario
}
