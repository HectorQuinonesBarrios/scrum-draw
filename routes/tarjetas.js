const express = require('express'),
      router = express.Router(),
      tarjetasController = require('../controllers/tarjetas');

router.post('/', tarjetasController.crear);

router.put('/', tarjetasController.actualizar);

router.delete('/:id', tarjetasController.borrar);

module.exports = router;
