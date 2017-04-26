var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users')

router.get('/', usersController.blank);
router.post('/', usersController.crear);
router.get('/:id/edit', usersController.editar);
router.delete('/:id', usersController.borrar);
router.put('/:id', usersController.actualizar);

module.exports = router;
