'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
	local: {
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
        type: {
            facebookID: String,
            token: String
        },
        sparse: true
	},
	twitter: {
        type: {
            twitterID: String,
            token: String
        },
        sparse: true
	},
	github: {
        type: {
            githubID: String,
            token: String
        },
        sparse: true
    }
});

module.exports = exports = mongoose.model('Usuario', UsuarioSchema);
