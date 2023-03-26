// external import
const { check, validationResult } = require('express-validator');
const createHttpError = require('http-errors');

// internal import
const User = require('../../models/user');

const addUserInputValidation = [
    check('name')
        .notEmpty()
        .withMessage('Name is required!')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Email is required!')
        .trim()
        .custom(async value => {
            const foundUser = await User.findOne({ email: value });
            if (foundUser)
                throw createHttpError('This email is already used!');
        })
        .bail(),
    check('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol')
]

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.render('setting_pages/user-setting',
            {
            errors:mappedErrors,
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        });
    }
}

module.exports = {
    addUserInputValidation,
    userValidationHandler
}