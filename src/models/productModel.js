const mongoose = require('mongoose');
const validator = require('validator');

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
    address:{
        type: String
    },
    maxGroupSize: {
        type: Number,
    },
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true }
});

// Virtual populate 
// productSchema.virtual('reviews', {
//     ref: 'Review',
//     foreignField: 'tour',
//     localField: '_id'
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product