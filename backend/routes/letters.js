const express = require('express'),
  router = express.Router({ mergeParams: true }),
  User = require('../models/user.model'),
  Category = require('../models/category.model'),
  Company = require('../models/company.model'),
  Rating = require('../models/rating.model');

// Fetch the top 5/10 newsletter from a particular category
router.get('/', (req, res) => {
  // Initially, fetching all the newsletters from the DB of that category
  Category.find({ title: req.params.letters }, (err, foundCategory) => {
    if (err) {
      console.log(`Error in finding newsletters of ${req.params.letters}`);
    } else {
      res.send(foundCategory);
    }
  });
});

module.exports = router;
