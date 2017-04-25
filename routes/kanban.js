var express = require('express');
var router = express.Router();
const kanbanController = require('../controllers/kanban');

/* GET home page. */
router.get('/',kanbanController.kanban);
router.post('/', kanbanController.crearBacklog);
router.get('/:id', kanbanController.verBacklog);
router.put('/:id', kanbanController.actualizarBacklog);
router.delete('/:id', kanbanController.borrarBacklog);

module.exports = router;
