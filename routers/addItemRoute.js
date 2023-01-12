// internal import
const express = require('express');

// enternal import
const { getAddItem } = require('../controllers/addItemController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'Add Item';

router.get('/', decorateHtml(title), getAddItem);

module.exports = router;