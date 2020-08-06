const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Token = require('./token.model');


const saltRounds = 10;




const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true},
  isVerified: { type: Boolean, default: false },
});

userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
      const document = this;
      bcrypt.hash(
          document.password, saltRounds,function(err, hashedPassword) {
              if (err) {
                  next(err);
              }
              else {
                  document.password = hashedPassword;
                  next();
              }
          }
      )
      
  }
  else {
      next();
  }
})
userSchema.methods.isCorrectPassword = function(password,callback){
  bcrypt.compare(password,this.password,function(err,same){
      if(err){
          callback(err);
      }
      else{
          callback(err,same);
      }
  })
}
module.exports = mongoose.model('User', userSchema);