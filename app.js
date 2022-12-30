const express = require('express');
const app = express();
app.use(express.json());
const userRouter = express.Router();
app.use('/auth', userRouter);
const mongoose = require('mongoose');
const { db_link } = require('./secrets');

// Routing mini-app
userRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

let user = [
    {
        id: 1,
        name: "Apple",
        age: 12
    },
    {
        id: 2,
        name: "Mango",
        age: 15
    },
    {
        id: 3,
        name: "Guava",
        age: 20
    }
]

function getSignup(req, res) {
    res.sendFile("public/index.html", {root: __dirname});
}

function postSignup(req, res) {
    let {email, name, password} = req.body;
    // This log will be console on server terminal,
    // as it is running in backend.
    console.log(req.body);
    res.json({
        msg: "User Signed Up!",
        email, name, password
    });
}

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
(async function createUser() {
    let user = {
        name: "Ahkam",
        email: "dev.ahkam@gmail.com",
        password: "123qwerty",
        confirmPassword: "123qwerty"
    }
    let data = await userModel.create(user);
    console.log(data);
})();
