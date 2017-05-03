const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
/* GET Login/Register page. */
router.get('/', loginController.login_form);
router.post('/', loginController.login);

module.exports = router;
