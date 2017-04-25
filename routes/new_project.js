var express = require('express');
var router = express.Router();
const new_projectController = require('../controllers/new_project');

/* GET home page. */
router.get('/', new_projectController.blank);

router.post('/', new_projectController.crear);

module.exports = router;
