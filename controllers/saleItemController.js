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

async function getProducts(req, res, next) {
    try {
        if (req.body) {

            const product_ids = [];
            req.body.forEach(index => {
                return product_ids.push(index._id);
            });

            console.log(product_ids)

            const products = await Product.find({ "_id": { $in: product_ids } })

            console.log(products);

            res.json({ productsInfo: products });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getSaleItem, getProducts };