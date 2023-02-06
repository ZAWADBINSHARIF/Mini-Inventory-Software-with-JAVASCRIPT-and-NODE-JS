// external import
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const randomNumber = require('crypto').randomBytes(12).toString('hex');
const company = {
    name: 'Fairy - HUB of Baby Books/Toys',
    address: 'Dhaka Bangladesh',
    city: 'Dhaka'
}

function get_all_invoices(req, res, next) {
    res.send('<h1>Invoice page</h1>')
}

function createInvoice(req, res, next) {

    const products = [];

    if (req.body['sale_products']) {
        products.push(...req.body['sale_products'])
    }
    console.log(products);
    try {

    } catch (error) {
        if (error)
            res.status(500).json({
                errors: {
                    common: {
                        msg: error.message
                    }
                }
            })
    }

    const invoiceData = {
        // Customize enables you to provide your own templates
        // Please review the documentation for instructions and examples
        "customize": {
            //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
        },
        "images": {
            // The logo on top of your invoice
            "logo": fs.readFileSync(path.join('public', 'images', 'company_logo.jpg'), 'base64')
        },
        // Your own data
        "sender": {
            "company": company.name,
            "address": company.address,
            "city": company.city,
        },
        // Your recipient
        "client": {
            "company": req.body.customer_name,
            "address": req.body.customer_address,
            "zip": req.body.customer_number
        },
        "information": {
            // Invoice number
            "number": randomNumber,
            // Invoice data
            "date": format(new Date(), 'dd-MM-yyyy'),
            "due-date": format(new Date(), 'dd-MM-yyyy')
        },
        // The products you would like to see on your invoice
        // Total values are being calculated automatically
        products,
        // Settings to customize your invoice
        "settings": {
            "currency": "BDT"
        }
    };
    easyinvoice.createInvoice(invoiceData, function (result) {
        //The response will contain a base64 encoded PDF file
        const filename = req.body["customer_name"].split(" ").join('-') + "-" + randomNumber;
        fs.writeFileSync(`public/invoices/${filename}.pdf`, result.pdf, 'base64');
        res.status(200).json({ result: { fileCreated: true, filename } });
    });

}

function downloadInvoice(req, res, next) {
    if (req.params.pdf_file_name)
        res.download(`public/invoices/${req.params.pdf_file_name}.pdf`);
}

module.exports = {
    get_all_invoices,
    createInvoice,
    downloadInvoice
}