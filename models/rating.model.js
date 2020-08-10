const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    rating: {
        type:Number,
        required:false
    },
    review: {
        type:String,
        required:false
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;


