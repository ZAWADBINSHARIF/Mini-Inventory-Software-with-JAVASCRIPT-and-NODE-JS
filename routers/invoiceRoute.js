// external import
const express = require('express');

// internal import
// const { get_all_invoices, createInvoice } = require('../controllers/invoiceController.js')
const { customerInfoInputValidation, customerInfoValidationHandler } = require('../middlewares/customer/customer_Info_Validation.js')

const router = express.Router();

router.post(
    '/createInvoice',
    (req, res, next) => {
        console.log(req.body)
        
        res.json({data: req.body})
    },
    customerInfoInputValidation,
    customerInfoValidationHandler);

module.exports = router;