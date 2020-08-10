const mongoose = require('mongoose');
const { companySchema } = require('./company.model');
const Company = require('./company.model').companySchema;

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryList"
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
