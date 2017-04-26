'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
	nombre: String,
	password: String,
	email: String,
	fecha_nacimiento: Date,
	curp: String,
	rfc: String,
	domicilio: String,
	habilidades: [{nombre: String, rank: String}]
});

module.exports = exports = mongoose.model('Usuario', UsuarioSchema);
