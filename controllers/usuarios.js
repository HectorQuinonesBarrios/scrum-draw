'use strict'
const express = require('express');
const Usuario = require('../models/usuario');
const log4js = require('log4js');
const logger = log4js.getLogger();
const bcrypt = require('bcrypt-nodejs');

function blank(req, res, next) {
    let usr = {
        local: {
            nombre: '',
            password: '',
            email: '',
            fecha_nacimiento: '',
            curp: '',
            rfc: '',
            domicilio: '',
            habilidades: ''
        }
    }
    Usuario.findOne({
        _id: req.session.usuario
    }, (err, usuario) => {
        if (err) throw err;
        else if (!usuario) res.render('users/blank', {
            usuario: usr
        });
        else res.render('index', {
            usuario,
            status: res.locals.status
        });
    });
}

function crear(req, res, next) {
    logger.debug("Crear Usuario");
    let code = '',
        message = '';
    if (req.body.password) {
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            if (err) {
                code = 'danger';
                message = 'No se ha podido guardar el usuario.';
                res.locals.status = {
                    code,
                    message
                };
                next();
            } else {
                let usuario;
                switch (req.body.social) {
                    case 'facebookID':
                        usuario = new Usuario({
                            local: {
                                nombre: req.body.nombre,
                                password: hash,
                                email: req.body.email,
                                fecha_nacimiento: req.body.fecha_nacimiento,
                                curp: req.body.curp,
                                rfc: req.body.rfc,
                                domicilio: req.body.domicilio,
                                habilidades: JSON.parse(req.body.habilidades)
                            },
                            facebook: {
                              type: {
                                facebookID: req.body.id
                              }

                            }

                        });
                        break;
                    case 'twitterID':
                        usuario = new Usuario({
                            local: {
                                nombre: req.body.nombre,
                                password: hash,
                                email: req.body.email,
                                fecha_nacimiento: req.body.fecha_nacimiento,
                                curp: req.body.curp,
                                rfc: req.body.rfc,
                                domicilio: req.body.domicilio,
                                habilidades: JSON.parse(req.body.habilidades)
                            },
                            twitter: {
                              type: {
                                twitterID: req.body.id
                              }

                            }
                          });
                        break;
                    case 'githubID':
                        usuario = new Usuario({
                            local: {
                                nombre: req.body.nombre,
                                password: hash,
                                email: req.body.email,
                                fecha_nacimiento: req.body.fecha_nacimiento,
                                curp: req.body.curp,
                                rfc: req.body.rfc,
                                domicilio: req.body.domicilio,
                                habilidades: JSON.parse(req.body.habilidades)
                            },
                            github: {
                              type:{
                                githubID: req.body.id
                              }
                            }

                        });
                        break;
                    default:
                        usuario = new Usuario({
                            local: {
                                nombre: req.body.nombre,
                                password: hash,
                                email: req.body.email,
                                fecha_nacimiento: req.body.fecha_nacimiento,
                                curp: req.body.curp,
                                rfc: req.body.rfc,
                                domicilio: req.body.domicilio,
                                habilidades: JSON.parse(req.body.habilidades)
                            }
                        });
                }

                logger.debug(JSON.stringify(usuario));
                logger.debug(req.body.id);
                usuario.save((err, object) => {
                    if (err) {
                        code = 'danger';
                        message = 'Error al crear el usuario';
                        logger.debug(err)
                    } else {
                        code = 'success';
                        message = 'Usuario creado correctamente';
                    }
                    res.locals.status = {
                        code,
                        message
                    };
                    next();
                });
            }
        });
    } else {
        code = 'danger';
        message = 'Error al crear el usuario';
        res.locals.status = {
            code,
            message
        };
        next();
    }
}


function ver(req, res, next) {
    logger.debug("Ver Usuario");
    logger.info(req.params.id);
    Usuario.findOne({
        _id: req.params.id
    }, (err, usuario) => {
        if (err) {
            //TODO
            throw err;
        } else {
            res.render('users/show', {
                usuario
            });
        }

    });
}

function editar(req, res, next) {
    Usuario.findOne({
        _id: req.params.id
    }, (err, usuario) => {
        res.render('users/edit', {
            usuario
        });
    });
}

function actualizar(req, res, next) {
    logger.debug("Actualizar Usuario");
    let code, message;
    if (req.params.id) {
        if (req.body.password) {
            bcrypt.hash(req.body.password, null, null, (err, hash) => {
                if (err) {
                    code = 'danger';
                    message = 'No se ha podido editar el usuario.';
                    res.locals.status = {
                        code,
                        message
                    };
                    next();
                } else {
                    let usuario = {
                        local: {
                            nombre: req.body.nombre,
                            password: hash,
                            fecha_nacimiento: req.body.fecha_nacimiento,
                            curp: req.body.curp,
                            rfc: req.body.rfc,
                            domicilio: req.body.domicilio,
                            habilidades: JSON.parse(req.body.habilidades)
                        }
                    };
                    Usuario.update({
                        _id: req.params.id
                    }, {
                        $set: usuario
                    }, (err, usuario) => {
                        if (err) {
                            code = 'danger';
                            message = 'Usuario no se pudo modificar.';
                        } else {
                            code = 'success';
                            message = 'Usuario modificado con éxito.';
                        }
                        res.locals.status = {
                            code,
                            message
                        }
                        next();
                    });
                }
            });
        } else {
            code = 'danger';
            message = 'Debe ingresar una contraseña.';
            res.locals.status = {
                code,
                message
            }
            next();
        }
    } else {
        code = 'danger';
        message = 'Usuario no se pudo modificar.';
        res.locals.status = {
            code,
            message
        }
        next();
    }
}

function borrar(req, res, next) {
    logger.debug("Borrar Usuario");
    Usuario.remove({
        _id: req.params.id
    }, (err, usuario) => {
        res.locals.status = {
            code: 'success',
            message: 'Usuario eliminado Correctamente.'
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
