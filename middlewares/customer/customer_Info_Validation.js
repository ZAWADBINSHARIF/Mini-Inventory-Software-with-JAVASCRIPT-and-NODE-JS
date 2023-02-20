// external import
const { check, validationResult } = require('express-validator');

const customerInfoInputValidation = [
    check('customer_name')
        .isLength({ min: 1 })
        .withMessage('Customer name is required')
        .trim(),
    check('customer_address')
        .isLength({ min: 1 })
        .withMessage('Customer address is required')
        .trim()
];

const customerInfoValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400).json({
            errors: mappedErrors
        });
    }
}

module.exports = {
    customerInfoInputValidation,
    customerInfoValidationHandler
}