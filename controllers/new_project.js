'use strict'
const express = require('express');

function blank(req, res, next) {
  res.render('projects/blank.pug', { title: 'Express' });
}

module.exports = {
  blank
}
