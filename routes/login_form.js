var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login_form');
/* GET Login/Register page. */
router.get('/', loginController.login_form);

module.exports = router;
