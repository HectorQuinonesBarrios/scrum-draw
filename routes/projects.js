const express = require('express'),
      router = express.Router(),
      projectsController = require('../controllers/projects');

/* GET home page. */
router.get('/', projectsController.list);

router.get('/new', projectsController.blank);

router.get('/:id/edit', projectsController.editar);

router.put('/:id/edit', projectsController.actualizar);

router.post('/new', projectsController.crear);

router.use('/new', projectsController.blank);

module.exports = router;
