const express = require('express'),
  router = express.Router(),
  User = require('../models/user.model'),
  Category = require('../models/category.model');

// Shows all the categories of the newsletters
router.get('/', (req, res) => {
  Category.find({}, (err, data) => {
    if (err) {
      console.log('Error in finding the categories.');
    } else {
      res.send(data);
    }
  });
});

// Show the Register form
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.create(newUser, (err, addedUser) => {
    if (err) {
      console.log('Error in Signing you up. :(');
    } else {
      console.log('Added you successfully.');
      res.send(addedUser);
    }
  });
});

module.exports = router;
