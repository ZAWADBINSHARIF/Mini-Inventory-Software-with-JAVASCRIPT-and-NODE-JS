// internal import
const express = require('express');

// external import
const { getIndex } = require('../controllers/indexController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();
const title = 'index';

router.get('/', decorateHtml(title), getIndex);

module.exports = router;