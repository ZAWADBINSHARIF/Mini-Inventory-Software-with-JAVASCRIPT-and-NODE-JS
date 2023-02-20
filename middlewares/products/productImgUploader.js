// internal input
const multer = require('multer');
const uploader = require('../../utilities/uploader');

function productImgUploader(req, res, next) {
    const upload = uploader(
        'product-imgs',
        ['image/jpg', 'image/png', 'image/jpeg'],
        1,
        'Only JPG PNG and JPEG images are allowed'
    );

    upload.any()(req, res, err => {
        if (err instanceof multer.MulterError) {
            console.log(err)
            res.status(400).json({
                errors: {
                    productImg: {
                        msg: err.message
                    }
                }
            })
        } else if (err) {
            res.status(500).json({
                errors: {
                    common: {
                        msg: err
                    }
                }
            })
        } else {
            next();
        }
    });

}

module.exports = productImgUploader;