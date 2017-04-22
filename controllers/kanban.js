'use strict'
const express = require('express');

function kanban(req, res, next) {
 res.render('kanban/kanban.pug', { title: 'Express' });
}

module.exports = {
  kanban
}
