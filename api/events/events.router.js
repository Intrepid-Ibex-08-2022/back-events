const router = require('express').Router(),
controller = require('./events.controllers'),
verifyToken = require('../middleware/verifyToken');

router.get('/', controller.getAll);

router.post('/', controller.postEvent);

router.get('/event/:id', controller.getOne);

router.post('/event/:id/preferred',verifyToken, controller.postPrefered);

router.get('/filter', controller.getByQuery);


module.exports = router;