const express = require('express');
const authRouter = express.Router();
const {
    getSignup,
    postSignup, 
    loginUser
} = require('../Controllers/authController');

authRouter
    .route("/")
    .get(getSignup)    
    .post(postSignup)

authRouter
    .route("/login")
    .post(loginUser);

module.exports = authRouter;
