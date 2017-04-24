'use strict'
const express = require('express');
const Usuario = require('../models/usuario')
const log4js = require('log4js');
const logger = log4js.getLogger();

function blank(req, res, next) {
  res.render('users/blank');
}
function crear(req, res, next){
  logger.debug("Crear");
  let usuario = new UsuarioSchema ({
    nombre: req.body.nombre,
  	fecha_nacimiento: req.body.fecha_nacimiento,
  	curp: req.body.curp,
  	rfc: req.body.rfc,
  	domicilio: req.body.domicilio,
  	habilidades: [{nombre: req.body.habilidad, rank: req.body.rango}]
  });
  usuario.save((err,object)=>{
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

module.exports = {
  blank,
  crear
}
