// external import
const express = require('express');

// internal import
const { getUserSetting, addUser } = require('../controllers/userSettingController');
const decorateHtml = require('../middlewares/common/decorateHtml');
const { addUserInputValidation, userValidationHandler } = require('../middlewares/user/addUserValidator');

const router = express.Router();

const title = 'User Setting';

router.get('/', decorateHtml(title), getUserSetting);
router.post('/add-user', decorateHtml(title), addUserInputValidation, userValidationHandler, addUser);

module.exports = router;