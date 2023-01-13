// external import
const express = require('express');

// internal import
const { getSaleItem } = require('../controllers/saleItemController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'Sale Item';

router.get('/', decorateHtml(title), getSaleItem);

module.exports = router;