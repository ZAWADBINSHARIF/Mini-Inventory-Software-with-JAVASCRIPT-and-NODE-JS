// internal import
const Product = require('../models/product');

async function getSaleItem(req, res, next) {
    try {
        const products = await Product.find().sort({ updatedAt: -1 });
        res.render('saleItem', {
            products
        });
    } catch (error) {
        next(error);
    }
}

async function getCartProducts(req, res, next) {
    try {
        if (req.body) {
            const product_ids = [];

            req.body.forEach(index => {
                return product_ids.push(index._id);
            });

            const products = await Product.find({ "_id": { $in: product_ids } })

            res.json({ productsInfo: products });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getSaleItem, getCartProducts };