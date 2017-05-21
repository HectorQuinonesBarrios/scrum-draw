const express = require('express'),
      router = express.Router(),
      tarjetasController = require('../controllers/tarjetas');

router.post('/', tarjetasController.crearTarjeta);

module.exports = router;
