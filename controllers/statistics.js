'use strict'
const express = require('express');

function statistics(req, res, next) {
  res.render('projects/statistics.pug', { title: 'Express' });
}

module.exports = {
  statistics
}
