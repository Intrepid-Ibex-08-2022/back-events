const router = require('express').Router(),
controller = require('./events.controllers');

router.get('/', controller.getAll);

router.get('/event/:id', controller.getOne);

router.get('/filter', controller.getByQuery);

router.post('/', controller.postEvent);

module.exports = router;