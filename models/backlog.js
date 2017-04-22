'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const BacklogSchema = Schema({
	tipo: String,
	proyecto_id: ObjectId,
	tarjetas: [ObjectId]
});

module.exports = exports = mongoose.model('Backlog', BacklogSchema);
