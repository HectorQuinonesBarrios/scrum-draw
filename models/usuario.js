'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
	local:{
		nombre: String,
		password: String,
		email: {
            type: String,
            unique: true,
            required: true
        },
		fecha_nacimiento: Date,
		curp: String,
		rfc: String,
		domicilio: String,
		habilidades: [{nombre: String, rank: String}]
	},
	facebook: {
		facebookID: {
            type: String,
            unique: true
        },
		token: String
	},
	twitter: {
		twitterID: {
            type: String,
            unique: true
        },
		token: String
	},
	github: {
		githubID: {
            type: String,
            unique: true
        },
		token: String
	}

});

module.exports = exports = mongoose.model('Usuario', UsuarioSchema);
