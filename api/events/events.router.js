const router = require('express').Router(),
controller = require('./events.controllers'),
verifyToken = require('../middleware/verifyToken');
/* upload = require('../middleware/uploader')
upload.single('image'), */;


router.get('/', controller.getAll);

router.post('/', verifyToken,  controller.postEvent);

router.get('/event/:id', controller.getOne);

router.get('/view/preferred',verifyToken, controller.viewAllPreferred);

router.post('/event/:id/preferred',verifyToken, controller.postPrefered);

router.get('/filter', controller.getByQuery);


module.exports = router;