const mongoose = require('mongoose');
const validator = require('validator');
// const User=require('./userModel')   //for relation ship between schema,+ 

const productSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Please tell us company name!']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone'],
    },
    description: {
        type: String
    },
    imageCover: {
        type: String,
    },
    images: [String],
    category: {
        type: String,
        enum: ['Location', 'Food', 'Design'],
        required: [true, 'A product must have a category']
    },
    locationCoordinates: [Number],
    address: {
        type: String
    },
    maxGroupSize: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        // required: [true, 'Product must belong to user']
    }
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo email'
    });

    next();
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product