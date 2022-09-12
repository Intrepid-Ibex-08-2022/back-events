const router = require('express').Router(),
controller = require('./events.controllers'),
verifyToken = require('../middleware/verifyToken');
// upload = require('../middleware/uploader')
// upload.single('image');
const multer = require('multer')

const storage = multer.diskStorage(
    {
        filename: function(res, file, cb){
            const ext = file.originalname.split('.').pop()
            const filename = Date.now()
            cb(null,`${filename}.${ext}`)
        },
        destination: function(res, file, cb){
            cb(null,'./public')
            next();
        }
    }

);
const upload = multer({storage})

router.get('/', controller.getAll);

router.post('/', upload.single('image'),  controller.postEvent);

router.get('/event/:id', controller.getOne);

router.get('/view/preferred',verifyToken, controller.viewAllPreferred);

router.post('/event/:id/preferred',verifyToken, controller.postPrefered);

router.get('/filter', controller.getByQuery);


module.exports = router;