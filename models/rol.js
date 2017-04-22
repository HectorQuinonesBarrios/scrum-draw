'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolSchema = Schema({
	nombre: String,
});

module.exports = exports = mongoose.model('Rol', RolSchema);
