'use strict'
const express = require('express');

function blank(req, res, next) {
  res.render('users/blank');
}

module.exports = {
  blank
}
