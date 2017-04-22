var express = require('express');
var router = express.Router();
const kanbanController = require('../controllers/kanban');

/* GET home page. */
router.get('/',kanbanController.kanban);

module.exports = router;
