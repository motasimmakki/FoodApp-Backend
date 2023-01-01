const express = require('express');
const userRouter = express.Router();
const { userModel } = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'kuchBhiLikhloIdharButSameToVerify';

// Routing mini-app
userRouter
    .route("/")
    .get(protectRoute, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

    // --------> Routes for setting & getting cookies <--------------
// userRouter
//     .route("/setcookies")
//     .get(setCookies);

// userRouter
//     .route("/getcookies")
//     .get(getCookies);

// Always write dynamic routes in the end.
userRouter
    .route("/:name")
    .get(getUserById);

// User routes.
// Checking whether the user is signed in or NOT.
// isAdmin cookie can be used to identify b/w user and Admin.
async function protectRoute(req, res, next) {
    let token = req.cookies.login;
    if(token) {
        let isVerified = jwt.verify(token, JWT_KEY);
        if(isVerified) {
            next();
        } else {
            res.json({
                msg: "User NOT Verified"
            });
        }
    } else {
        res.json({
            msg: "Operation NOT allowed!"
        })
    }
}
// Get all users from db.
async function getUsers(req, res) {
    let allUsers = await userModel.find();
    // console.log(allUsers);
    // Get specific user by Id.
    // let allUsers = await userModel.find({name: "Ahkam"});
    res.json({
        msg: "Users Data is retrieved",
        allUsers
    });
}

// User dynamic route.
function getUserById(req, res) {
    // console.log(req.params.name);
    // let { id } = req.params;
    // let user = db.findOne(id);
    res.json({ 
        msg: "Dynamic route found! ", 
        obj: req.params 
    });
}

function postUser(req, res) {
    // console.log(req.body);
    user.push(req.body);
    res.json({
      message: "User data received successfully",
      user: req.body,
    });
}

async function updateUser(req, res) {
    let dataToBeUpdated = req.body;
    let doc = await userModel.findOneAndUpdate(
        {email: "okay.nice@gmail.com"},
        dataToBeUpdated
    );
    res.json({
        msg: "User Data Updated Successfully!"
    })
}

async function deleteUser(req, res) {
    let doc = await userModel.deleteOne(
        req.body
    );
    console.log(doc);
    res.json({
        msg: "User data has been deleted Successfully!"
    });
}

// ---------->Learning Setting and Getting Cookies <----------
// function setCookies(req, res) {
//     // res.setHeader('Set-Cookie', "isLoggedIn=true");
    
//     // maxAge: 1000 (cookie will expire after 1 sec)
//     // secure: true (this will make the cookie secure)
//     res.cookie('isLoggedIn', false, {maxAge: 10000, secure: true});
//     res.cookie('password', "1a2b3c4d5e6f", {maxAge: 10000, secure: true});
//     res.send("Cookie has been set!");
// }

// function getCookies(req, res) {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("Cookie received!");
// }

module.exports = userRouter;
