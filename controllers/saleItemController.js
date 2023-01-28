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

module.exports = { getSaleItem };