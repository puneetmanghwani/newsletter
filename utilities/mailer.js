var nodemailer = require('nodemailer');

var mailer =(receiverEmail,host,token)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vritiemailtesting@gmail.com',
          pass: 'Django123@'
        }
      });
     
      var content = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' 
                    + host +'\/user\/'+ 'emailConfirmation\/' + token + '.\n' ;
      var mailOptions = {
        from: 'vritiemailtesting@gmail.com',
        to: receiverEmail,
        subject: 'Email Verification',
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

module.exports = mailer;