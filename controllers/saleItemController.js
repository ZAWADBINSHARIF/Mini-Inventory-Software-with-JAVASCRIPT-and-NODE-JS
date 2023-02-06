// internal import
const Product = require('../models/product');

async function getSaleItem(req, res, next) {
    try {
        const products = await Product.find().sort({ updatedAt: -1 });
        res.render('saleItem', {
            products
        });
    } catch (error) {
        if (error) {
            return res.status(500).json({
                errors: {
                    common: {
                        msg: error.message
                    }
                }
            })
        }
    }
}

async function getCartProducts(req, res, next) {
    try {
        if (req.body) {
            const product_ids = [];

            req.body.forEach(index => {
                product_ids.push(index._id);
            });

            const products = await Product.find({ "_id": { $in: product_ids } })

            res.json({ productsInfo: products });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({
                errors: {
                    common: {
                        msg: error.message
                    }
                }
            })
        }
    }
}

module.exports = { getSaleItem, getCartProducts };