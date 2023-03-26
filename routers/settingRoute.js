// external import
const express = require('express');

// internal import
const { getSetting, addUser } = require('../controllers/settingController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();

const title = 'Setting';

router.get('/', decorateHtml(title), getSetting);

module.exports = router;