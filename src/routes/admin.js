const EXPRESS = require('express');
const router = EXPRESS.Router();
const admin = require('../Controller/AdminController.js')
const api = require('../Controller/APIController')
const path = require('path');
var appRoot = require('app-root-path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/images");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.get('/', admin.index)
router.get('/edit/:id', admin.abc)
router.post('/get', admin.def)
router.get('/delete/:id', admin.delete)
router.post('/update', admin.update)
router.post('/image', upload.single('file'), admin.uploadFile)
router.post('/multiple', upload.array('mulFile', 10), admin.uploadMultiple)
const initAPIS = (APP) => {
    router.get('/using', api.getAllUsers);
    return APP.use('/api/v3/', router)
}


module.exports = { router, initAPIS }