const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
    },
    score: {
        type: Number,
        required: true
    },
    review: {
        type: String
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;