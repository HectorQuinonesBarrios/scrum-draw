'use strict'
const express = require('express');

function list (req, res, next) {
  res.render('projects/list.pug', { title: 'Express' });
}

module.exports = {
  list
}
