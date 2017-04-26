'use strict'
const express = require('express');
const Proyecto = require('../models/proyecto');

function list (req, res, next) {
	Proyecto.find({}, (err, proyectos) => {
		if (err) {
			throw err;
		} else
			res.render('projects/list.pug', {proyectos});
			next();
	});
}

module.exports = {
  list
}
