// external import
const { check, validationResult } = require('express-validator');

// internal import
const User = require('../../models/user');
const createHttpError = require('http-errors');

const loginInputValidation = [
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Input your Email!')
        .custom(async value => {
            const foundUser = await User.findOne({ email: value });
            if (!foundUser)
                throw createHttpError('This email has no account!');
        })
        .bail(),
    check('password')
        .isLength({ min: 1 })
        .bail()
];

const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.render('login-page', {
            errors: mappedErrors,
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })
    }
}

module.exports = {
    loginInputValidation,
    loginValidationHandler
}