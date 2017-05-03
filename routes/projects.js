const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');

/* GET home page. */
router.get('/', projectsController.list);

module.exports = router;
