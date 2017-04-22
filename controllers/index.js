'use strict'
const express = require('express');
//const Usuario = require('../models/usuario')
//const log4js = require('log4js');
//const bcrypt = require('bcrypt-nodejs');

function index(req, res, next) {
 res.render('index', { title: 'Express' });
}
module.exports = {
  index
}
