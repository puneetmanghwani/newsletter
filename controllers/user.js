const jwt = require('jsonwebtoken');
const multer = require('multer');
const crypto = require('crypto');


const User = require('../models/user.model');
const Company = require('../models/company.model');
const Customer = require('../models/customer.model');
const Token = require('../models/token.model');
const Category = require('../models/category.model');
const Rating = require('../models/rating.model');

const Mailer = require('../utilities/mailer');
const { stringify } = require('querystring');



const secret = 'helloworld';


exports.register = (req,res,next) => {
    const { email,name, password, userRole, description, contact, companyCategory } = req.body;
    // var user;
    
    const user = new User({ email,name, password,userRole });
    
    user.save(
        function(err){
            if(err){
              return res.json({
                error: err.message
              });
            }
            else{
                if(userRole==='Company'){
                  const company = new Company({ userId:user,name,description });
                  company.save(function(err){
                    if(err){
                      return res.json({
                        error: 'Error Registering User. Please Try Again.'
                      });
                    }
                    else{
                      const category = new Category({category:companyCategory,companyId:user})
                      category.save(function(err){
                        if(err){
                          return res.json({
                            error: err.message
                          });
                        }
                      })
                    }
                  })
                }
                else if(userRole==='Customer'){
                  const customer = new Customer({ userId:user,name,description,contact });
                  customer.save(function(err){
                    if(err){
                      return res.json({
                        error: 'Error Registering User. Please Try Again.'
                      });
                    }
                    
                  })
                }
                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                token.save(function(err){
                if (err){
                  return res.status(500).send({ msg: err.message }); 
                }
                Mailer(user.email,req.headers.host,token.token);
                return res.status(200).send('A verification email has been sent to ' + user.email + '.');
            })
            }
        }
    )
}


exports.login = (req,res,next) => {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        res.status(500).json({error: 'Internal error please try again'});
      } 
      else if (!user) {
        res.json({error: 'No user Exist with such email'});
      } 
      else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500).json({error: 'Internal error please try again'});
          } 
          else if (!same) {
            res.json({error: 'Incorrect password'});
          } 
          else {
            
             // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
            
            // Login successful, write token, and send back user
            const payload = { 
              id: user._id,
              email: email,
              name : user.name
             };
            const token = jwt.sign(payload, secret, {
              expiresIn: '5h'
            });
            // res.cookie('token', token, { httpOnly: true })
            //   .sendStatus(200);
            res.json({
              success: true,
              token: token
            });
          }
        });
      }
    });
}

exports.emailConfirmation =(req,res,next)=>{
  const token = req.params.token;

  // Find a matching token
  Token.findOne({token},function(err,token){
    if (!token){
      return res.status(400).send({ type: 'not-verified', msg: 'Invalid token' });
    }
    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          res.status(200).send("The account has been verified. Please log in.");
      });
    });
  })
}

exports.resendToken = (req,res,next)=>{
  const email = req.body.email;
  User.findOne({ email }, function (err, user){
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
    if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

    // Check if token already exist for user then send that otherwise generate a new token.
    Token.findOne({_userId:user._id},function(err,token){
      if (token){
        Mailer(user.email,req.headers.host,token.token);
        return res.status(200).send('A verification email has been sent to ' + user.email + '.');
      }
      
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        // Send the email
        Mailer(user.email,req.headers.host,token.token);
        return res.status(200).send('A verification email has been sent to ' + user.email + '.');
      });
      
    })


  })
}


exports.userDetails = (req,res,next) => {
  userId=req.user.id
  User.findById(userId)
  .then(user=>{
    res.json(user);
  })
}
  
// exports.try = (req,res,next)=>{
//   const company = Company.findOne({name:"puneet1"},function(err,user){
    
    
//     Customer.findOne({name:"puneet1111111"},function(err,user){
//       var rating = new Rating({ companyId:user,review: {} });
//       console.log(user.userId);
//       console.log(typeof user.userId);
//       console.log(user.userId.toString())
//       rating.review.set(user.userId.toString(),{'phone': "213-555-1234", 'address': 'hey'});
//       console.log(rating.review)
//       rating.save(function(err,rating){
        
//         return res.status(200).send('A been sent to ');
//       })
//     })
    
//   })
// }