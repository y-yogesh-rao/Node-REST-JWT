const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    productName: {type: String, required: 'Product Name Not Provided!', unique: true},
    price: {type: Number, required: 'Price Not Provided!'},
    productImage: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);


