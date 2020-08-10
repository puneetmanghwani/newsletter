const mongoose = require('mongoose'),
User = require('./user.model');


const Schema = mongoose.Schema;

const letterSchema = new Schema({
  companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  image:{
    type:String,
    default:"models\\letterImages\\default.png",
    required:false
  },
  description: {
    type: String,
    required: false
  },
  
});

const Customer = mongoose.model('Letter', letterSchema);

module.exports = Letter;
