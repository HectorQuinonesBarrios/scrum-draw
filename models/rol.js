'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolSchema = Schema({
	nombre: {
      type: String,
      unique: true,
      required: true
    },
});

module.exports = exports = mongoose.model('Rol', RolSchema);
