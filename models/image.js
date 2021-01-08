const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.String,
    name: { type: String, required: true },
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);