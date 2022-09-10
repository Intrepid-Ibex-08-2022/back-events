const router = require('express').Router(),
controller = require('./users.controllers'),
auth = require('../auth/authUser'),
verifyToken = require('../middleware/verifyToken');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.post('/', controller.postUser);

router.put('/:id', controller.putUser);

router.delete('/:id', controller.deleteOne);

router.post('/auth', auth);

module.exports = router;