const express = require('express'),
      router = express.Router(),
      tarjetasController = require('../controllers/tarjetas');

router.post('/', tarjetasController.crear);
router.delete('/', tarjetasController.borrar);

module.exports = router;
