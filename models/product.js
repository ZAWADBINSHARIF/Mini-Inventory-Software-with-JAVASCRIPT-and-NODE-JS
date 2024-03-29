// external import
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        brandName: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        productImg: {
            type: String
        }
    },
    { timestamps: true }
);

const productModel = mongoose.model("all_product", productSchema);

module.exports = productModel;