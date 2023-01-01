const express = require('express');
const authRouter = express.Router();
const { userModel } = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'kuchBhiLikhloIdharButSameToVerify';

authRouter
    .route("/")
    .get(getSignup)    
    .post(postSignup)

authRouter
    .route("/login")
    .post(loginUser);

    // Auth routes.
function getSignup(req, res) {
    res.sendFile("public/index.html", {root: __dirname});
}

async function postSignup(req, res) {
    // let {email, name, password} = req.body;
    // This log will be console on server terminal,
    // as it is running in backend.
    try {
        let data = req.body;
        let user = await userModel.create(data);
        console.log(data);
        res.json({
            msg: "User Signed Up!",
            user
        });
    } catch (err) {
        res.json({err: err.message});
    }
}

async function loginUser(req, res) {
    try {
        let { email, password } = req.body;
        if(!email) {
            res.json({
                err: "Kindly provide email"
            })
        }
        if(!password) {
            res.json({
                err: "Kindly provide password"
            })
        }
        let user = await userModel.findOne({
            email: email
        })
        if(user) {
            // Check if password is matching.
            // [Need to use bcrypt - compare]
            bcrypt.compare(password, user.password, function(error, response) {
                if(response) {
                    // Using user's Unique Id as payload uid.
                    let uid = user["_id"];
                    // Creating Unique token for every user.
                    let token = jwt.sign({ payload: uid}, JWT_KEY);
                    // Setting token as login cookie.
                    res.cookie('login', token);
                    res.json({
                        msg: "User is successfully LoggedIn!"
                    });
                } else {
                    res.json({
                        msg: "Wrong password Entered!"
                    });
                }
                if(error) {
                    res.json({
                        err: error
                    })
                }
            });
        } else {
            res.json({
                msg: "User NOT found!"
            });
        }
    } catch(err) {
        res.json({
            msg: err.message
        });
    }
}

module.exports = authRouter;
