const router = require('express').Router(),
  controller = require('./events.controllers'),
  verifyToken = require('../middleware/verifyToken');
upload = require('../middleware/uploader');

router.get('/', controller.getAll);

router.get('/:event', controller.getOne);

router.post('/',verifyToken, upload.single('image'), controller.postEvent);

router.get('/view/preferred', verifyToken, controller.viewAllPreferred);

router.post('/event/:id/preferred', verifyToken, controller.postPrefered);

router.delete('/event/:id/preferred', verifyToken, controller.delPrefered);

router.get('/filter', controller.getByQuery);

module.exports = router;
