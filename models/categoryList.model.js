const mongoose = require('mongoose');
const { companySchema } = require('./company.model');
const Company = require('./company.model').companySchema;

const Schema = mongoose.Schema;

const categoryListSchema = new Schema({
  category: {
    type: String,
    required: true
  },
});

const CategoryList = mongoose.model('CategoryList', categoryListSchema);

module.exports = CategoryList;
