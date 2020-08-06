const mongoose = require('mongoose');
const User = require('./user.model');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  logo:{
    type:String,
    default:"models\\logo\\default.png",
    required:false
  },
  description: {
    type: String,
    required: true
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
