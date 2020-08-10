const mongoose = require('mongoose');
const User = require('./user.model');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  userId: {
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
  rating:{
    type:Number,
    default:0
  },
  totalCount:{
    type:Number,
    default:0
  }
});

const Company = mongoose.model('Company', companySchema);
// module.exports = { Company, companySchema };
module.exports = Company;
