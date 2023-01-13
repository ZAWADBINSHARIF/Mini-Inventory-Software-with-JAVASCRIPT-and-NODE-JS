// external import
const { check, validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const { unlink } = require('fs');
const path = require('path')

// internal import
const Product = require('../../models/product');

const productInputValidation = [
    check('productName')
        .isLength({ min: 1 })
        .withMessage('Product name is required')
        .trim()
        .custom(async value => {
            try {
                const foundProduct = await Product.findOne({ productName: value }).exec();
                if (foundProduct) throw createHttpError('Product name already is used');
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
    check('brandName')
        .isLength({ min: 1 })
        .withMessage('Brand Name is required')
        .trim(),
    check('description')
        .trim(),
    check('price')
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage('Please enter nummeric value')
        .custom(value => {
            if (value < 0) {
                createHttpError('Please enter 0 or greater than 0')
            }
        })
        .trim()
];

const userValidationHandler = async (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (req.files.length > 0) {
            const fileName = req.files[0].filename;
            await unlink(path.join(__dirname, `../../public/uploads/product-imgs/${fileName}`),
                err => {
                    if (err) throw console.log(err)
                })
        }
        res.status(500).json({
            errors: mappedErrors
        });
    }
}

module.exports = {
    productInputValidation,
    userValidationHandler
}