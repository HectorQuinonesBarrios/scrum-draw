'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const TarjetaSchema = Schema({
	valor: Number,
	narrativa: Object,
	criterios: Object,
	validada: Boolean,
	terminado: Boolean,
	asignados: [{usuario_id: ObjectId}]
});

module.exports = exports = mongoose.model('Tarjeta', TarjetaSchema);
