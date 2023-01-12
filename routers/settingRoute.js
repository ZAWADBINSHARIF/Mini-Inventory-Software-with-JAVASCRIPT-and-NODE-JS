// internal import
const express = require('express');

// enternal import
const { getSetting } = require('../controllers/settingController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'Setting';

router.get('/', decorateHtml(title), getSetting);

module.exports = router;