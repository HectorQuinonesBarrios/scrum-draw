var express = require('express');
var router = express.Router();
const projectsController = require('../controllers/projects');

/* GET home page. */
router.get('/', projectsController.list);

module.exports = router;
