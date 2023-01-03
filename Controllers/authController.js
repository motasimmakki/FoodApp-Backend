const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../secrets');
const { userModel } = require('../Models/userModel');

// Auth routes.
const signup = async function(req, res) {
    try {
        let data = req.body; // name, email, & password
        // This log will be console on server terminal,
        // as it is running in backend.
        // console.log(data);
        let user = await userModel.create(data);
        if(user) {
            res.json({
                msg: "User Signed Up!",
                user
            });
        } else {
            res.json({
                msg: "User could not be signed Up!"
            });
        }
    } catch (err) {
        res.json({err: err.message });
    }
}

const login = async function(req, res) {
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

const logout = function(req, res) {
    res.cookie('login', '', { maxAge: 1 });
    res.json({
        msg: "User logged out successfully!"
    });
}

module.exports = {
    signup, 
    login,
    logout
}
