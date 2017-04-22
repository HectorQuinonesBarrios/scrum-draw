'use strict'
const express = require('express');

function login_form(req, res, next) {
  res.render('login/login_form', { title: 'Express' });
}

module.exports = {
  login_form
}
