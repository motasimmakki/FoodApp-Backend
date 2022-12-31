const express = require('express');
const app = express();
app.use(express.json());
const userRouter = express.Router();
app.use('/user', userRouter);
const mongoose = require('mongoose');
const { db_link } = require('./secrets');

// Routing mini-app
userRouter
    .route("/")
    // .get(getSignup)
    .get(getUsers)
    .post(postSignup)
    .patch(updateUser)
    .delete(deleteUser);

app.listen(5000, 'localhost', () => {
    console.log("Server is listening on port no: 5000");
});

mongoose.set("strictQuery", false);
mongoose.connect(db_link)
.then((db) => {
    console.log("DB Connected!");
}).catch((err) => {
    console.log(err);
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 7
    }
});

// models
const userModel = mongoose.model("userModel", userSchema);

// IIFE (Immediately Invoked Function Expressing)
// (async function createUser() {
//     let user = {
//         name: "Ahkam",
//         email: "dev.ahkam@gmail.com",
//         password: "123qwerty",
//         confirmPassword: "123qwerty"
//     }
//     let data = await userModel.create(user);
//     console.log(data);
// })();

function getSignup(req, res) {
    res.sendFile("public/index.html", {root: __dirname});
}

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
        {email: "okay.nice@gmail.com"}
    );
    res.json({
        msg: "User data has been deleted Successfully!"
    });
}
