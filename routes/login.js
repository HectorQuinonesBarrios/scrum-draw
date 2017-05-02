var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login');
/* GET Login/Register page. */
router.get('/', loginController.login_form);
router.post('/', loginController.login);

module.exports = router;
