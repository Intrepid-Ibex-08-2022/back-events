const router = require('express').Router(),
controller = require('./users.controllers'),
auth = require('../auth/authUser'),
verifyToken = require('../middleware/verifyToken');

router.get('/', controller.getAll);

router.get('/:email', controller.getOne);

router.post('/', controller.postUser);

router.put('/:email', controller.putUser);

router.delete('/:email', controller.deleteOne);

router.post('/auth', auth);

module.exports = router;