'use strict'
const express = require('express');
const Usuario = require('../models/usuario');
const log4js = require('log4js');
const logger = log4js.getLogger();
const bcrypt = require('bcrypt-nodejs');

function blank(req, res, next) {
  let usr = {
      nombre: '',
      password: '',
      email: '',
      fecha_nacimiento: '',
      curp: '',
      rfc: '',
      domicilio: '',
      habilidades: ''
  }
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (err) throw err;
    else if (!usuario) res.render('users/blank', { usuario: usr });
    else res.render('index', { usuario });
  });
}
function crear(req, res, next) {
  logger.debug("Crear Usuario");
	if (req.body.password) {
		bcrypt.hash(req.body.password, null, null, (err, hash) => {
			let code = '',
					message = '';
			if (err) {
				code = 'danger';
				message = 'No se ha podido guardar el usuario.';
				res.locals.status = {
					code,
					message
				};
				next();
			} else {
				let usuario = new Usuario({
					nombre: req.body.nombre,
					password: hash,
					email: req.body.email,
					fecha_nacimiento: req.body.fecha_nacimiento,
					curp: req.body.curp,
					rfc: req.body.rfc,
					domicilio: req.body.domicilio,
					habilidades: [{nombre: req.body.habilidad, rank: req.body.rango}]
				});
        logger.debug(usuario);
				usuario.save((err, object)=>{
					if(err){
						code = 'danger';
						message = 'Error al crear el usuario';
					}else{
						code = 'success';
						message = 'Usuario creado correctamente';
					}
					res.locals.status = {
						code,
						message
					};
                    //res.render('/users');
					next();
				});
			}
		});
	}
}


function ver(req, res, next){
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

function editar(req, res, next) {
  Usuario.findOne({_id: req.params.id}, (err, usuario)=>{
    res.render('users/edit', { usuario });
  });
}

function actualizar(req, res, next) {
  logger.debug("Actualizar Usuario");
  let usuario = {
    nombre: req.body.nombre,
  	fecha_nacimiento: req.body.fecha_nacimiento,
  	curp: req.body.curp,
  	rfc: req.body.rfc,
  	domicilio: req.body.domicilio,
  	habilidades: [{nombre: req.body.habilidad, rank: req.body.rango}]
  };
  Usuario.update({_id: req.params.id},{$set: usuario}, (err, usuario) =>{
    next();
  });
}

function borrar(req, res, next){
  logger.debug("Borrar Usuario");
  Usuario.remove({_id: req.params.id}, (err, usuario)=>{
      res.locals.status = {
          code:'success',
          message:'Usuario eliminado Correctamente.'
      };
      next();
  });
}

module.exports = {
  blank,
  crear,
  ver,
  actualizar,
  borrar,
  editar
}
