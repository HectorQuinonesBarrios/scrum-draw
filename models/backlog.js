'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const BacklogSchema = Schema({
	tipo: String,
	proyecto_id: ObjectId
});

module.exports = exports = mongoose.model('Backlog', BacklogSchema);
