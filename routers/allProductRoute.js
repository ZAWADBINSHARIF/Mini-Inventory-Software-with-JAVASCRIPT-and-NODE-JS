// external import
const express = require('express');

// internal import
const { getAllProducts, addProduct } = require('../controllers/allProductController');
const decorateHtml = require('../middlewares/common/decorateHtml');
const productImgUploader = require('../middlewares/products/productImgUploader');
const { productInputValidation, addProductValidationHandler } = require('../middlewares/products/addProductValidator');

const router = express.Router();

const title = 'All Product';

router.route('/')
    .get(decorateHtml(title), getAllProducts)
    .post(productImgUploader, productInputValidation, addProductValidationHandler, addProduct)

module.exports = router;