'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;

const BacklogSchema = Schema({
	tipo: {
      type: String,
      required: true
    },
	proyecto_id: {
      type: ObjectId,
      required: true
    }
});

module.exports = exports = mongoose.model('Backlog', BacklogSchema);
