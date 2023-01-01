const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
const { userModel } = require('./models/userModel');

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Routing mini-app
userRouter
    .route("/")
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);
userRouter.route("/getcookies").get(getCookies);
    
authRouter
    .route("/")
    .get(getSignup)    
    .post(postSignup)

// // IIFE (Immediately Invoked Function Expressing)
// (async function createUser() {
//     let user = {
//         name: "ali",
//         email: "ali.afzal@gmail.com",
//         password: "qwerty123",
//         confirmPassword: "qwerty123"
//     }
//     // Before creating new user! (using middleware)
//     let data = await userModel.create(user);
//     // After creating new user! (using middleware)
//     console.log(data);
// })();

// User routes.
// Get all users from db.
async function getUsers(req, res) {
    let allUsers = await userModel.find();
    // Get specific user by Id.
    // let allUsers = await userModel.find({name: "Ahkam"});
    console.log(allUsers);
    res.json({
        msg: "Users Data is retrieved",
        allUsers
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

function setCookies(req, res) {
    // res.setHeader('Set-Cookie', "isLoggedIn=true");
    
    // maxAge: 1000 (cookie will expire after 1 sec)
    // secure: true (this will make the cookie secure)
    res.cookie('isLoggedIn', false, {maxAge: 10000, secure: true});
    res.cookie('password', "1a2b3c4d5e6f", {maxAge: 10000, secure: true});
    res.send("Cookie has been set!");
}

function getCookies(req, res) {
    let cookies = req.cookies;
    console.log(cookies);
    res.send("Cookie received!");
}

app.listen(5000, 'localhost', () => {
    console.log("Server is listening on port no: 5000");
});
