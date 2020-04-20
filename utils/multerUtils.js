const multer = require('multer')
const path = require('path')

module.exports = {
    storage: multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(xls|xlsx)$/)) {
            req.fileValidationError = 'Only excel files are allowed!';
            return cb(new Error('Only excel files are allowed!'), false);
        }
        cb(null, true);
    }
}