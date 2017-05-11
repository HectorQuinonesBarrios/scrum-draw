const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');
/* GET home page. */
router.get('/', statisticsController.statistics);

module.exports = router;
