const mongoose = require('mongoose'),
  Rating = require('./rating.model'),
  Category = require('./category.model');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
