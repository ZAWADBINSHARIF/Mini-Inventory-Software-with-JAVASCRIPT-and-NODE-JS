// external import
const express = require('express');

// internal import
const { getLoginForm } = require('../controllers/loginController');
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();
const title = 'Login';

router.get('/', decorateHtml(title), getLoginForm);

module.exports = router;