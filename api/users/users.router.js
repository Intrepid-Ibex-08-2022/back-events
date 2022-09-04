const router = require('express').Router(),
controller = require('./users.controllers');

router.get('/', controller.getAll);

router.get('/:email', controller.getOne);

router.post('/', controller.postUser);

router.put('/:email', controller.putUser);

router.delete('/:email', controller.deleteOne);

//router.delete('/delete', controller.deleteAll);

module.exports = router;