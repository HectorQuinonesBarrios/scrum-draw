'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const ProyectoSchema = Schema({
	nombre: String,
	fecha_solicitud: Date,
	fecha_arranque: Date,
	descripcion: String,
	scrum_master: ObjectId,
	product_owner: ObjectId,
	equipo_desarrollo: [{
		usuario_id: ObjectId, rol: String
	}]
});

module.exports = exports = mongoose.model('Proyecto', ProyectoSchema);
