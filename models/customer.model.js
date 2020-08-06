const mongoose = require('mongoose'),
User = require('./user.model');


const Schema = mongoose.Schema;

const customerSchema = new Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  profileImage:{
    type:String,
    default:"models\\profileImages\\default.png",
    required:false
  },
  contact: {
    type: String,
    required: false
  },
  
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
