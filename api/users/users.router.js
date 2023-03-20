const router = require('express').Router(),
controller = require('./users.controllers'),
auth = require('../auth/authUser'),
verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, controller.getAll);

router.get('/oneUser', verifyToken, controller.getOne);

router.post('/', controller.postUser);

router.put('/putUser',verifyToken, controller.putUser);

router.delete('/dropUser', verifyToken, controller.deleteOne);

router.post('/login', auth.loginUser);

router.post('/auth', verifyToken, auth.authUser);

module.exports = router;