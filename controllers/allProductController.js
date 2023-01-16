// internal import
const Product = require('../models/product');

async function getAllProducts(req, res, next) {

    const products = await Product.find();

    try {
        res.render('all-product', {
            products
        });
    } catch (error) {
    }
}

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

module.exports = { getAllProducts, addProduct };