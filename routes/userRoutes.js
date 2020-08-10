const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const withAuth = require('../middleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/details',withAuth,userController.userDetails);
router.get('/resendToken',userController.resendToken);

router.get('/emailConfirmation/:token',userController.emailConfirmation );

// router.get('/try',userController.try)

module.exports = router;

