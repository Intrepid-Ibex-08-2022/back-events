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
        }
        
    }
    
);
const upload = multer({storage})

module.exports = upload; 