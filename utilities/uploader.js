// external import
const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');

function uploader(
    sub_file_name,
    allowed_file_type,
    file_size_limit_in_MB,
    error_message
) {

    const uploadFilePath = `${__dirname}/../public/uploads/${sub_file_name}`;

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFilePath);
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-')
                + '-' +
                Date.now();

            cb(null, fileName + fileExt);

        }
    });

    const upload = multer({
        storage,
        limits: {
            fileSize: file_size_limit_in_MB * 1000000
        },
        fileFilter: function (req, file, cb) {
            if (allowed_file_type.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createHttpError(error_message));
            }
        }
    });
    return upload;
}

module.exports = uploader;