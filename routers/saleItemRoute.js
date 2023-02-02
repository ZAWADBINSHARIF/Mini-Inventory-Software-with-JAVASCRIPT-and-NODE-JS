// external import
const express = require('express');

// internal import
const { getSaleItem, getCartProducts } = require('../controllers/saleItemController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'Sale Item';

router.get('/', decorateHtml(title), getSaleItem);
router.post('/getProducts', getCartProducts);

module.exports = router;