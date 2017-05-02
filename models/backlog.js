'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const BacklogSchema = Schema({
	tipo: String,
	proyecto_id: ObjectId,
	tarjetas: [Object]
});

module.exports = exports = mongoose.model('Backlog', BacklogSchema);
