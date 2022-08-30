const router = require('express').Router(),
controller = require('./users.controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.post('/', controller.postUser);

router.put('/:id', controller.putUser);

router.delete('/:id', controller.deleteOne);

module.exports = router;