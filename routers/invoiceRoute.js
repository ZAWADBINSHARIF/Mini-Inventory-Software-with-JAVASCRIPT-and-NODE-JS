// external import
const express = require('express');

// internal import
const { get_all_invoices, createInvoice, downloadInvoice } = require('../controllers/invoiceController.js')
const { customerInfoInputValidation, customerInfoValidationHandler } = require('../middlewares/customer/customer_Info_Validation.js')
const decorateHtml = require('../middlewares/common/decorateHtml');

const router = express.Router();
const title = 'all Invoices';

router.get('/', decorateHtml(title), get_all_invoices);

router.post(
    '/createInvoice',
    customerInfoInputValidation,
    customerInfoValidationHandler,
    createInvoice);

router.get(
    '/download/:pdf_file_name',
    downloadInvoice
)

module.exports = router;