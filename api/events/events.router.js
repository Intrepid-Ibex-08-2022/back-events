const router = require('express').Router(),
controller = require('./events.controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

module.exports = router;