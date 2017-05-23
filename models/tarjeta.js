'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const TarjetaSchema = Schema({
	valor: Number,
	narrativa: {
		como: String,
		quiero: String,
		manera: String
	},
	criterios: {
		dado: String,
		cuando: String,
		entonces: String
	},
	validada: Boolean,
	terminado: Boolean,
	//, asignados: [{usuario_id: ObjectId}]
    backlog: ObjectId
});

module.exports = exports = mongoose.model('Tarjeta', TarjetaSchema);
