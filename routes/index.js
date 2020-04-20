const router = require('express').Router()
const multer = require('multer')
// configure multer
const helpers = require('../utils/multerUtils')
let upload = multer({storage: helpers.storage, fileFilter: helpers.fileFilter}).single('excelFile')

//   upload route
router.post('/upload', function(req, res, next) {
    upload(req,res,function(err){
        // check if the file exists
        if(!req.file) {
            return res.status(404).json({
                success: 'false',
                message: 'No file was passed',
                err_desc:err
            })

        }
        // check for file validation error
        if (req.fileValidationError) {
            return res.status(401).json({
                success: 'false',
                error_code:1,
                err_desc:req.fileValidationError
               });
            
        }
        if(err){
            return res.status(401).json({
                 success: 'false',
                 error_code:1,
                 err_desc:err
                });
        }
        
         res.status(201).json({
             error_code:0,
             success: 'true',
             message: 'Upload successful',
             err_desc:null,
             file: req.file
            });
    });
});

module.exports = router