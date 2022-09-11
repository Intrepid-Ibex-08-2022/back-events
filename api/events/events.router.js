const router = require('express').Router(),
  controller = require('./events.controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.get('/filter', controller.getByQuery);

router.get('/:ids=[]', controller.getByQuery);

router.put('/:id', controller.putEvent);

module.exports = router;
