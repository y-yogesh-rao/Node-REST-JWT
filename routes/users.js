const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.post('/signup', userControllers.userSignUp);

router.post('/login', userControllers.userLogin);

module.exports = router;
