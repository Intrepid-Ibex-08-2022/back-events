const router = require('express').Router(),
controller = require('./users.controllers'),
auth = require('../auth/authUser'),
verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, controller.getAll);

router.get('/:rol', verifyToken, controller.getOne);

router.post('/', verifyToken, controller.postRol);

router.put('/:rol', verifyToken, controller.putRol);

router.delete('/:rol', verifyToken, controller.deleteRol);

module.exports = router;