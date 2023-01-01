const express = require('express');
const authRouter = express.Router();
const { userModel } = require('../Models/userModel');


authRouter
    .route("/")
    .get(getSignup)    
    .post(postSignup)

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

module.exports = authRouter;
