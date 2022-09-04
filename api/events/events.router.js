const router = require('express').Router(),
controller = require('./events.controllers');

router.get('/', controller.getAll);



module.exports = router;