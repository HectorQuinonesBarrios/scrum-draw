var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuarios')

router.get('/', usuariosController.blank);
router.post('/', usuariosController.crear);
router.get('/:id/edit', usuariosController.editar);
router.delete('/:id', usuariosController.borrar);
router.put('/:id', usuariosController.actualizar);

module.exports = router;
