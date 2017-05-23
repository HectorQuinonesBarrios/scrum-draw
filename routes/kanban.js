const express = require('express');
const router = express.Router();
const kanbanController = require('../controllers/kanban');

/* GET home page. */
router.get('/:id', kanbanController.kanban);
router.post('/:id', kanbanController.crear);
//router.get('/:id', kanbanController.ver);
router.put('/:id', kanbanController.actualizar);
router.delete('/:id', kanbanController.borrar);

router.use('/:id', kanbanController.kanban);

module.exports = router;
