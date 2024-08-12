const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    description:String,
    rating: String,
    image:[{
        image:String
    }],
    category:String,
    seller:String,
    stock:String,
    numberOfReviews:String,
    createAt:Date   
});

const productModel = mongoose.model('Product',productSchema);

module.exports = productModel;
