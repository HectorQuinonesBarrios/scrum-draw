const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios')

router.get('/', usuariosController.blank);
router.post('/', usuariosController.crear);
router.get('/:id/edit', usuariosController.editar);
router.delete('/:id', usuariosController.borrar);
router.put('/:id', usuariosController.actualizar);

router.use('/', usuariosController.blank);

module.exports = router;
