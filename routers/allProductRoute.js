// internal import
const express = require('express');

// enternal import
const { getAllProduct } = require('../controllers/allProductController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'All Product';

router.get('/', decorateHtml(title), getAllProduct);

module.exports = router;