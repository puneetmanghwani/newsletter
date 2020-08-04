const express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  User = require('./models/user.model'),
  Rating = require('./models/rating.model'),
  Company = require('./models/company.model'),
  Category = require('./models/category.model'),
  indexRoutes = require('./routes/index'),
  letters = require('./routes/letters');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(
  'mongodb://localhost:27017/newsletters',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function(error) {}
);

app.use('/', indexRoutes);
app.use('/:letters', letters);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
