const jwt = require('jsonwebtoken');
const multer = require('multer');
const crypto = require('crypto');


const User = require('../models/user.model');
const Company = require('../models/company.model');
const Customer = require('../models/customer.model');
const Token = require('../models/token.model');
const Mailer = require('../utilities/mailer');

const secret = 'helloworld';


exports.register = (req,res,next) => {
    const { email,name, password, userRole, description, contact } = req.body;
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
                  const company = new Company({ user,name,description });
                  company.save(function(err){
                    if(err){
                      return res.json({
                        error: 'Error Registering User. Please Try Again.'
                      });
                    }
                  })
                }
                else if(userRole==='Customer'){
                  const customer = new Customer({ user,name,description,contact });
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
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
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

exports.userDetails = (req,res,next) => {
    userId=req.user.id
    User.findById(userId)
    .then(user=>{
      res.json(user);
    })
}
  