// external import
const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        invoiceName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        customerName: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    }
);

const invoiceModel = mongoose.model('all_invoice', invoiceSchema);

module.exports = invoiceModel;