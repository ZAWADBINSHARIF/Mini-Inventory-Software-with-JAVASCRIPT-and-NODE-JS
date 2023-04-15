// external import
const express = require('express');

// internal import
const { getLoginForm, login, logout } = require('../controllers/loginController');
const decorateHtml = require('../middlewares/common/decorateHtml');
const { loginInputValidation, loginValidationHandler } = require('../middlewares/login/loginValidator');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');

const router = express.Router();
const title = 'Login';

router.get('/', decorateHtml(title), redirectLoggedIn, getLoginForm);
router.post('/', decorateHtml(title), loginInputValidation, loginValidationHandler, login);
router.delete('/logout', logout);

module.exports = router;