const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
mongoose = require('mongoose');

// models
User = require('./models/user.model');


// routes
const userRoutes = require('./routes/userRoutes');

// express app
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// user routes
app.use('/user', userRoutes);

// connect database then start app.
mongoose
  .connect(
    'mongodb+srv://puneet:puneet@cluster0-adp1h.mongodb.net/newsletter?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(process.env.PORT || 8000);
  })
  .catch(err => {
    console.log(err);
  });
