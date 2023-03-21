// external import
const express = require('express');

// internal import
const { getUserSetting } = require('../controllers/userSettingController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'User Setting';

router.get('/', decorateHtml(title), getUserSetting)

module.exports = router;