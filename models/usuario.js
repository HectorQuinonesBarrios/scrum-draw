'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
	local:{
		nombre: String,
		password: String,
		email: String,
		fecha_nacimiento: Date,
		curp: String,
		rfc: String,
		domicilio: String,
		habilidades: [{nombre: String, rank: String}]
	},
	facebook: {
		facebookID: String,
		token: String
	},
	twitter: {
		twitterID: String,
		token: String
	},
	github: {
		githubID: String,
		token: String
	}

});

module.exports = exports = mongoose.model('Usuario', UsuarioSchema);
