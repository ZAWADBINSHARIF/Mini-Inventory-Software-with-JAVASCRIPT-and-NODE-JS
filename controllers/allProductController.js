// external import
const path = require('path');
const { unlink } = require('fs');

// internal import
const Product = require('../models/product');

async function getAllProducts(req, res, next) {

    const products = await Product.find().exec();

    try {
        res.render('all-product', {
            products
        });
    } catch (error) {
        next(error);
    }
}

// add product
async function addProduct(req, res, next) {
    let newProduct;

    if (req.files && req.files.length > 0) {

        newProduct = new Product({
            ...req.body,
            productImg: req.files[0].filename
        });
    } else if (req.files) {

        newProduct = new Product({
            ...req.body
        });
    }

    try {
        await newProduct.save();
        return res.status(200).json({ message: 'Product is added succcessfully' })
    } catch (error) {
        if (error)
            return res.status(500).json(
                {
                    errors: {
                        common: {
                            msg: error.message
                        }
                    }
                }
            );
    }
}

// remove product
async function removeProduct(req, res, next) {
    try {
        const foundUser = await Product.findByIdAndDelete({ _id: req.params.id }).exec();

        if (foundUser.productImg)
            await unlink(path.join(__dirname + '/../public/uploads/product-imgs/' + foundUser.productImg),
                err => {
                    if (err) throw console.log(err);
                });

        res.status(200).json({
            message: 'Product is removed successfully'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllProducts, addProduct, removeProduct };